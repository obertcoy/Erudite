import { z } from 'zod';

export const RuleSchema = z.object({
    ruleTitle: z.string()
      .min(5, { message: 'Rule title must be at least 5 characters long.' })
      .max(100, { message: 'Rule title cannot exceed 100 characters.' }),
    
    ruleDescription: z.string()
      .min(10, { message: 'Rule description must be at least 10 characters long.' })
      .max(500, { message: 'Rule description cannot exceed 500 characters.' }),
  });

export type RuleDto = z.infer<typeof RuleSchema>;
