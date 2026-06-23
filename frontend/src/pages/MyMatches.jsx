function MyMatches() {
const matches = [
{
id: 1,
tournament: "Free Fire MAX Solo Cup",
date: "25 June 2026",
status: "Upcoming"
},
{
id: 2,
tournament: "Squad Tournament",
date: "28 June 2026",
status: "Joined"
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
🎮 My Matches
</h1>

  <div
    style={{
      marginTop: "20px"
    }}
  >
    {matches.map((match) => (
      <div
        key={match.id}
        style={{
          background: "#13203d",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "15px"
        }}
      >
        <h3>
          {match.tournament}
        </h3>

        <p>
          Date: {match.date}
        </p>

        <p>
          Status: {match.status}
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
          View Match
        </button>
      </div>
    ))}
  </div>
</div>

);
}

export default MyMatches;
