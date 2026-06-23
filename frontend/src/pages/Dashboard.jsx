import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin =
    user?.role === "admin" ||
    user?.role === "superadmin";

  const isSuperAdmin =
    user?.role === "superadmin";

  const tournaments = [
{
id: 1,
title: "Free Fire MAX Solo Cup",
prize: 500,
slots: "24/48",
thumbnail:
"https://images.unsplash.com/photo-1542751371-adc38448a05e"
},
{
id: 2,
title: "Squad Tournament",
prize: 1000,
slots: "18/24",
thumbnail:
"https://images.unsplash.com/photo-1511512578047-dfb367046420"
}
];

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
      Upcoming tournaments will be
      displayed here.
    </p>
  </div>

  {/* Featured Tournament */}
  <div
    style={{
      margin: "15px"
    }}
  >
    <h3>🏆 Active Tournaments</h3>

    {tournaments.map((t) => (
      <div
        key={t.id}
        style={{
          background: "#13203d",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "20px"
        }}
      >
        <img
          src={t.thumbnail}
          alt={t.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover"
          }}
        />

        <div
          style={{
            padding: "15px"
          }}
        >
          <h3>{t.title}</h3>

          <p>
            Prize Pool: ₹{t.prize}
          </p>

          <p>
            Slots: {t.slots}
          </p>

          <button
            onClick={() =>
              navigate(`/tournament/${t.id}`)
            }
            style={actionBtn}
          >
            View Tournament
          </button>
        </div>
      </div>
    ))}
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
