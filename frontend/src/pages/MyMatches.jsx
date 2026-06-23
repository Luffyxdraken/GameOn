import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function MyMatches() {
const navigate = useNavigate();

const [matches, setMatches] =
useState([]);

useEffect(() => {
fetchMatches();
}, []);

const fetchMatches =
async () => {
try {
const user =
JSON.parse(
localStorage.getItem(
"user"
)
);

    if (!user) return;

    const res =
      await api.get(
        `/tournaments/player/${user._id}`
      );

    setMatches(
      res.data.tournaments ||
        []
    );
  } catch (err) {
    console.log(err);
  }
};

return (
<div
style={{
minHeight: "100vh",
background:
"#08142e",
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
    {matches.length ===
    0 ? (
      <div
        style={{
          background:
            "#13203d",
          padding:
            "15px",
          borderRadius:
            "12px"
        }}
      >
        You have not
        joined any
        tournaments.
      </div>
    ) : (
      matches.map(
        (match) => (
          <div
            key={
              match._id
            }
            style={{
              background:
                "#13203d",
              padding:
                "15px",
              borderRadius:
                "12px",
              marginBottom:
                "15px"
            }}
          >
            <h3>
              {
                match.title
              }
            </h3>

            <p>
              Type:
              {" "}
              {
                match.type
              }
            </p>

            <p>
              Prize:
              ₹
              {
                match.prizePool
              }
            </p>

            <p>
              Status:
              {" "}
              {
                match.status
              }
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
                color:
                  "white",
                border:
                  "none",
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
        )
      )
    )}
  </div>
</div>

);
}

export default MyMatches;
