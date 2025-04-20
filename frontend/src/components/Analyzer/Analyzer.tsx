import { useState } from "react";
import styles from "./Analyzer.module.css";
import { API } from "../../api/api";
import InputForm from "../InputForm/InputForm";
import { InputFormType } from "../../schemas/inputForm";
import { PredictType } from "../../schemas/predict";
import ResultList from "../ResultList/ResultList";
import { ResultType } from "../../schemas/result";

const Analyzer = () => {
    const [text, setText] = useState<string>("");
    const [inference, setInference] = useState<PredictType | undefined>(undefined);
    const [results, setResults] = useState<ResultType[]>([]);


    const onSubmit = (input: InputFormType) => {
        setText(input.text);
        (async () => {
            const response = await API.getEmotional(input.text);
            if (response) {
                setInference(response);
            }
            const data = await API.getResults();
            if (data) {
                setResults(data)
            };
        })();
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContent}>
            <InputForm onSubmit={onSubmit} />
            <button
                className={styles.resetButton}
                onClick={
                    async () => {
                        API.deleteResults();
                        setText("");
                        setInference(undefined);
                        setResults([]);
                }}
            >
                リセット
            </button>

            {inference && (
                <div className={styles.resultSection}>
                <div className={styles.resultText}>{text}</div>
                <div className={styles.resultLabel}>
                    感情： {inference.label}（信頼度：{Math.round(inference.score * 100)}%）
                </div>
                </div>
            )}

            <ResultList results={results} />
            </div>
        </div>
    );
};

export default Analyzer;
