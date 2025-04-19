import { z } from "zod";
import { PredictSchema } from "./predict";

export const ResultSchema = PredictSchema.extend({
    _id: z.string(),
});

export const ResultListSchema = z.array(ResultSchema);

export type ResultItem = z.infer<typeof ResultSchema>;
