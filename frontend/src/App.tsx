import { useState } from 'react'
import './App.css'
import { API } from './api/api'
import InputForm from './components/InputForm/InputForm'
import { InputFormType } from './schemas/inputForm'
import { PredictType } from './schemas/predict'
import ResultList from './components/ResultList/ResultList'

const App = () => {

  const [text, setText] = useState<string>("")
  const [inference, setInference] = useState<PredictType | undefined>(undefined)
  
  const onSubmit = (input: InputFormType) => {
    setText(input.text);
    (async () => {
      const response = await API.getEmotional(input.text);
      if (response) {
        setInference(response);
      }
    })();
  }

  return (
    <div>
      <InputForm onSubmit={onSubmit} />
      <button onClick={() => window.location.reload()}>リセット</button>
      {inference && (
        <>
        <h1>{text}</h1>
        <h3>
          感情： {inference.label} (信頼度： {inference.score})
        </h3>
        </>
      )}
    </div>
  )
}

export default App
