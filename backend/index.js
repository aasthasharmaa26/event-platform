// index.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// Sample 34 events
const events = [
  { title: "Sydney Opera House Concert", date: "2026-02-21", venue: "Sydney Opera House", description: "Live concert at the Opera House.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Art Exhibition at Museum", date: "2026-02-22", venue: "Art Gallery of NSW", description: "Modern art exhibits.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Food Festival", date: "2026-02-23", venue: "Darling Harbour", description: "Taste foods from around the world.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Open Air Movie Night", date: "2026-02-24", venue: "Hyde Park", description: "Classic movies under the stars.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Jazz Night", date: "2026-02-25", venue: "The Basement", description: "Live jazz performances.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Science Fair", date: "2026-02-26", venue: "Sydney University", description: "Explore science projects.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Beach Cleanup Drive", date: "2026-02-27", venue: "Bondi Beach", description: "Community environmental event.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Theater Play", date: "2026-02-28", venue: "Sydney Theatre", description: "Drama performance by local artists.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Food Truck Festival", date: "2026-03-01", venue: "Darling Harbour", description: "Street food and music.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Book Fair", date: "2026-03-02", venue: "Town Hall", description: "Meet authors and explore books.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Yoga Workshop", date: "2026-03-03", venue: "Centennial Park", description: "Morning yoga session.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Wine Tasting Event", date: "2026-03-04", venue: "Hunter Valley", description: "Taste premium wines.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Street Art Tour", date: "2026-03-05", venue: "Newtown", description: "Explore street murals.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Photography Workshop", date: "2026-03-06", venue: "Bondi Pavilion", description: "Learn photography tips.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Live Comedy Night", date: "2026-03-07", venue: "Comedy Lounge", description: "Laugh out loud.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Tech Meetup", date: "2026-03-08", venue: "Tech Hub", description: "Networking for developers.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Open Mic Night", date: "2026-03-09", venue: "Local Cafe", description: "Showcase your talent.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Karaoke Night", date: "2026-03-10", venue: "Downtown Bar", description: "Sing your heart out.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Farmers Market", date: "2026-03-11", venue: "Pyrmont", description: "Fresh produce and goodies.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Marathon", date: "2026-03-12", venue: "Sydney Streets", description: "Run for a cause.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Music Festival", date: "2026-03-13", venue: "Royal Botanic Gardens", description: "Live music and fun.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Cooking Class", date: "2026-03-14", venue: "Culinary School", description: "Learn new recipes.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Dance Performance", date: "2026-03-15", venue: "Dance Academy", description: "Ballet and contemporary.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Magic Show", date: "2026-03-16", venue: "Magic Theater", description: "Mind-blowing illusions.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Charity Auction", date: "2026-03-17", venue: "Town Hall", description: "Bid for a good cause.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Film Screening", date: "2026-03-18", venue: "Cinema Centre", description: "Indie film showcase.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Poetry Reading", date: "2026-03-19", venue: "Bookstore Cafe", description: "Spoken word event.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Board Game Night", date: "2026-03-20", venue: "Community Hall", description: "Fun with friends.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Photography Exhibition", date: "2026-03-21", venue: "Gallery Space", description: "Showcase local photographers.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Fitness Bootcamp", date: "2026-03-22", venue: "Park Grounds", description: "Group fitness session.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Open Studio", date: "2026-03-23", venue: "Art Studio", description: "Artists open their studios.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Craft Fair", date: "2026-03-24", venue: "Town Hall", description: "Handmade goods and crafts.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Science Workshop", date: "2026-03-25", venue: "Science Centre", description: "Interactive experiments.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" },
  { title: "Live Podcast Recording", date: "2026-03-26", venue: "Podcast Studio", description: "Watch a live recording.", image: "https://via.placeholder.com/150", source: "dummy", original_url: "#" }
];

app.get("/events", (req, res) => {
  res.json(events);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));