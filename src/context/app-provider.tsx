'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { courseData as staticCourseData } from '@/lib/course-data';
import type { User, CourseData, Lesson } from '@/lib/types';

const DEFAULT_ACTIVATION_CODES = {
  "566": { used: false },
  "678": { used: false },
  "399": { used: false },
  "254": { used: false }
};

interface AppContextType {
  // Auth State
  isLoggedIn: boolean;
  currentUser: User | null;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
  finishWelcome: () => void;

  // Course State
  courseData: CourseData | null;
  currentChapterId: string;
  setCurrentChapterId: (id: string) => void;
  chapterToUnlock: string | null;
  setChapterToUnlock: (id: string | null) => void;
  activateSubscription: (code: string) => boolean;
  
  // Modals State
  isAuthDialogOpen: boolean;
  setAuthDialogOpen: (open: boolean) => void;
  authDialogTab: 'signin' | 'signup';
  setAuthDialogTab: (tab: 'signin' | 'signup') => void;

  isVideoModalOpen: boolean;
  setVideoModalOpen: (open: boolean) => void;
  activeVideo: Lesson | null;
  openVideoModal: (video: Lesson) => void;
  clearActiveVideo: () => void;

  isWelcomeDialogOpen: boolean;
  setWelcomeDialogOpen: (open: boolean) => void;

  isPaymentModalOpen: boolean;
  setPaymentModalOpen: (open: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  // AUTH STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [activationCodes, setActivationCodes] = useState<Record<string, {used: boolean}>>({});

  // COURSE STATE
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [currentChapterId, setCurrentChapterId] = useState<string>('chapter-1');
  const [chapterToUnlock, setChapterToUnlock] = useState<string | null>(null);

  // MODALS STATE
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<'signin' | 'signup'>('signin');
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<Lesson | null>(null);
  const [isWelcomeDialogOpen, setWelcomeDialogOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  
  useEffect(() => {
    setCourseData(staticCourseData);
    
    // Load users from localStorage
    const storedUsers = localStorage.getItem('course_users');
    if(storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    // Load activation codes
    const storedCodes = localStorage.getItem('activation_codes');
    if (storedCodes) {
      setActivationCodes(JSON.parse(storedCodes));
    } else {
      setActivationCodes(DEFAULT_ACTIVATION_CODES);
    }
    
    // Check for logged in user
    const loggedInUserEmail = localStorage.getItem('current_user_email');
    if (loggedInUserEmail && storedUsers) {
        const user = JSON.parse(storedUsers)[loggedInUserEmail];
        if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
        }
    }
  }, []);

  useEffect(() => {
    // Persist users to localStorage
    if (Object.keys(users).length > 0) {
        localStorage.setItem('course_users', JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    // Persist activation codes to localStorage
    if (Object.keys(activationCodes).length > 0) {
        localStorage.setItem('activation_codes', JSON.stringify(activationCodes));
    }
  }, [activationCodes]);


  const signup = (name: string, email: string, password: string): boolean => {
    if (users[email]) {
      return false; 
    }
    const newUser: User = {
      name,
      email,
      password, // In a real app, hash this!
      unlockedChapters: [],
      hasActivated: false,
    };
    setUsers(prev => ({ ...prev, [email]: newUser }));
    setIsLoggedIn(true);
    setCurrentUser(newUser);
    localStorage.setItem('current_user_email', email);
    setWelcomeDialogOpen(true);
    toast({
        title: 'تم إنشاء الحساب!',
        description: `مرحباً بك في الدورة، ${name}!`,
    });
    return true;
  };
  
  const finishWelcome = () => {
    if(currentUser) {
      setCurrentUser(u => u ? {...u} : null); // Force re-render
    }
  }

  const login = (email: string, pass: string): boolean => {
    const user = users[email];
    if (user && user.password === pass) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      localStorage.setItem('current_user_email', email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('current_user_email');
    setCurrentChapterId('chapter-1');
    toast({
        title: "تم تسجيل الخروج",
    });
  };

  const activateSubscription = (code: string): boolean => {
      if (!currentUser || !chapterToUnlock) return false;

      const codeDetails = activationCodes[code];
      const user = users[currentUser.email];

      if(user.hasActivated) {
        toast({ title: 'لديك اشتراك مفعل بالفعل', variant: 'destructive'});
        return false;
      }

      if (codeDetails && !codeDetails.used) {
        const updatedUser = {
            ...user,
            unlockedChapters: [...user.unlockedChapters, chapterToUnlock],
            hasActivated: true,
        };
        const updatedCodes = {...activationCodes, [code]: { used: true }};

        setUsers(prev => ({...prev, [currentUser.email]: updatedUser}));
        setCurrentUser(updatedUser);
        setActivationCodes(updatedCodes);
        setCurrentChapterId(chapterToUnlock);
        setChapterToUnlock(null);

        return true;
      }
      return false;
  };

  const openVideoModal = (video: Lesson) => {
    setActiveVideo(video);
    setVideoModalOpen(true);
  };
  
  const clearActiveVideo = () => {
    setActiveVideo(null);
  };

  const value = {
    isLoggedIn,
    currentUser,
    login,
    signup,
    logout,
    finishWelcome,
    courseData,
    currentChapterId,
    setCurrentChapterId,
    chapterToUnlock,
    setChapterToUnlock,
    activateSubscription,
    isAuthDialogOpen,
    setAuthDialogOpen,
    authDialogTab,
    setAuthDialogTab,
    isVideoModalOpen,
    setVideoModalOpen,
    activeVideo,
    openVideoModal,
    clearActiveVideo,
    isWelcomeDialogOpen,
    setWelcomeDialogOpen,
    isPaymentModalOpen,
    setPaymentModalOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
