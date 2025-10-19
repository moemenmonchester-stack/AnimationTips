'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering questions about a specific chapter in the course.
 *
 * It takes a chapter title and a question as input, and returns an AI-generated answer.
 *
 * @flow answerChapterQuestionsFlow - The Genkit flow for answering chapter questions.
 * @input AnswerChapterQuestionsInput - The input type for the answerChapterQuestionsFlow.
 * @output AnswerChapterQuestionsOutput - The output type for the answerChapterQuestionsFlow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerChapterQuestionsInputSchema = z.object({
  chapterTitle: z.string().describe('The title of the chapter.'),
  question: z.string().describe('The question about the chapter content.'),
  lessonTitles: z.string().describe('The lesson titles in the chapter'),
});

export type AnswerChapterQuestionsInput = z.infer<typeof AnswerChapterQuestionsInputSchema>;

const AnswerChapterQuestionsOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the question.'),
});

export type AnswerChapterQuestionsOutput = z.infer<typeof AnswerChapterQuestionsOutputSchema>;

export async function answerChapterQuestions(input: AnswerChapterQuestionsInput): Promise<AnswerChapterQuestionsOutput> {
  return answerChapterQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerChapterQuestionsPrompt',
  input: {schema: AnswerChapterQuestionsInputSchema},
  output: {schema: AnswerChapterQuestionsOutputSchema},
  prompt: `أجب بصفتك مساعد خبير في تحريك الألعاب ثلاثية الأبعاد. طالب يسأل السؤال التالي ضمن فصل بعنوان "{{{chapterTitle}}}" والذي يغطي موضوعات مثل: {{{lessonTitles}}}. السؤال هو: "{{{question}}}". قدم إجابة واضحة ومباشرة ومفيدة باللغة العربية.`,
});

const answerChapterQuestionsFlow = ai.defineFlow(
  {
    name: 'answerChapterQuestionsFlow',
    inputSchema: AnswerChapterQuestionsInputSchema,
    outputSchema: AnswerChapterQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
