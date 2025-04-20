import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormSchema, InputFormType } from "../../schemas/inputForm";
import styles from "./InputForm.module.css";

type Props = {
    onSubmit: (text: InputFormType) => void;
};

const InputForm = ({ onSubmit }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<InputFormType>({
        mode: "onChange",
        resolver: zodResolver(InputFormSchema),
    });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
    {errors.text && <p className={styles.error}>{errors.text.message}</p>}
        <input
            type="text"
            placeholder="ここにテキストを入力"
            {...register("text")}
            className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={!isValid}>
            分析する
        </button>
    </form>
  );
};

export default InputForm;
