
---

# 🌟 InfoHub

**InfoHub** is a full-stack web application that provides users with real-time **Weather**, **Currency Exchange Rates**, and **Inspirational Quotes** — all in one place.

Deployed using **Vercel (frontend)** and **Render (backend)**, the app integrates third-party APIs for accurate and up-to-date information.

---

## 🚀 Live Demo

* **Frontend (Vercel):** [https://info-hub-taupe.vercel.app/](https://info-hub-taupe.vercel.app/)
* **Backend (Render):** [https://infohub-4bga.onrender.com/](https://infohub-4bga.onrender.com/)

---

## 🖥️ Features

✅ **Weather Information:**
Get live weather updates for any city using the OpenWeather API.

✅ **Currency Exchange Rates:**
Check the latest conversion rates between major world currencies.

✅ **Inspirational Quotes:**
Displays random motivational quotes fetched from an external API.

✅ **Modern UI:**
Responsive and minimalist frontend built with React and Vite.

✅ **Full-Stack Integration:**
Express.js backend with API routes consumed by the React frontend.

---

## 🏗️ Tech Stack

### **Frontend**

* React (Vite)
* Axios / Fetch API
* HTML, CSS, JavaScript
* Deployed on **Vercel**

### **Backend**

* Node.js + Express.js
* `dotenv` for environment variables
* CORS enabled for frontend communication
* Deployed on **Render**

### **APIs Used**

* 🌤️ [OpenWeatherMap API](https://openweathermap.org/api)
* 💱 [ExchangeRate API](https://exchangerate.host)
* 💬 Custom Quotes API (built-in to backend)
---

## ⚙️ Setup Instructions (Local Development)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/BonagiriSahithya/InfoHub.git
cd InfoHub
```

### 2️⃣ Install dependencies for backend

```bash
cd backend
npm install
```

### 3️⃣ Create a `.env` file in backend folder

```env
PORT=5000
OPENWEATHER_API_KEY=your_openweather_api_key
FRONTEND_URL=http://localhost:5173
```

### 4️⃣ Start the backend

```bash
node server.js
```

### 5️⃣ Setup frontend

```bash
cd ../frontend
npm install
```

### 6️⃣ Add `.env` file in frontend

```env
VITE_API_URL=http://localhost:5000
```

### 7️⃣ Start the frontend

```bash
npm run dev
```

Then open 👉 [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌍 Deployment Details

### **Frontend (Vercel)**

* Environment Variable:

  ```
  VITE_API_URL=https://infohub-4bga.onrender.com
  ```

### **Backend (Render)**

* Environment Variables:

  ```
  PORT=5000
  OPENWEATHER_API_KEY=your_openweather_api_key
  FRONTEND_URL=https://info-hub-taupe.vercel.app
  ```

---

