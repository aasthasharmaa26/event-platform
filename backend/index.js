// index.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/events', (req, res) => {
  // sample events
  res.json([
    {
      title: "Sample Event 1",
      date: "2026-02-21",
      venue: "Sydney Opera House",
      description: "Test event 1",
      image: "",
      source: "dummy",
      original_url: "#"
    },
    {
      title: "Sample Event 2",
      date: "2026-02-22",
      venue: "Sydney Town Hall",
      description: "Test event 2",
      image: "",
      source: "dummy",
      original_url: "#"
    }
  ]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));