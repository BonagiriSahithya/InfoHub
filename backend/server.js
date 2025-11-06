// backend/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Allowed origins: local dev + deployed frontend (add your real Vercel URL)
const allowedOrigins = [
  process.env.FRONTEND_URL,             // set this in .env on Render to your Vercel URL
  "http://localhost:5173",              // Vite dev server
  "http://localhost:3000",              // in case CRA used
  "https://info-hub-sigma.vercel.app"   // your deployed Vercel frontend (optional safe fallback)
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // allow tools like curl/postman or server-to-server
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS blocked: origin " + origin));
    }
  }
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("InfoHub Backend is running!"));

// WEATHER
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      { params: { q: city, units: "metric", appid: apiKey } }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Weather error:", err.response?.data || err.message);
    res.status(500).json({ error: "Could not fetch weather." });
  }
});

// CURRENCY
app.get("/api/currency", async (req, res) => {
  const { amount, to } = req.query;
  if (!amount || !to) return res.status(400).json({ error: "Amount and target currency required" });

  try {
    const response = await axios.get("https://open.er-api.com/v6/latest/INR");
    if (!response.data || !response.data.rates) throw new Error("Invalid currency API response");
    const rates = response.data.rates;
    const targetRate = rates[to.toUpperCase()];
    if (!targetRate) return res.status(400).json({ error: "Invalid currency" });

    const converted = (parseFloat(amount) * targetRate).toFixed(2);
    res.json({ converted, rate: targetRate });
  } catch (err) {
    console.error("Currency error:", err.response?.data || err.message);
    res.status(500).json({ error: "Could not fetch currency rate." });
  }
});

// QUOTE
app.get("/api/quote", (req, res) => {
  const quotes = [
    { text: "Believe in yourself!", author: "Anonymous" },
    { text: "Keep pushing forward!", author: "Anonymous" },
    { text: "Every day is a new opportunity.", author: "Unknown" },
    { text: "Dream it. Wish it. Do it.", author: "Anonymous" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  ];
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: random.text, author: random.author });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
