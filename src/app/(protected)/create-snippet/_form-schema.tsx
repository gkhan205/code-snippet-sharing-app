import { z } from 'zod';

export const createSnippetFormSchema = z.object({
  title: z.string().min(3),
  code: z.string(),
  language: z.string(),
  tags: z.string().optional(),
  description: z.string().optional(),
});
