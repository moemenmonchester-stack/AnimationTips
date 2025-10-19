'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ThreeScene from './three-scene';
import { Icons } from '../icons';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  const [overview, setOverview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  const handleLearnMore = () => {
    if (showOverview) {
      setShowOverview(false);
      return;
    }

    setShowOverview(true);
    if (overview) return;

    setIsLoading(true);
    // Simulate fetching overview
    setTimeout(() => {
        setOverview(`انضم إلى دورتنا 'دورة تحريك الألعاب ثلاثية الأبعاد' وارتق بمهاراتك من الصفر إلى الاحتراف. تعلم أساسيات التحريك، تصميم الشخصيات، والتكامل مع محركات الألعاب مثل Unity وUnreal. ستبني مشروعًا قويًا لعرض أعمالك وتكون جاهزًا لدخول سوق العمل بقوة. سجل الآن وابدأ رحلتك في عالم تصميم الألعاب!`);
        setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative">
      <ThreeScene />
      <div className="relative z-10 text-center border-b-2 border-primary pb-8 pt-8 mt-4">
        <h1 className="text-4xl md:text-6xl font-black gradient-text mb-8 leading-tight">
          دورة تحريك الألعاب ثلاثية الأبعاد
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto pt-4">
          الدورة التي تأخذك من الصفر إلى الاحتراف في عالم تحريك الألعاب.
        </p>
        <Button
          onClick={handleLearnMore}
          variant="outline"
          className="mt-6 bg-transparent border-primary text-primary/80 font-bold py-2 px-6 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Sparkles className="ml-2 h-4 w-4" />
          اعرف المزيد
        </Button>
        {showOverview && (
          <div className="glass-card p-6 rounded-lg mt-6 max-w-3xl mx-auto text-right min-h-[100px] flex items-center justify-center">
            {isLoading ? (
              <Icons.spinner className="text-accent" />
            ) : (
              <p className="whitespace-pre-wrap">{overview}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
