const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const { SUPABASE_URL, SUPABASE_KEY, AUTH_TOKEN } = process.env;

// ✅ Endpoint utama
app.get("/", (req, res) => res.send("🚀 IoT Cloud API Running on Railway"));

// ✅ Endpoint untuk menerima data sensor
app.post("/data", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== AUTH_TOKEN) return res.status(403).send("Unauthorized");

  const { temperature, humidity } = req.body;
  if (!temperature || !humidity) return res.status(400).send("Bad data");

  try {
    await axios.post(
      `${SUPABASE_URL}/rest/v1/iot_data`,
      { temperature, humidity },
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
      }
    );
    res.send("✅ Data stored successfully in Supabase");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Database error");
  }
});

// ✅ Gunakan port dari Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});