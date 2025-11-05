import { useState } from "react";
import axios from "axios";

export default function Quote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const getQuote = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/quote");
      setQuote(res.data.quote);
      setAuthor(res.data.author || "Unknown");
    } catch {
      setQuote("Failed to fetch quote.");
      setAuthor("");
    }
  };

  return (
    <div className="card">
      <h2>Motivational Quote 💡</h2>
      <button onClick={getQuote}>Get Quote</button>
      {quote && (
        <div className="result">
          <p>"{quote}"</p>
          <p>- {author}</p>
        </div>
      )}
    </div>
  );
}
