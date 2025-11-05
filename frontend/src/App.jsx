import { useState } from "react";
import Weather from "./components/Weather";
import Currency from "./components/Currency";
import Quote from "./components/Quote";
import "./App.css";

function App() {
  const [tab, setTab] = useState("weather");

  return (
    <div className="App">
      <h1 className="app-title">🌟 InfoHub 🌟</h1>
      <div className="tab-buttons">
        <button className={tab === "weather" ? "active" : ""} onClick={() => setTab("weather")}>Weather</button>
        <button className={tab === "currency" ? "active" : ""} onClick={() => setTab("currency")}>Currency</button>
        <button className={tab === "quote" ? "active" : ""} onClick={() => setTab("quote")}>Quote</button>
      </div>

      <div className="tab-content">
        {tab === "weather" && <Weather />}
        {tab === "currency" && <Currency />}
        {tab === "quote" && <Quote />}
      </div>
    </div>
  );
}

export default App;
