import { Link } from "react-router-dom";

function Dashboard() {
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
          padding: "15px"
        }}
      >
        <h2 style={{ color: "#ff7b22" }}>
          PR eSports
        </h2>

        <div>
          🔔 👤
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "15px" }}>
        <input
          placeholder="Search..."
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "15px",
            border: "none"
          }}
        />
      </div>

      {/* Announcement */}
      <div
        style={{
          margin: "15px",
          padding: "15px",
          background: "#1e293b",
          borderRadius: "15px"
        }}
      >
        📢 Latest Announcements
      </div>

      {/* Tournaments */}
      <div
        style={{
          margin: "15px",
          padding: "15px",
          background: "#1e293b",
          borderRadius: "15px"
        }}
      >
        🏆 Solo Tournament
      </div>

      <div
        style={{
          margin: "15px",
          padding: "15px",
          background: "#1e293b",
          borderRadius: "15px"
        }}
      >
        👥 Squad Tournament
      </div>

      <div
        style={{
          margin: "15px",
          padding: "15px",
          background: "#1e293b",
          borderRadius: "15px"
        }}
      >
        ⚔ Guild War
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#0f172a",
          display: "flex",
          justifyContent: "space-around",
          padding: "15px"
        }}
      >
        <Link to="/dashboard">🏠</Link>
        <Link to="/messages">💬</Link>
        <Link to="/guilds">👥</Link>
        <Link to="/mymatches">🏆</Link>
        <Link to="/profile">👤</Link>
      </div>
    </div>
  );
}

export default Dashboard;
