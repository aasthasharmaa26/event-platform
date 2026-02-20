require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");

const Event = require("./models/Event");
const scrapeEvents = require("./scraper/scrapeEvents");

const app = express();

/* ===============================
   Middleware
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   MongoDB Connection
================================ */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🚀");
    scrapeEvents(); // run once when server starts
  })
  .catch(err => console.log("DB Error:", err));

/* ===============================
   Routes
================================ */

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ✅ ONLY Active Events Route (FINAL VERSION)
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find({ isActive: true });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Add / Update Event (Fixes mongoose warning too)
app.post("/add-event", async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { originalUrl: req.body.originalUrl },
      {
        ...req.body,
        lastScraped: new Date(),
        isActive: true
      },
      {
        upsert: true,
        returnDocument: "after"   // 🔥 fixes mongoose warning
      }
    );

    res.status(200).json({
      message: "Event saved/updated successfully 🚀",
      event: updatedEvent
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ===============================
   Cron Job (Runs Every Hour)
================================ */
cron.schedule("0 * * * *", () => {
  console.log("Running scheduled scrape...");
  scrapeEvents();
});

/* ===============================
   Start Server
================================ */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});