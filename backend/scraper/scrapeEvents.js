const axios = require("axios");
const cheerio = require("cheerio");
const https = require("https");
const Event = require("../models/Event");

// Disable strict SSL verification (safe for assignment/demo)
const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function scrapeEvents() {
  try {
    console.log("Scraping Sydney events...");

    const { data } = await axios.get(
      "https://www.timeout.com/sydney/things-to-do",
      { httpsAgent: agent }
    );

    const $ = cheerio.load(data);

    const events = [];

    $("article").each((i, el) => {
      const title = $(el).find("h3").text().trim();
      const link = $(el).find("a").attr("href");
      const image = $(el).find("img").attr("src");

      if (title && link) {
        events.push({
          title,
          city: "Sydney",
          originalUrl: link.startsWith("http")
            ? link
            : "https://www.timeout.com" + link,
          image: image || "",
          source: "TimeOut Sydney",
          isActive: true,
          lastScraped: new Date()
        });
      }
    });

    for (const event of events) {
      await Event.findOneAndUpdate(
        { originalUrl: event.originalUrl },
        event,
        { upsert: true }
      );
    }

    console.log(`Scraped ${events.length} events ✅`);

  } catch (error) {
    console.error("Scraping error:", error.message);
  }
}

module.exports = scrapeEvents;

