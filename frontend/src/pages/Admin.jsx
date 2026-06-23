import { useEffect, useState } from "react";
import api from "../api/axios";

function Admin() {

const [tournaments,
setTournaments] =
useState([]);

const [title,
setTitle] =
useState("");

const [type,
setType] =
useState("solo");

const [prizePool,
setPrizePool] =
useState("");

const [slots,
setSlots] =
useState("");

useEffect(() => {
fetchTournaments();
}, []);

const fetchTournaments =
async () => {
try {

    const res =
      await api.get(
        "/tournaments"
      );

    setTournaments(
      res.data.tournaments || []
    );

  } catch (err) {
    console.log(err);
  }
};

const createTournament =
async () => {
try {

    await api.post(
      "/tournaments/create",
      {
        title,
        type,
        prizePool,
        totalSlots: slots
      }
    );

    alert(
      "Tournament Created"
    );

    setTitle("");
    setPrizePool("");
    setSlots("");

    fetchTournaments();

  } catch (err) {
    console.log(err);
  }
};

return (
<div
style={{
minHeight:
"100vh",
background:
"#08142e",
color:
"white",
padding:
"20px"
}}
>
<h1
style={{
color:
"#ff7b22"
}}
>
🛠 Admin Panel
</h1>

  <div
    style={{
      background:
        "#13203d",
      padding:
        "15px",
      borderRadius:
        "12px",
      marginTop:
        "20px"
    }}
  >
    <h2>
      ➕ Create Tournament
    </h2>

    <input
      placeholder="Title"
      value={title}
      onChange={(e) =>
        setTitle(
          e.target.value
        )
      }
      style={{
        width:
          "100%",
        padding:
          "10px",
        marginTop:
          "10px"
      }}
    />

    <select
      value={type}
      onChange={(e) =>
        setType(
          e.target.value
        )
      }
      style={{
        width:
          "100%",
        padding:
          "10px",
        marginTop:
          "10px"
      }}
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

    <input
      placeholder="Prize Pool"
      value={prizePool}
      onChange={(e) =>
        setPrizePool(
          e.target.value
        )
      }
      style={{
        width:
          "100%",
        padding:
          "10px",
        marginTop:
          "10px"
      }}
    />

    <input
      placeholder="Slots"
      value={slots}
      onChange={(e) =>
        setSlots(
          e.target.value
        )
      }
      style={{
        width:
          "100%",
        padding:
          "10px",
        marginTop:
          "10px"
      }}
    />

    <button
      onClick={
        createTournament
      }
      style={{
        background:
          "#ff7b22",
        color:
          "white",
        border:
          "none",
        padding:
          "12px 20px",
        borderRadius:
          "8px",
        marginTop:
          "10px"
      }}
    >
      Create Tournament
    </button>
  </div>

  <div
    style={{
      marginTop:
        "25px"
    }}
  >
    <h2>
      🏆 Existing Tournaments
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
            Type:
            {" "}
            {t.type}
          </p>

          <p>
            Prize:
            ₹
            {
              t.prizePool
            }
          </p>

          <p>
            Status:
            {" "}
            {t.status}
          </p>
        </div>
      )
    )}
  </div>
</div>

);
}

export default Admin;
