'use client';
import { useEffect, useRef } from 'react';
import { useAppContext } from '@/hooks/use-app-context';
import Chart from 'chart.js/auto';

export function ProgressChart() {
  const { courseData, currentChapterId } = useAppContext();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !courseData) return;

    const activeIndex = courseData.chapters.findIndex(c => c.id === currentChapterId);
    const chapterCount = courseData.chapters.length;
    const data = {
        labels: courseData.chapters.map(c => c.title.split(':')[0]),
        datasets: [{
            data: Array(chapterCount).fill(1),
            backgroundColor: Array(chapterCount).fill('#4a5568'), 
            borderColor: '#0a0a1a', 
            borderWidth: 4,
            hoverOffset: 8
        }]
    };
    
    if (activeIndex !== -1) {
        data.datasets[0].backgroundColor[activeIndex] = '#4f46e5';
    }


    if (chartInstance.current) {
        chartInstance.current.data = data;
        chartInstance.current.update();
    } else {
        const ctx = chartRef.current.getContext('2d');
        if (ctx) {
            chartInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: { 
                        legend: { display: false }, 
                        tooltip: { 
                            enabled: true, 
                            mode: 'index',
                            intersect: false,
                            rtl: true, 
                            callbacks: { label: c => c.label || '' } 
                        } 
                    }
                }
            });
        }
    }
  }, [courseData, currentChapterId]);

  if (!courseData) return null;

  const activeIndex = courseData.chapters.findIndex(c => c.id === currentChapterId);
  const chapterCount = courseData.chapters.length;

  return (
    <>
      <canvas ref={chartRef}></canvas>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-200 pointer-events-none">
          الفصل {activeIndex + 1} / {chapterCount}
      </div>
    </>
  );
}
