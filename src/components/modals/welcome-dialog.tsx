'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/use-app-context';
import { Icons } from '../icons';

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const experienceLevels = [
  { key: 'beginner', label: 'مبتدئ', color: 'bg-indigo-600', hover: 'hover:bg-indigo-500' },
  { key: 'intermediate', label: 'لدي خبرة', color: 'bg-pink-600', hover: 'hover:bg-pink-500' },
  { key: 'advanced', label: 'متقدم', color: 'bg-gray-700', hover: 'hover:bg-gray-600' },
];

export default function WelcomeDialog({ open, onOpenChange }: WelcomeDialogProps) {
  const { currentUser, finishWelcome, setCurrentChapterId } = useAppContext();
  const [step, setStep] = useState<'select' | 'response'>('select');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleExperienceSelect = (level: string, levelInArabic: string) => {
    if (!currentUser) return;
    
    setIsLoading(true);
    setStep('response');

    let response = `أهلاً بك يا ${currentUser.name}! سعيدون بانضمامك. `;
    let chapterToGo = 'chapter-1';

    if (level === 'intermediate') {
        response += "بما أن لديك خبرة، نقترح عليك مراجعة الفصل الثالث للانطلاق بقوة.";
        chapterToGo = 'chapter-3';
    } else if (level === 'advanced') {
        response += "بخبرتك المتقدمة، يمكنك البدء مباشرة من الفصل الخامس لتحدي حقيقي.";
        chapterToGo = 'chapter-5';
    } else {
        response += "كنقطة بداية، نوصيك بالبدء من الفصل الأول لتغطية كل الأساسيات.";
    }

    setTimeout(() => {
        setAiResponse(response);
        setCurrentChapterId(chapterToGo);
        setIsLoading(false);
    }, 1000);
  };
  
  const handleClose = () => {
    finishWelcome();
    onOpenChange(false);
    // Reset for next time
    setTimeout(() => {
        setStep('select');
        setAiResponse('');
    }, 500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-lg p-8 text-center" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold gradient-text mb-4">
            أهلاً بك معنا! ✨
          </DialogTitle>
        </DialogHeader>

        {step === 'select' && (
          <>
            <p className="text-gray-300 mb-6">
              لمساعدتك على البدء، اختر مستوى خبرتك الحالي في التحريك:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              {experienceLevels.map(level => (
                <Button
                  key={level.key}
                  onClick={() => handleExperienceSelect(level.key, level.label)}
                  className={`${level.color} ${level.hover} text-white font-bold py-2 px-6 rounded-lg transition w-full`}
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </>
        )}

        {step === 'response' && (
          <div>
            <div className="mt-4 p-4 bg-background/70 rounded-lg text-gray-300 whitespace-pre-wrap min-h-[150px] flex items-center justify-center">
              {isLoading ? <Icons.spinner /> : <p>{aiResponse}</p>}
            </div>
            <Button onClick={handleClose} className="mt-6" size="lg" disabled={isLoading}>
              ابدأ التعلم
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
