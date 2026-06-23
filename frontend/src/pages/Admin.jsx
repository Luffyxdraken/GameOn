import { useEffect, useState } from "react";
import api from "../api/axios";

function Admin() {

const [tournaments, setTournaments] =
useState([]);

const [title, setTitle] =
useState("");

const [type, setType] =
useState("solo");

const [prizePool, setPrizePool] =
useState("");

const [slots, setSlots] =
useState("");

useEffect(() => {
fetchTournaments();
}, []);

const fetchTournaments =
async () => {
const res =
await api.get(
"/tournaments"
);

  setTournaments(
    res.data.tournaments || []
  );
};

const createTournament =
async () => {

  await api.post(
    "/tournaments/create",
    {
      title,
      type,
      prizePool,
      totalSlots: slots
    }
  );

  fetchTournaments();
};

const publishRoom =
async (id) => {

  const roomId =
    prompt(
      "Room ID"
    );

  const roomPassword =
    prompt(
      "Room Password"
    );

  await api.put(
    `/tournaments/publish-room/${id}`,
    {
      roomId,
      roomPassword
    }
  );

  alert(
    "Room Published"
  );

  fetchTournaments();
};

const publishResults =
async (id) => {

  const winner =
    prompt(
      "Winner Name"
    );

  await api.put(
    `/tournaments/results/${id}`,
    {
      results: [
        {
          winner
        }
      ]
    }
  );

  alert(
    "Results Published"
  );

  fetchTournaments();
};

const deleteTournament =
async (id) => {

  if (
    !window.confirm(
      "Delete Tournament?"
    )
  )
    return;

  await api.delete(
    `/tournaments/${id}`
  );

  alert(
    "Tournament Deleted"
  );

  fetchTournaments();
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
🛠 Admin Panel
</h1>

  <div
    style={{
      background: "#13203d",
      padding: "20px",
      borderRadius: "12px"
    }}
  >
    <input
      placeholder="Tournament Title"
      value={title}
      onChange={(e) =>
        setTitle(
          e.target.value
        )
      }
    />

    <br />
    <br />

    <select
      value={type}
      onChange={(e) =>
        setType(
          e.target.value
        )
      }
    >
      <option value="solo">
        Solo
      </option>

      <option value="squad">
        Squad
      </option>

      <option value="guildwar">
        Guild War
      </option>
    </select>

    <br />
    <br />

    <input
      placeholder="Prize Pool"
      value={prizePool}
      onChange={(e) =>
        setPrizePool(
          e.target.value
        )
      }
    />

    <br />
    <br />

    <input
      placeholder="Slots"
      value={slots}
      onChange={(e) =>
        setSlots(
          e.target.value
        )
      }
    />

    <br />
    <br />

    <button
      onClick={
        createTournament
      }
    >
      Create Tournament
    </button>
  </div>

  <h2
    style={{
      marginTop: "30px"
    }}
  >
    Existing Tournaments
  </h2>

  {tournaments.map(
    (t) => (
      <div
        key={t._id}
        style={{
          background:
            "#13203d",
          padding:
            "15px",
          borderRadius:
            "12px",
          marginTop:
            "15px"
        }}
      >
        <h3>
          {t.title}
        </h3>

        <p>
          {t.type}
        </p>

        <p>
          ₹
          {t.prizePool}
        </p>

        <p>
          {t.status}
        </p>

        <button
          onClick={() =>
            publishRoom(
              t._id
            )
          }
        >
          Publish Room
        </button>

        <button
          onClick={() =>
            publishResults(
              t._id
            )
          }
          style={{
            marginLeft:
              "10px"
          }}
        >
          Publish Results
        </button>

        <button
          onClick={() =>
            deleteTournament(
              t._id
            )
          }
          style={{
            marginLeft:
              "10px",
            background:
              "red",
            color:
              "white"
          }}
        >
          Delete
        </button>
      </div>
    )
  )}
</div>

);
}

export default Admin;
