import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Currency() {
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("USD");
  const [converted, setConverted] = useState(null);
  const [rate, setRate] = useState(null);
  const [error, setError] = useState("");

  const convert = async () => {
    setConverted(null);
    setRate(null);
    setError("");
    if (!amount) return setError("Please enter an amount.");

    try {
      const res = await axios.get(`${API_URL}/api/currency`, { params: { amount, to } });
      setConverted(res.data.converted);
      setRate(res.data.rate);
    } catch (err) {
      console.error("convert error:", err.response?.data || err.message);
      setError("Conversion failed. Try again.");
    }
  };

  return (
    <div className="card">
      <h2>Currency Converter 💱</h2>
      <div className="input-group">
        <input type="number" placeholder="Amount in INR" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <button onClick={convert}>Convert</button>
      </div>

      {error && <p className="error">{error}</p>}
      {converted && (
        <div className="result">
          <p>{amount} INR = {converted} {to}</p>
          <p>1 INR = {rate.toFixed(6)} {to}</p>
        </div>
      )}
    </div>
  );
}
