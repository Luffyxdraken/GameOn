import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function MyMatches() {
const navigate = useNavigate();

const user = JSON.parse(
localStorage.getItem("user")
);

const [matches, setMatches] =
useState([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {
fetchMatches();
}, []);

const fetchMatches =
async () => {
try {

    const res =
      await api.get(
        `/tournaments/player/${user._id}`
      );

    setMatches(
      res.data.tournaments || []
    );

  } catch (err) {

    console.log(err);

  } finally {

    setLoading(false);

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
🎮 My Matches
</h1>

  {loading ? (

    <div
      style={{
        marginTop: "20px"
      }}
    >
      Loading...
    </div>

  ) : matches.length === 0 ? (

    <div
      style={{
        background: "#13203d",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px"
      }}
    >
      You have not joined
      any tournaments yet.
    </div>

  ) : (

    <div
      style={{
        marginTop: "20px"
      }}
    >
      {matches.map((match) => (
        <div
          key={match._id}
          style={{
            background: "#13203d",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "15px"
          }}
        >
          <h3>
            {match.title}
          </h3>

          <p>
            Type:
            {" "}
            {match.type}
          </p>

          <p>
            Prize Pool:
            ₹
            {match.prizePool}
          </p>

          <p>
            Status:
            {" "}
            {match.status}
          </p>

          <p>
            Slots:
            {" "}
            {match.filledSlots}
            /
            {match.totalSlots}
          </p>

          <button
            onClick={() =>
              navigate(
                `/tournament/${match._id}`
              )
            }
            style={{
              background:
                "#ff7b22",
              color: "white",
              border: "none",
              padding:
                "10px 15px",
              borderRadius:
                "8px",
              cursor:
                "pointer"
            }}
          >
            View Match
          </button>
        </div>
      ))}
    </div>

  )}
</div>

);
}

export default MyMatches;
