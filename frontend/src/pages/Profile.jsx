import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {

const storedUser =
JSON.parse(
localStorage.getItem("user")
);

const [user, setUser] =
useState(null);

useEffect(() => {
fetchProfile();
}, []);

const fetchProfile =
async () => {
try {

    const res =
      await api.get(
        `/users/${storedUser._id}`
      );

    setUser(res.data.user);

  } catch (err) {

    console.log(err);

  }
};

if (!user) {
return (
<div
style={{
color: "white",
padding: "20px"
}}
>
Loading...
</div>
);
}

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
      {user.username}
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

    <p>UID: {user.uid || "Not Set"}</p>

    <p>
      Matches Played:
      {" "}
      {user.matchesPlayed}
    </p>

    <p>
      Wins:
      {" "}
      {user.wins}
    </p>

    <p>
      Kills:
      {" "}
      {user.kills}
    </p>

    <p>
      K/D Ratio:
      {" "}
      {user.kd}
    </p>

    <p>
      Points:
      {" "}
      {user.points}
    </p>

    <p>
      Rank:
      {" "}
      #{user.rank}
    </p>

    <p>
      Guild:
      {" "}
      {user.guild
        ? "Joined"
        : "No Guild"}
    </p>

    <p>
      Email:
      {" "}
      {user.email}
    </p>

    <p>
      Role:
      {" "}
      {user.role}
    </p>
  </div>
</div>

);
}

export default Profile;
