import { z } from "zod";

export const InputFormSchema = z.object({
    text: z.string().nonempty("空文字は送信できません。").min(4, "4文字以上で入力してください"),
});

export type InputFormType = z.infer<typeof InputFormSchema>;