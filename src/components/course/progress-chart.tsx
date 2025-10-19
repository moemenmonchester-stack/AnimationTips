'use client';
import { useAppContext } from '@/hooks/use-app-context';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

export function ProgressChart() {
  const { courseData, currentChapterId } = useAppContext();

  if (!courseData) return null;

  const chapterCount = courseData.chapters.length;
  const data = courseData.chapters.map(c => ({
    name: c.title.split(':')[0],
    value: 1,
    id: c.id,
  }));
  const activeIndex = courseData.chapters.findIndex(c => c.id === currentChapterId);

  return (
    <>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === activeIndex ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
              stroke="hsl(var(--background))"
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
            direction: 'rtl',
          }}
          cursor={{ fill: 'hsla(var(--primary), 0.1)' }}
        />
      </PieChart>
    </ResponsiveContainer>
    <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-200 pointer-events-none">
        الفصل {activeIndex + 1} / {chapterCount}
    </div>
    </>
  );
}
