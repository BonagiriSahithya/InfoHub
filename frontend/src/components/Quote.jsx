import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Quote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const getQuote = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/quote`);
      setQuote(res.data.quote);
      setAuthor(res.data.author || "Unknown");
    } catch (err) {
      console.error("quote error:", err.response?.data || err.message);
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
