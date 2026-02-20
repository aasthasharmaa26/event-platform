import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Live backend URL from Render
    const BASE_URL = "https://event-platform-1-g00j.onrender.com";

    fetch(`${BASE_URL}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div>
      <h1>Sydney Events Explorer 🌏</h1>
      <ul>
        {events.length === 0 ? (
          <li>Loading events...</li>
        ) : (
          events.map((event, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <h2>{event.title}</h2>
              <p>
                <strong>Date:</strong> {event.date} <br />
                <strong>Venue:</strong> {event.venue} <br />
                <strong>Description:</strong> {event.description} <br />
                <strong>Source:</strong> {event.source} <br />
                <a href={event.original_url}>Original Event Link</a>
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;