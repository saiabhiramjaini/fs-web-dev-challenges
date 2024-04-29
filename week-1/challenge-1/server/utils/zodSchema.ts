import { z } from 'zod';

export const StudentDataSchema = z.object({
  image: z.string().min(1, 'Image is required'),
  name: z.string().min(1, 'Name is required'),
  rollNo: z.number().min(1,"Roll no is required").int('Roll No. must contain only numbers'),
  collegeName: z.string().min(1,"Enter college name"),
});

export type StudentData = z.infer<typeof StudentDataSchema>;