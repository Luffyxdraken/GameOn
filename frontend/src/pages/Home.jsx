import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import TournamentCard from "../components/TournamentCard";

function Home() {
const navigate = useNavigate();

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
  console.log(error);
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
<nav
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "30px"
}}
>
<h1 style={{ color: "#f97316" }}>
PR eSports
</h1>

    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap"
      }}
    >
      <button onClick={() => navigate("/")}>
        Home
      </button>

      <button>
        Announcements
      </button>

      <button>
        Chat
      </button>

      <button>
        Members
      </button>

      <button>
        Guilds
      </button>

      <button>
        My Matches
      </button>

      {!localStorage.getItem("token") && (
  <>
    <button
      onClick={() => navigate("/login")}
    >
      Login
    </button>

    <button
      onClick={() => navigate("/register")}
    >
      Create Account
    </button>
  </>
)}

      <button
        onClick={() => navigate("/admin")}
      >
        Admin
      </button>
    </div>
  </nav>

  <div
    style={{
      textAlign: "center",
      marginBottom: "40px"
    }}
  >
    <h1
      style={{
        fontSize: "3rem",
        color: "#f97316"
      }}
    >
      FREE FIRE MAX ESPORTS PLATFORM
    </h1>

    <p>
      Solo • Squad • Guild War Tournaments
    </p>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "30px"
    }}
  >
    <h2>📢 Announcements</h2>

    <p>
      No announcements yet.
    </p>
  </div>

  <h2
    style={{
      marginBottom: "20px"
    }}
  >
    🏆 Active Tournaments
  </h2>

  {loading ? (
    <p>Loading tournaments...</p>
  ) : tournaments.length === 0 ? (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px"
      }}
    >
      <h3>No tournaments available</h3>

      <p>
        Create one from the admin panel.
      </p>
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
