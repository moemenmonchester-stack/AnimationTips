'use server';

/**
 * @fileOverview This file defines the GenerateAnimationIdeas flow, which takes a keyword as input and returns a list of AI-generated animation ideas.
 *
 * @file GenerateAnimationIdeas - A function that generates animation ideas based on a keyword.
 * @file GenerateAnimationIdeasInput - The input type for the GenerateAnimationIdeas function.
 * @file GenerateAnimationIdeasOutput - The output type for the GenerateAnimationIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnimationIdeasInputSchema = z.object({
  keyword: z.string().describe('A keyword to generate animation ideas.'),
});
export type GenerateAnimationIdeasInput = z.infer<typeof GenerateAnimationIdeasInputSchema>;

const GenerateAnimationIdeasOutputSchema = z.object({
  ideas: z.string().describe('A list of animation ideas based on the keyword.'),
});
export type GenerateAnimationIdeasOutput = z.infer<typeof GenerateAnimationIdeasOutputSchema>;

export async function generateAnimationIdeas(input: GenerateAnimationIdeasInput): Promise<GenerateAnimationIdeasOutput> {
  return generateAnimationIdeasFlow(input);
}

const generateAnimationIdeasPrompt = ai.definePrompt({
  name: 'generateAnimationIdeasPrompt',
  input: {schema: GenerateAnimationIdeasInputSchema},
  output: {schema: GenerateAnimationIdeasOutputSchema},
  prompt: `أنت مساعد خبير في مجال تحريك الألعاب ثلاثية الأبعاد.
  أعطِ قائمة بأفكار لتمارين تحريك عملية ومبتكرة لتطبيق ما تعلمته، مع التركيز على الكلمة المفتاحية: "{{keyword}}".
  يجب أن تكون الأفكار المقدمة باللغة العربية.
  `, // Prompt in Arabic
});

const generateAnimationIdeasFlow = ai.defineFlow(
  {
    name: 'generateAnimationIdeasFlow',
    inputSchema: GenerateAnimationIdeasInputSchema,
    outputSchema: GenerateAnimationIdeasOutputSchema,
  },
  async input => {
    const {output} = await generateAnimationIdeasPrompt(input);
    return output!;
  }
);
