import { useEffect, useState } from "react";
import api from "../api/axios";

function Leaderboard() {

const [players,setPlayers] =
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
res.data.users || []
);

} catch(err) {

console.log(err);

}

};

return (

<div
style={{
minHeight:"100vh",
background:"#08142e",
color:"white",
padding:"20px"
}}
><h1>
🏆 Leaderboard
</h1>{players.map(
(player,index)=>(

<div
key={index}
style={{
background:"#13203d",
padding:"15px",
marginBottom:"10px"
}}
><h2>
#{index+1}
{" "}
{player.username}
</h2><p>
🔥 Kills:
{player.kills}
</p><p>
🏆 Wins:
{player.wins}
</p><p>
⭐ Points:
{player.points}
</p><p>
⚔ KD:
{player.kd}
</p></div>
)
)}</div>
);
}export default Leaderboard;
