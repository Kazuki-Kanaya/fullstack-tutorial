// components/ResultList.tsx
import { useEffect, useState } from "react";
import { API } from "../../api/api"
import { ResultType } from "../../schemas/result";

const ResultList = () => {
  const [results, setResults] = useState<ResultType[]>([]);

  useEffect(() => {
    (async () => {
      const data = await API.getResults();
      if (data) setResults(data);
    })();
  }, []);

  console.log(results)

  return (
    <div>
      <h2>感情分析の履歴</h2>
      <ul>
        {results.map((item) => (
          <li key={item._id}>
            <strong>{item.label}</strong>（信頼度: {Math.round(item.score * 100)}%）
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultList;
