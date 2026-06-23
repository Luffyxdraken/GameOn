function Profile() {
const user =
JSON.parse(
localStorage.getItem("user")
) || {};

return (
<div
style={{
minHeight: "100vh",
background: "#08142e",
color: "white",
padding: "20px"
}}
>
<div
style={{
textAlign: "center"
}}
>
<div
style={{
width: "120px",
height: "120px",
borderRadius: "50%",
background: "#13203d",
margin: "0 auto",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontSize: "50px"
}}
>
👤
</div>

    <h1
      style={{
        color: "#ff7b22",
        marginTop: "15px"
      }}
    >
      {user.username || "Player"}
    </h1>
  </div>

  <div
    style={{
      background: "#13203d",
      padding: "20px",
      borderRadius: "12px",
      marginTop: "20px"
    }}
  >
    <h2>🎮 Player Stats</h2>

    <p>
      UID: 735208
    </p>

    <p>
      Matches Played: 120
    </p>

    <p>
      Wins: 45
    </p>

    <p>
      Kills: 380
    </p>

    <p>
      K/D Ratio: 4.2
    </p>

    <p>
      Points: 2500
    </p>

    <p>
      Guild: Lost Pirates
    </p>

    <p>
      Rank: #1
    </p>

    <p>
      Email: {user.email}
    </p>

    <p>
      Role: {user.role || "player"}
    </p>
  </div>

  <div
    style={{
      background: "#13203d",
      padding: "20px",
      borderRadius: "12px",
      marginTop: "20px"
    }}
  >
    <h2>🏆 Achievements</h2>

    <p>🥇 Tournament Winner</p>

    <p>🔥 300+ Kills</p>

    <p>🛡 Guild Leader</p>
  </div>
</div>

);
}

export default Profile;
