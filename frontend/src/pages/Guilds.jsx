import { useState } from "react";

function Guilds() {
const [guilds] = useState([
{
id: 1,
name: "Lost Pirates",
leader: "Luffy",
members: 15
},
{
id: 2,
name: "Dragon Army",
leader: "PlayerX",
members: 12
}
]);

return (
<div
style={{
minHeight: "100vh",
background: "#08142e",
color: "white",
padding: "20px"
}}
>
<h1
style={{
color: "#ff7b22"
}}
>
🛡 Guild System
</h1>

  <button
    style={{
      background: "#ff7b22",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
      marginTop: "15px",
      cursor: "pointer"
    }}
  >
    Create Guild
  </button>

  <div
    style={{
      marginTop: "20px"
    }}
  >
    {guilds.map((guild) => (
      <div
        key={guild.id}
        style={{
          background: "#13203d",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "15px"
        }}
      >
        <h3>{guild.name}</h3>

        <p>
          Leader: {guild.leader}
        </p>

        <p>
          Members: {guild.members}
        </p>

        <button
          style={{
            background: "#ff7b22",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Join Guild
        </button>
      </div>
    ))}
  </div>
</div>

);
}

export default Guilds;
