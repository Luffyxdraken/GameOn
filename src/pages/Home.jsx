import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          background: "#111827",
          borderBottom: "1px solid #1f2937"
        }}
      >
        <h2 style={{ color: "#f97316" }}>PR eSports</h2>

        <div>
          <Link
            to="/login"
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: "20px"
            }}
          >
            Login
          </Link>

          <button
            style={{
              background: "#f97316",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer"
            }}
          >
            Register Team
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "80px 20px"
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            color: "#f97316"
          }}
        >
          FREE FIRE MAX TOURNAMENTS
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "20px auto"
          }}
        >
          Join competitive scrims, tournaments, and esports events.
          Register your squad, compete with the best teams, and win prizes.
        </p>

        <Link to="/tournament/demo">
          <button
            style={{
              background: "#f97316",
              border: "none",
              padding: "15px 30px",
              fontSize: "18px",
              borderRadius: "10px",
              color: "white",
              cursor: "pointer"
            }}
          >
            Join Tournament
          </button>
        </Link>
      </section>

      {/* Tournament Card */}
      <section
        style={{
          padding: "40px",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            width: "350px",
            background: "#1e293b",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 0 20px rgba(0,0,0,0.3)"
          }}
        >
          <img
            src="https://wallpapercave.com/wp/wp7419068.jpg"
            alt="Tournament Banner"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover"
            }}
          />

          <div style={{ padding: "20px" }}>
            <h2>Free Fire MAX Scrim</h2>

            <p>💰 Prize Pool: ₹1000</p>
            <p>🎟 Entry Fee: ₹50</p>
            <p>👥 Slots: 12 / 12</p>

            <p
              style={{
                color: "#22c55e",
                fontWeight: "bold"
              }}
            >
              LIVE
            </p>

            <Link to="/tournament/demo">
              <button
                style={{
                  width: "100%",
                  background: "#f97316",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                View Tournament
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center"
        }}
      >
        <h2>Why Choose PR eSports?</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "30px"
          }}
        >
          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              width: "250px"
            }}
          >
            🏆 Daily Tournaments
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              width: "250px"
            }}
          >
            💰 Real Prize Pools
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              width: "250px"
            }}
          >
            ⚡ Fast Results
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          background: "#111827",
          color: "#9ca3af"
        }}
      >
        © 2026 PR eSports. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;
