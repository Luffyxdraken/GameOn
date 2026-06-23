function Leaderboard() {
const players = [
{
rank: 1,
username: "Luffy",
kills: 125,
wins: 35,
points: 2500
},
{
rank: 2,
username: "DragonX",
kills: 110,
wins: 30,
points: 2200
},
{
rank: 3,
username: "ElitePro",
kills: 95,
wins: 24,
points: 1950
}
];

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
    {players.map((player) => (
      <div
        key={player.rank}
        style={{
          background: "#13203d",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "12px"
        }}
      >
        <h2>
          #{player.rank} {player.username}
        </h2>

        <p>
          🔥 Kills: {player.kills}
        </p>

        <p>
          🏆 Wins: {player.wins}
        </p>

        <p>
          ⭐ Points: {player.points}
        </p>
      </div>
    ))}
  </div>
</div>

);
}

export default Leaderboard;
