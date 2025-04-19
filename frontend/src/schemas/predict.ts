import { z } from "zod";

export const PredictSchema = z.object({
    label: z.string(),
    score: z.number(),
});

export type PredictType = z.infer<typeof PredictSchema>;