'use client';

import { useAppContext } from '@/hooks/use-app-context';
import { ProgressChart } from './progress-chart';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function Sidebar() {
  const {
    courseData,
    isLoggedIn,
    currentUser,
    currentChapterId,
    setCurrentChapterId,
  } = useAppContext();
  const { toast } = useToast();

  if (!courseData) return null;

  const handleNavClick = (chapterId: string) => {
    setCurrentChapterId(chapterId);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-indigo-400 text-center">
        فصول الدورة
      </h2>
      <div className="relative w-full max-w-[300px] mx-auto h-[300px] mb-6">
        <ProgressChart />
      </div>
      <nav className="space-y-3">
        {courseData.chapters.map(chapter => {
          const isUnlocked =
            chapter.id === 'chapter-1' ||
            (isLoggedIn && currentUser?.unlockedChapters?.includes(chapter.id));
          const isActive = chapter.id === currentChapterId;

          return (
            <button
              key={chapter.id}
              onClick={() => handleNavClick(chapter.id)}
              className={cn(
                'w-full text-center font-semibold text-gray-200 rounded-lg p-3 transition-all duration-300 flex items-center justify-center gap-2',
                isActive
                  ? 'bg-primary text-primary-foreground scale-105 shadow-lg shadow-primary/30'
                  : 'bg-secondary hover:bg-primary/80',
                !isUnlocked && 'opacity-70'
              )}
              title={!isUnlocked ? 'اشترك في الفصل لفتح هذا المحتوى' : ''}
            >
              {!isUnlocked && <Lock className="w-4 h-4" />}
              <span>{chapter.title.split(':')[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
