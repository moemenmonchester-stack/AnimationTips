'use client';
import { useState } from 'react';
import type { Chapter } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateAnimationIdeas } from '@/ai/flows/generate-animation-ideas';
import { answerChapterQuestions } from '@/ai/flows/answer-chapter-questions';
import { Icons } from '../icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface AIToolsProps {
  chapter: Chapter;
}

export function AITools({ chapter }: AIToolsProps) {
  const [ideaKeyword, setIdeaKeyword] = useState('');
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateIdea = async () => {
    setIsLoading(true);
    setAiResponse('');
    try {
      const result = await generateAnimationIdeas({ keyword: ideaKeyword });
      setAiResponse(result.ideas);
    } catch (error) {
      console.error(error);
      setAiResponse('حدث خطأ أثناء توليد الأفكار. حاول مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setAiResponse('');
    try {
      const result = await answerChapterQuestions({
        chapterTitle: chapter.title,
        question: question,
        lessonTitles: chapter.content.map(c => c.title).join(', '),
      });
      setAiResponse(result.answer);
    } catch (error) {
      console.error(error);
      setAiResponse('حدث خطأ أثناء الإجابة على السؤال. حاول مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-700">
      <h3 className="text-2xl font-bold text-center mb-4 gradient-text">
        أدوات الذكاء الاصطناعي ✨
      </h3>
      <Card className="glass-card p-2 md:p-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-300">
            ✨ مولد أفكار التحريك
          </CardTitle>
          <CardDescription>
            أدخل كلمة مفتاحية للحصول على أفكار إبداعية لتمارين التحريك.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <Input
              type="text"
              id={`idea-prompt-${chapter.id}`}
              value={ideaKeyword}
              onChange={e => setIdeaKeyword(e.target.value)}
              className="bg-background/50 placeholder:text-muted-foreground"
              placeholder="مثال: قفزة محارب، مشية روبوت حزين..."
            />
            <Button onClick={handleGenerateIdea} disabled={isLoading}>
              توليد فكرة
            </Button>
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle className="text-lg font-semibold text-pink-400">
            ✨ اسأل المساعد الذكي
          </CardTitle>
          <CardDescription>
            هل لديك سؤال حول هذا الفصل؟ اكتبه هنا واحصل على شرح فوري.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              id={`qa-prompt-${chapter.id}`}
              value={question}
              onChange={e => setQuestion(e.target.value)}
              className="bg-background/50 placeholder:text-muted-foreground"
              placeholder="اكتب سؤالك هنا..."
            />
            <Button onClick={handleAskQuestion} disabled={isLoading} variant="secondary" className='bg-accent hover:bg-accent/80'>
              اسأل
            </Button>
          </div>
        </CardContent>

        {(isLoading || aiResponse) && (
          <div className="mt-4 p-4 bg-background/70 rounded-lg text-gray-300 whitespace-pre-wrap min-h-[100px] flex items-center justify-center">
            {isLoading ? <Icons.spinner /> : <p>{aiResponse}</p>}
          </div>
        )}
      </Card>
    </div>
  );
}
