'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { courseData as staticCourseData } from '@/lib/course-data';
import type { User, CourseData, Chapter, Lesson } from '@/lib/types';

interface AppContextType {
  // Auth State
  isLoggedIn: boolean;
  currentUser: User | null;
  users: Record<string, User>;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
  finishWelcome: () => void;

  // Course State
  courseData: CourseData | null;
  currentChapterId: string;
  setCurrentChapterId: (id: string) => void;
  unlockChapter: (chapterId: string) => void;
  
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
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  // AUTH STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Record<string, User>>({});

  // COURSE STATE
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [currentChapterId, setCurrentChapterId] = useState<string>('chapter-1');

  // MODALS STATE
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<'signin' | 'signup'>('signin');
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<Lesson | null>(null);
  const [isWelcomeDialogOpen, setWelcomeDialogOpen] = useState(false);
  
  useEffect(() => {
    // Simulate loading course data
    setCourseData(staticCourseData);
    // Simulate loading users from a DB
    const storedUsers = localStorage.getItem('course_users');
    if(storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    // Persist users to localStorage
    if (Object.keys(users).length > 0) {
        localStorage.setItem('course_users', JSON.stringify(users));
    }
  }, [users]);

  // --- AUTH METHODS ---
  const signup = (name: string, email: string, password: string): boolean => {
    if (users[email]) {
      return false; // User already exists
    }
    const newUser: User = {
      name,
      email,
      password, // In a real app, hash this!
      unlockedChapters: ['chapter-1'],
    };
    setUsers(prev => ({ ...prev, [email]: newUser }));
    setIsLoggedIn(true);
    setCurrentUser(newUser);
    setWelcomeDialogOpen(true); // Trigger welcome modal
    toast({
        title: 'تم إنشاء الحساب!',
        description: `مرحباً بك في الدورة، ${name}!`,
    });
    return true;
  };
  
  const finishWelcome = () => {
    // This is called after the welcome modal is closed
    // to ensure the UI updates correctly after onboarding.
    if(currentUser) {
      setCurrentUser(u => u ? {...u} : null); // Force re-render
    }
  }

  const login = (email: string, pass: string): boolean => {
    const user = users[email];
    if (user && user.password === pass) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentChapterId('chapter-1'); // Reset view to first chapter
    toast({
        title: "تم تسجيل الخروج",
        variant: "destructive"
    });
  };

  // --- COURSE METHODS ---
  const unlockChapter = (chapterId: string) => {
    if (!currentUser) return;
    
    const user = users[currentUser.email];
    if (user && !user.unlockedChapters.includes(chapterId)) {
        const updatedChapters = [...user.unlockedChapters, chapterId];
        const updatedUser = { ...user, unlockedChapters: updatedChapters };

        setUsers(prev => ({ ...prev, [currentUser.email]: updatedUser }));
        setCurrentUser(updatedUser);
    }
  };

  // --- MODAL METHODS ---
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
    users,
    login,
    signup,
    logout,
    finishWelcome,
    courseData,
    currentChapterId,
    setCurrentChapterId,
    unlockChapter,
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
    setWelcomeDialogOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
