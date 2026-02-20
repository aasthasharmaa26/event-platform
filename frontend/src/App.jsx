import { useState, useEffect } from "react";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{
      fontFamily: "Inter, sans-serif",
      padding: "40px",
      background: "#f8fafc",
      minHeight: "100vh"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: "40px",
        fontSize: "32px"
      }}>
        Sydney Events Explorer 🌏
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "25px"
      }}>
        {events.map((event, index) => (
          <div key={index} style={{
            background: "white",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            transition: "transform 0.2s"
          }}>
            
            {event.image && (
              <img 
                src={event.image}
                alt={event.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover"
                }}
              />
            )}

            <div style={{ padding: "20px" }}>
              <h3 style={{ marginBottom: "10px" }}>
                {event.title}
              </h3>

              <a 
                href={event.originalUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  background: "#111827",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  textDecoration: "none"
                }}
              >
                View Event
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;