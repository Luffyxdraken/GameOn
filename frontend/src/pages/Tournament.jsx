import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function Tournament() {
const { id } = useParams();

const [tournament, setTournament] =
useState(null);

useEffect(() => {
fetchTournament();
}, []);

const fetchTournament =
async () => {
try {
const res =
await api.get(
"/tournaments/${id}"
);

    setTournament(
      res.data.tournament
    );
  } catch (err) {
    console.log(err);
  }
};

const joinTournament =
async () => {
try {
const user =
JSON.parse(
localStorage.getItem(
"user"
)
);

    await api.post(
      `/tournaments/join/${id}`,
      {
        playerId:
          user._id
      }
    );

    alert(
      "Joined Tournament"
    );

    fetchTournament();
  } catch (err) {
    alert(
      err.response?.data
        ?.message ||
        "Join Failed"
    );
  }
};

if (!tournament) {
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
<h1
style={{
color: "#ff7b22"
}}
>
🏆 {tournament.title}
</h1>

  <div
    style={{
      background: "#13203d",
      padding: "20px",
      borderRadius: "12px",
      marginTop: "20px"
    }}
  >
    <p>
      Type:
      {" "}
      {tournament.type}
    </p>

    <p>
      Prize Pool:
      ₹
      {tournament.prizePool}
    </p>

    <p>
      Slots:
      {" "}
      {tournament.filledSlots || 0}
      /
      {tournament.totalSlots}
    </p>

    <p>
      Status:
      {" "}
      {tournament.status}
    </p>

    <button
      onClick={
        joinTournament
      }
      style={{
        marginTop: "15px",
        background:
          "#ff7b22",
        color: "white",
        border: "none",
        padding:
          "12px 20px",
        borderRadius:
          "8px",
        cursor:
          "pointer"
      }}
    >
      Join Tournament
    </button>
  </div>

  {tournament.roomId && (
    <div
      style={{
        background:
          "#13203d",
        padding:
          "20px",
        borderRadius:
          "12px",
        marginTop:
          "20px"
      }}
    >
      <h2>
        🔑 Room Details
      </h2>

      <p>
        Room ID:
        {" "}
        {tournament.roomId}
      </p>

      <p>
        Password:
        {" "}
        {tournament.roomPassword}
      </p>
    </div>
  )}

  {tournament.resultsPublished && (
    <div
      style={{
        background:
          "#13203d",
        padding:
          "20px",
        borderRadius:
          "12px",
        marginTop:
          "20px"
      }}
    >
      <h2>
        🥇 Results
      </h2>

      <p>
        {
          tournament.results
        }
      </p>
    </div>
  )}
</div>

);
}

export default Tournament;
