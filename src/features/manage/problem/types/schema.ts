import { z } from "zod";

export const testCaseSchema = z.object({
  input: z.string().optional(),
  expectedOutput: z.string().optional(),
  isExample: z.boolean(),
  isHidden: z.boolean(),
});

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "タイトルは必須です",
  }),
  problemStatement: z.string().min(1, {
    message: "問題文は必須です",
  }),
  constraints: z.string().optional(),
  defaultCode: z.string().optional(),
  difficultyLevel: z.number().min(1).max(3),
  testCases: z
    .array(testCaseSchema)
    .min(2, {
      message: "テストケースは最低2つ必要です",
    })
    .refine((testCases) => testCases.some((testCase) => testCase.isExample), {
      message: "テストケースの中に少なくとも1つはisSampleがtrueである必要があります",
    }),
});

export type FormValues = z.infer<typeof formSchema>;
export type TestCase = z.infer<typeof testCaseSchema>;
