'use client';

import type { Chapter } from '@/lib/types';
import { useAppContext } from '@/hooks/use-app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, PlayCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AITools } from '../ai/ai-tools';

interface ChapterSectionProps {
  chapter: Chapter;
}

export default function ChapterSection({ chapter }: ChapterSectionProps) {
  const {
    isLoggedIn,
    currentUser,
    unlockChapter,
    openVideoModal,
    setAuthDialogOpen,
    setAuthDialogTab,
  } = useAppContext();
  const { toast } = useToast();

  const isChapterUnlocked =
    chapter.id === 'chapter-1' ||
    (isLoggedIn && currentUser?.unlockedChapters.includes(chapter.id));

  const handleContentClick = (
    item: Chapter['introduction'] | Chapter['content'][0]
  ) => {
    if (!isChapterUnlocked) {
      toast({
        title: 'المحتوى مقفل',
        description: 'يرجى الاشتراك في الفصل أولاً لعرض هذا الدرس.',
        variant: 'destructive',
      });
      return;
    }
    openVideoModal(item);
  };

  const handleUnlock = () => {
    if (isLoggedIn) {
      unlockChapter(chapter.id);
      toast({
        title: 'تم فتح الفصل!',
        description: `أنت الآن مشترك في: ${chapter.title}`,
      });
    } else {
      setAuthDialogTab('signin');
      setAuthDialogOpen(true);
      toast({
        title: 'مطلوب تسجيل الدخول',
        description: 'يرجى تسجيل الدخول أولاً للاشتراك.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">{chapter.title}</h2>

      {chapter.introduction && (
        <Button
          onClick={() => handleContentClick(chapter.introduction)}
          variant={isChapterUnlocked ? 'default': 'secondary'}
          className="w-full h-auto py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-3 mb-6 bg-pink-600 hover:bg-pink-500 text-white"
          disabled={!isChapterUnlocked}
        >
          {isChapterUnlocked ? <PlayCircle /> : <Lock />}
          <span>{chapter.introduction.title}</span>
        </Button>
      )}

      <hr className="border-gray-700 my-6" />

      <div className="space-y-4">
        {chapter.content.map((item, index) => (
          <Card key={index} className="glass-card overflow-hidden">
            <CardContent className="p-4 flex items-center justify-between">
              <button
                onClick={() => handleContentClick(item)}
                className="flex-grow text-right disabled:cursor-not-allowed"
                disabled={!isChapterUnlocked}
              >
                <p className="text-gray-200">{item.title}</p>
              </button>
              {!isChapterUnlocked && <Lock className="w-5 h-5 text-muted-foreground mr-4" />}
            </CardContent>
          </Card>
        ))}
      </div>

      {isChapterUnlocked ? (
        <AITools chapter={chapter} />
      ) : (
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <Button
            onClick={handleUnlock}
            size="lg"
            className="shadow-lg transform hover:scale-105"
          >
            اشترك مجاناً لفتح الفصل
          </Button>
        </div>
      )}
    </div>
  );
}
