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
import { callGenAI } from '@/lib/gen-ai';

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

  const handleExperienceSelect = async (level: string, levelInArabic: string) => {
    if (!currentUser) return;
    
    setIsLoading(true);
    setStep('response');

    const prompt = `أنا طالب جديد اسمه "${currentUser.name}" انضم للتو لدورة تحريك الألعاب ثلاثية الأبعاد. مستوى خبرتي هو "${levelInArabic}". 
    اكتب لي رسالة ترحيب قصيرة ومشجعة باللغة العربية. 
    ثم، بناءً على مستوى خبرتي، اقترح علي من أي فصل يجب أن أبدأ. 
    للمبتدئ، اقترح الفصل الأول. لمن لديه خبرة، اقترح مراجعة الفصل الثالث. للمتقدم، اقترح البدء من الفصل الخامس.
    اجعل الاقتراح في جملة واضحة.`;

    try {
        const responseText = await callGenAI(prompt);
        setAiResponse(responseText);
        
        let chapterToGo = 'chapter-1';
        if (level === 'intermediate') chapterToGo = 'chapter-3';
        if (level === 'advanced') chapterToGo = 'chapter-5';
        setCurrentChapterId(chapterToGo);

    } catch (error) {
        setAiResponse('حدث خطأ. ولكن لا تقلق، يمكنك البدء من الفصل الأول واستكشاف باقي الفصول.');
    } finally {
        setIsLoading(false);
    }
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
    <Dialog open={open} onOpenChange={handleClose} >
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
