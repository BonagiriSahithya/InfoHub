// backend/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Allowed origins: local dev + deployed frontend (add your real Vercel URL)
// top of server.js (replace existing CORS code)
const allowedFromEnv = (process.env.FRONTEND_URL || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

const allowAll = allowedFromEnv.includes("*");

// always allow local dev origins
const defaultAllowed = ["http://localhost:5173", "http://localhost:3000"];

const allowedOrigins = new Set([
  ...defaultAllowed,
  ...allowedFromEnv.filter(s => s !== "*"),
]);

app.use(cors({
  origin: function(origin, callback) {
    // allow server-to-server requests or tools like curl/postman
    if (!origin) return callback(null, true);

    if (allowAll || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    // not allowed
    return callback(new Error("CORS blocked: origin " + origin));
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
// QUOTE (Auto-generated from Quotable API)
// QUOTE - using ZenQuotes API with fallback
app.get("/api/quote", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const data = response.data[0];
    res.json({
      quote: data.q,
      author: data.a || "Unknown",
    });
  } catch (err) {
    console.error("Quote error:", err.message);
    // fallback local quotes
    const fallbackQuotes = [
      { text: "Believe in yourself!", author: "Anonymous" },
      { text: "Keep pushing forward!", author: "Anonymous" },
      { text: "Every day is a new opportunity.", author: "Unknown" },
      { text: "Dream it. Wish it. Do it.", author: "Anonymous" },
      { text: "Courage is resistance to fear, mastery of fear—not absence of fear.", author: "Mark Twain" },
    ];
    const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    res.json({ quote: random.text, author: random.author });
  }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
