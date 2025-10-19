'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a course overview using AI.
 *
 * The flow takes no input and returns a string containing the course overview.
 *
 * @file GenerateCourseOverviewFlow.ts
 * @exports generateCourseOverview
 * @exports GenerateCourseOverviewOutput
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseOverviewOutputSchema = z.string().describe('The generated course overview.');
export type GenerateCourseOverviewOutput = z.infer<typeof GenerateCourseOverviewOutputSchema>;

export async function generateCourseOverview(): Promise<GenerateCourseOverviewOutput> {
  return generateCourseOverviewFlow();
}

const prompt = ai.definePrompt({
  name: 'generateCourseOverviewPrompt',
  output: {schema: GenerateCourseOverviewOutputSchema},
  prompt: `You are an expert course description writer.
  Generate an engaging and detailed course overview for a course named 'دورة تحريك الألعاب ثلاثية الأبعاد' (3D Game Animation Course) that highlights what students will learn and achieve.
  The course teaches students 3D game animation, including character animation, game engine integration, and building a professional portfolio.
  Write in Arabic, aiming for a length of 100-150 words. Use an enthusiastic tone to encourage enrollment.`,
});

const generateCourseOverviewFlow = ai.defineFlow(
  {
    name: 'generateCourseOverviewFlow',
    inputSchema: z.void(),
    outputSchema: GenerateCourseOverviewOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
