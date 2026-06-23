import { useEffect, useState } from "react";
import api from "../api/axios";

function Leaderboard() {

const [players,
setPlayers] =
useState([]);

useEffect(() => {
fetchLeaderboard();
}, []);

const fetchLeaderboard =
async () => {

  try {

    const res =
      await api.get(
        "/users/leaderboard"
      );

    setPlayers(
      res.data.players || []
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
padding: "20px"
}}
>
<h1
style={{
color: "#ff7b22"
}}
>
🏆 Leaderboard
</h1>

  <div
    style={{
      marginTop: "20px"
    }}
  >
    {players.map(
      (
        player,
        index
      ) => (
        <div
          key={player._id}
          style={{
            background:
              "#13203d",
            padding:
              "15px",
            borderRadius:
              "12px",
            marginBottom:
              "12px"
          }}
        >
          <h2>
            #
            {index + 1}
            {" "}
            {
              player.username
            }
          </h2>

          <p>
            🔥 Kills:
            {" "}
            {
              player.kills
            }
          </p>

          <p>
            🏆 Wins:
            {" "}
            {
              player.wins
            }
          </p>

          <p>
            ⭐ Points:
            {" "}
            {
              player.points
            }
          </p>

          <p>
            🎯 KD:
            {" "}
            {
              player.kd
            }
          </p>
        </div>
      )
    )}
  </div>
</div>

);
}

export default Leaderboard;
