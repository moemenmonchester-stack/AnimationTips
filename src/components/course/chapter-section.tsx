'use client';

import { useState } from 'react';
import type { Chapter } from '@/lib/types';
import { useAppContext } from '@/hooks/use-app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Lock, PlayCircle, Sparkles, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { callGenAI } from '@/lib/gen-ai';
import { Icons } from '../icons';

interface ChapterSectionProps {
  chapter: Chapter;
}

export default function ChapterSection({ chapter }: ChapterSectionProps) {
  const {
    isLoggedIn,
    currentUser,
    openVideoModal,
    setAuthDialogOpen,
    setAuthDialogTab,
    setPaymentModalOpen,
    setChapterToUnlock,
  } = useAppContext();
  const { toast } = useToast();
  
  const [ideaPrompt, setIdeaPrompt] = useState('');
  const [qaPrompt, setQaPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [summaryState, setSummaryState] = useState<Record<number, {loading: boolean; text: string}>>({});

  const isChapterUnlocked =
    (isLoggedIn && currentUser?.unlockedChapters.includes(chapter.id));

  // The introduction to chapter-1 is always unlocked.
  const isIntroUnlocked = chapter.id === 'chapter-1' || isChapterUnlocked;

  const handleContentClick = (
    item: Chapter['introduction'] | Chapter['content'][0],
    isIntro: boolean = false
  ) => {
    const isItemUnlocked = isIntro ? isIntroUnlocked : isChapterUnlocked;

    if (!isItemUnlocked) {
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
          if (chapter.id === 'chapter-1') {
            setChapterToUnlock(chapter.id);
            setPaymentModalOpen(true);
          } else {
             toast({ title: 'قريباً', description: 'هذا الفصل غير متاح للاشتراك حالياً.' });
          }
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

  const handleAiInteraction = async (type: 'summary' | 'idea' | 'qa', contentIndex?: number) => {
      if (isAiLoading) return;
      setIsAiLoading(true);
      setAiResponse('');

      let prompt = '';
      if(type === 'summary' && contentIndex !== undefined) {
          const lesson = chapter.content[contentIndex];
          if(summaryState[contentIndex]?.text) {
              setSummaryState(prev => ({...prev, [contentIndex]: {loading: false, text: ''}}));
              setIsAiLoading(false);
              return;
          }
          prompt = `لخص هذا الدرس من دورة تحريك الألعاب بعنوان "${lesson.title}" في 3-4 نقاط رئيسية باللغة العربية. ركز على المفاهيم الأساسية التي يجب أن يفهمها الطالب.`;
          setSummaryState(prev => ({...prev, [contentIndex]: {loading: true, text: ''}}));
      } else if (type === 'idea') {
          prompt = `أنا طالب في دورة تحريك ألعاب ثلاثية الأبعاد. أنا حاليًا في فصل بعنوان "${chapter.title}". أريد 3 أفكار لتمارين تحريك عملية ومبتكرة لتطبيق ما تعلمته في هذا الفصل، مع التركيز على الكلمة المفتاحية: "${ideaPrompt || 'أي شيء عام'}". قدم الأفكار في قائمة مرقمة مع وصف بسيط لكل فكرة باللغة العربية.`;
      } else if (type === 'qa') {
          if (!qaPrompt.trim()) {
              toast({ title: 'خطأ', description: 'يرجى كتابة سؤالك أولاً', variant: 'destructive' });
              setIsAiLoading(false);
              return;
          }
          const lessonTitles = chapter.content.map(c => c.title).join(', ');
          prompt = `أجب بصفتك مساعد خبير في تحريك الألعاب ثلاثية الأبعاد. طالب يسأل السؤال التالي ضمن فصل بعنوان "${chapter.title}" والذي يغطي موضوعات مثل: ${lessonTitles}. السؤال هو: "${qaPrompt}". قدم إجابة واضحة ومباشرة ومفيدة باللغة العربية.`;
      }

      try {
          const responseText = await callGenAI(prompt);
          if(type === 'summary' && contentIndex !== undefined) {
              setSummaryState(prev => ({...prev, [contentIndex]: {loading: false, text: responseText}}));
          } else {
              setAiResponse(responseText);
          }
      } catch (error) {
          const errorMessage = 'حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. يرجى المحاولة مرة أخرى.';
          if(type === 'summary' && contentIndex !== undefined) {
            setSummaryState(prev => ({...prev, [contentIndex]: {loading: false, text: errorMessage}}));
          } else {
            setAiResponse(errorMessage);
          }
      } finally {
          setIsAiLoading(false);
      }
  }


  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">{chapter.title}</h2>

      {chapter.introduction && (
        <Button
          onClick={() => handleContentClick(chapter.introduction, true)}
          variant={'secondary'}
          className="w-full h-auto py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-3 bg-pink-600 hover:bg-pink-500 text-white disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!isIntroUnlocked}
        >
          {!isIntroUnlocked ? <Lock /> : <PlayCircle />}
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
                className="flex-grow text-right disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!isChapterUnlocked}
              >
                <p className="text-gray-200 font-bold text-indigo-400">{item.title}</p>
              </button>
              {isChapterUnlocked ? (
                 <Button variant="ghost" size="icon" onClick={() => handleAiInteraction('summary', index)} className="text-2xl hover:opacity-75 transition-opacity p-2 -mr-2">
                    <Sparkles className='h-5 w-5' />
                 </Button>
              ) : (
                  <Lock className="w-5 h-5 text-muted-foreground mr-4" />
              )}
            </CardContent>
             {summaryState[index]?.loading && <div className='p-4 border-t border-gray-700/50'><Icons.spinner /></div>}
             {summaryState[index]?.text && (
                <div className='p-4 border-t border-gray-700/50 text-gray-300 whitespace-pre-wrap'>
                    {summaryState[index].text}
                </div>
             )}
          </Card>
        ))}
      </div>

      {!isChapterUnlocked && (
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <Button
            onClick={handleUnlock}
            size="lg"
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-500 transition-all duration-300 text-lg shadow-lg transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
            disabled={chapter.id !== 'chapter-1'}
          >
            {chapter.id === 'chapter-1' ? 'اشترك الآن بـ 1000 جنيه' : 'قريباً'}
          </Button>
        </div>
      )}

      {isChapterUnlocked && (
          <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-2xl font-bold text-center mb-4 gradient-text">أدوات الذكاء الاصطناعي ✨</h3>
              <div className="glass-card p-6 rounded-lg space-y-8">
                  <div>
                      <h4 className="text-lg font-semibold mb-2 text-indigo-300">✨ مولد أفكار التحريك</h4>
                      <p className="text-sm text-gray-400 mb-4">أدخل كلمة مفتاحية (مثل: "شخصية قوية"، "قفزة خفيفة") للحصول على أفكار إبداعية لتمارين التحريك.</p>
                      <div className="flex gap-2 mb-4">
                          <Input type="text" value={ideaPrompt} onChange={e => setIdeaPrompt(e.target.value)} className="bg-gray-900/50" placeholder="مثال: قفزة محارب، مشية روبوت حزين..." />
                          <Button onClick={() => handleAiInteraction('idea')} className="bg-indigo-600 hover:bg-indigo-500" disabled={isAiLoading}>
                              <Send className="w-4 h-4" />
                          </Button>
                      </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-pink-400">✨ اسأل المساعد الذكي</h4>
                    <p className="text-sm text-gray-400 mb-4">هل لديك سؤال حول هذا الفصل؟ اكتبه هنا واحصل على شرح فوري.</p>
                    <div className="flex gap-2">
                        <Input type="text" value={qaPrompt} onChange={e => setQaPrompt(e.target.value)} className="bg-gray-900/50" placeholder="اكتب سؤالك هنا..." />
                        <Button onClick={() => handleAiInteraction('qa')} className="bg-pink-600 hover:bg-pink-500" disabled={isAiLoading}>
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                  </div>

                  {(isAiLoading || aiResponse) && (
                    <div className="mt-4 p-4 bg-gray-900/70 rounded-lg text-gray-300 whitespace-pre-wrap min-h-[100px] flex items-center justify-center">
                        {isAiLoading ? <Icons.spinner /> : <p>{aiResponse}</p>}
                    </div>
                  )}
              </div>
          </div>
      )}
    </div>
  );
}
