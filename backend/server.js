const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("InfoHub Backend is running!");
});

// Weather API
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY; 
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Could not fetch weather." });
  }
});

// Currency Conversion INR → USD/EUR
app.get("/api/currency", async (req, res) => {
  const { amount, to } = req.query;
  if (!amount || !to) return res.status(400).json({ error: "Amount and target currency required" });

  try {
    const response = await axios.get("https://open.er-api.com/v6/latest/INR");
    const rates = response.data.rates;
    const targetRate = rates[to.toUpperCase()];

    if (!targetRate) {
      return res.status(400).json({ error: "Invalid currency" });
    }

    const converted = (parseFloat(amount) * targetRate).toFixed(2);
    res.json({ converted, rate: targetRate });
  } catch (err) {
    console.error("Error fetching currency:", err.message);
    res.status(500).json({ error: "Could not fetch currency rate." });
  }
});


// Motivational Quote
app.get("/api/quote", (req, res) => {
  const quotes = [
  { text: "Believe in yourself!", author: "Anonymous" },
  { text: "Keep pushing forward!", author: "Anonymous" },
  { text: "Every day is a new opportunity.", author: "Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "Anonymous" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
res.json({ quote: randomQuote.text, author: randomQuote.author });

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
