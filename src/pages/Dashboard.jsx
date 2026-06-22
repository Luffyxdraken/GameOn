import { useNavigate } from "react-router-dom";

function Dashboard() {
const navigate = useNavigate();

const user =
JSON.parse(localStorage.getItem("user")) || {};

return (
<div
style={{
minHeight: "100vh",
background: "#0f172a",
color: "white"
}}
>
{/* Top Bar */}
<div
style={{
display: "flex",
justifyContent: "space-between",
padding: "15px 20px",
background: "#1e293b"
}}
>
<h2>PR eSports</h2>

    <div>
      🔔 Notifications

      <button
        style={{
          marginLeft: "15px"
        }}
        onClick={() =>
          navigate("/profile")
        }
      >
        👤 Profile
      </button>
    </div>
  </div>

  {/* Announcement Section */}
  <div
    style={{
      padding: "20px"
    }}
  >
    <h2>📢 Announcements</h2>

    <div
      style={{
        background: "#1e293b",
        padding: "15px",
        borderRadius: "10px"
      }}
    >
      Welcome to PR eSports
    </div>
  </div>

  {/* User Info */}
  <div
    style={{
      padding: "20px"
    }}
  >
    <h3>
      Welcome {user.username}
    </h3>

    <p>
      Role: {user.role}
    </p>
  </div>

  {/* Bottom Navigation */}
  <div
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#1e293b",
      display: "flex",
      justifyContent: "space-around",
      padding: "15px"
    }}
  >
    <button>🏠 Home</button>

    <button
      onClick={() =>
        navigate("/messages")
      }
    >
      💬 Chat
    </button>

    <button
      onClick={() =>
        navigate("/tournaments")
      }
    >
      🏆 Tournaments
    </button>

    <button
      onClick={() =>
        navigate("/matches")
      }
    >
      🎮 Matches
    </button>

    <button
      onClick={() =>
        navigate("/members")
      }
    >
      👥 Members
    </button>
  </div>
</div>

);
}

export default Dashboard;
