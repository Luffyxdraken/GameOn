import { useEffect, useState } from "react";
import API from "../api/axios";

function Tournament() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/tournaments")
      .then((res) => {
        setData(res.data.tournaments || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>Tournaments</h1>

      {data.map((tournament) => (
        <div
          key={tournament._id}
          style={{
            background: "#1e293b",
            padding: "20px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{tournament.title}</h3>
          <p>Prize Pool: ₹{tournament.prizePool}</p>
          <p>Entry Fee: ₹{tournament.entryFee}</p>
        </div>
      ))}
    </div>
  );
}

export default Tournament;
