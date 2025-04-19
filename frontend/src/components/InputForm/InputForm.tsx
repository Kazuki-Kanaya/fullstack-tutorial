import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormSchema, InputFormType } from "../../schemas/inputForm"

type Props = {
    onSubmit: (prompt: InputFormType) => void;
}

const InputForm = (props: Props) => {

    const {register, handleSubmit, formState: { errors, isValid }} = useForm<InputFormType>({
        mode: "onChange",
        resolver: zodResolver(InputFormSchema)
    })

    const {onSubmit} = props;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("text")} />
            {errors.text && <p>{errors.text.message}</p>}
            <button type="submit" disabled={!isValid}>分析する</button>
        </form>
    )
}

export default InputForm