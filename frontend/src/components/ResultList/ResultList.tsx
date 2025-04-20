import { ResultType } from "../../schemas/result";
import styles from "./ResultList.module.css";

type Props = {
  results: ResultType[];
}

const ResultList = (props: Props) => {
  const { results } = props


  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>感情分析の履歴</h2>
      <ul className={styles.list}>
        {results.map((item) => (
          <li key={item._id} className={styles.item}>
            <p className={styles.text}>テキスト: {item.text}</p>
            <p className={styles.label}>
              判定: <strong>{item.label}</strong>（信頼度: {Math.round(item.score * 100)}%）
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultList;
