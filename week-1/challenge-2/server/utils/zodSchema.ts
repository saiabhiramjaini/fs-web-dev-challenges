import { z } from 'zod';

export const ActivityDataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  deadLine: z.string(),
});

export type ActivityData = z.infer<typeof ActivityDataSchema>;