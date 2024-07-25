import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState("");

  const apiKey = import.meta.env.REACT_APP_API_KEY;

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  async function generateAnswer() {
    setAnswer("Loading...");
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      method: "post",
      data: {
        contents: [{ parts: [{ text: inputValue }] }],
      },
    });
    setAnswer(
      response.data.candidates[0].content.parts[0].text
    );
  }

  return (
    <div className="app-container">
      <h1 className="text-center">Chat-AI</h1>
      <div className="input-section">
        <textarea
          className="prompt-input"
          value={inputValue}
          onChange={handleChange}
          placeholder="Ask me anything"
        ></textarea>
        <div className="buttons">
          <button className="btn-clear" onClick={clearInput}>
            Clear
          </button>
          <button className="btn-submit" onClick={generateAnswer}>
            Submit
          </button>
        </div>
      </div>
      <div className="response-section">
        <pre>{answer}</pre>
      </div>
    </div>
  );
}

export default App;
