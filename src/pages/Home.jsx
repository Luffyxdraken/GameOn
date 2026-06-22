import { useEffect, useState } from "react";
import api from "../api/axios";
import TournamentCard from "../components/TournamentCard";

function Home() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const res = await api.get("/tournaments");

      if (res.data.tournaments) {
        setTournaments(res.data.tournaments);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px"
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px"
        }}
      >
        <h1 style={{ color: "#f97316" }}>
          PR eSports
        </h1>

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
          Login
        </button>
      </nav>

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px"
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
            color: "#94a3b8"
          }}
        >
          Join scrims, tournaments and win prizes.
        </p>
      </div>

      {/* Tournament Section */}
      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        Active Tournaments
      </h2>

      {loading ? (
        <p>Loading tournaments...</p>
      ) : tournaments.length === 0 ? (
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "12px"
          }}
        >
          <h3>No tournaments available</h3>
          <p>Create one from the admin panel.</p>
        </div>
      ) : (
        tournaments.map((tournament) => (
          <TournamentCard
            key={tournament._id}
            tournament={tournament}
          />
        ))
      )}
    </div>
  );
}

export default Home;
