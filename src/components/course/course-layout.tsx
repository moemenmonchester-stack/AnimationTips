'use client';

import { useAppContext } from '@/hooks/use-app-context';
import Sidebar from './sidebar';
import ChapterSection from './chapter-section';

export function CourseLayout() {
  const { courseData, currentChapterId } = useAppContext();

  if (!courseData) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1 lg:sticky top-8 self-start glass-card p-4 md:p-6 rounded-2xl shadow-xl">
        <Sidebar />
      </aside>

      <div className="lg:col-span-3 min-h-[60vh]">
        {courseData.chapters.map(chapter => (
          <div
            key={chapter.id}
            className={currentChapterId === chapter.id ? 'block' : 'hidden'}
          >
            <ChapterSection chapter={chapter} />
          </div>
        ))}
      </div>
    </div>
  );
}
