import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
const navigate = useNavigate();

const [tournaments, setTournaments] = useState([]);

useEffect(() => {
fetchTournaments();
}, []);

const fetchTournaments = async () => {
try {
const res = await api.get("/tournaments");

  setTournaments(
    res.data.tournaments || []
  );
} catch (err) {
  console.log(err);
}

};

return (
<div
style={{
minHeight: "100vh",
background: "#08142e",
color: "white",
paddingBottom: "80px"
}}
>
{/* Top Bar */}
<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
padding: "15px"
}}
>
<h2 style={{ color: "#ff7b22" }}>
PR eSports
</h2>

    <div>
      <button
        onClick={() =>
          navigate("/notifications")
        }
        style={topBtn}
      >
        🔔
      </button>

      <button
  onClick={() =>
    navigate("/leaderboard")
  }
  style={actionBtn}
>
  🏆 Leaderboard
</button>

      <button
        onClick={() =>
          navigate("/profile")
        }
        style={topBtn}
      >
        👤
      </button>
    </div>
  </div>

  {/* Announcements */}
  <div
    style={{
      margin: "15px",
      background: "#13203d",
      padding: "15px",
      borderRadius: "12px"
    }}
  >
    <h3 style={{ color: "#ff7b22" }}>
      📢 Announcements
    </h3>

    <p>
      Welcome to PR eSports.
      Upcoming tournaments will
      appear here.
    </p>
  </div>

  {/* Tournaments */}
  <div
    style={{
      margin: "15px"
    }}
  >
    <h3>
      🏆 Active Tournaments
    </h3>

    {tournaments.length === 0 ? (
      <div
        style={{
          background: "#13203d",
          padding: "20px",
          borderRadius: "12px"
        }}
      >
        No tournaments available
      </div>
    ) : (
      tournaments.map((t) => (
        <div
          key={t._id}
          style={{
            background: "#13203d",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "20px"
          }}
        >
          <div
            style={{
              height: "180px",
              background: "#1e293b"
            }}
          />

          <div
            style={{
              padding: "15px"
            }}
          >
            <h3>{t.title}</h3>

            <p>
              Prize Pool: ₹
              {t.prizePool}
            </p>

            <p>
              Slots:
              {t.filledSlots || 0}/
              {t.totalSlots}
            </p>

            <button
              onClick={() =>
                navigate(
                  `/tournament/${t._id}`
                )
              }
              style={actionBtn}
            >
              View Tournament
            </button>
          </div>
        </div>
      ))
    )}
  </div>

  {/* Bottom Navigation */}
  <div
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#13203d",
      display: "flex",
      justifyContent: "space-around",
      padding: "12px"
    }}
  >
    <button
      style={navBtn}
      onClick={() =>
        navigate("/dashboard")
      }
    >
      🏠
    </button>

    <button
      style={navBtn}
      onClick={() =>
        navigate("/messages")
      }
    >
      💬
    </button>

    <button
      style={navBtn}
      onClick={() =>
        navigate("/members")
      }
    >
      👥
    </button>

    <button
      style={navBtn}
      onClick={() =>
        navigate("/mymatches")
      }
    >
      🎮
    </button>

    <button
      style={navBtn}
      onClick={() =>
        navigate("/guilds")
      }
    >
      🛡
    </button>
  </div>
</div>

);
}

const navBtn = {
background: "transparent",
border: "none",
color: "white",
fontSize: "22px",
cursor: "pointer"
};

const topBtn = {
background: "#ff7b22",
border: "none",
marginLeft: "8px",
padding: "10px",
borderRadius: "50%",
cursor: "pointer"
};

const actionBtn = {
background: "#ff7b22",
color: "white",
border: "none",
padding: "10px 15px",
borderRadius: "8px",
cursor: "pointer"
};

export default Dashboard;
