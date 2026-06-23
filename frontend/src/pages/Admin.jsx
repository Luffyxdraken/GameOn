import { useState } from "react";
import api from "../api/axios";

function Admin() {
const [form, setForm] = useState({
title: "",
type: "",
prizePool: "",
totalSlots: ""
});

const handleChange = (e) => {
setForm({
...form,
[e.target.name]:
e.target.value
});
};

const createTournament =
async () => {
try {
await api.post(
"/tournaments/create",
{
title: form.title,
type: form.type,
prizePool:
form.prizePool,
totalSlots:
form.totalSlots
}
);

    alert(
      "Tournament Created"
    );

    setForm({
      title: "",
      type: "",
      prizePool: "",
      totalSlots: ""
    });

  } catch (err) {
    alert(
      "Failed to create tournament"
    );
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
🛠 Admin Panel
</h1>

  <div
    style={{
      background: "#13203d",
      padding: "20px",
      borderRadius: "12px",
      marginTop: "20px"
    }}
  >
    <h2>
      Create Tournament
    </h2>

    <input
      name="title"
      placeholder="Tournament Title"
      value={form.title}
      onChange={handleChange}
      style={inputStyle}
    />

    <input
      name="type"
      placeholder="Solo / Squad"
      value={form.type}
      onChange={handleChange}
      style={inputStyle}
    />

    <input
      name="prizePool"
      placeholder="Prize Pool"
      value={form.prizePool}
      onChange={handleChange}
      style={inputStyle}
    />

    <input
      name="totalSlots"
      placeholder="Total Slots"
      value={form.totalSlots}
      onChange={handleChange}
      style={inputStyle}
    />

    <button
      onClick={
        createTournament
      }
      style={btnStyle}
    >
      Create Tournament
    </button>
  </div>
</div>

);
}

const inputStyle = {
width: "100%",
padding: "12px",
marginTop: "12px",
borderRadius: "8px",
border: "none"
};

const btnStyle = {
marginTop: "15px",
background: "#ff7b22",
color: "white",
border: "none",
padding: "12px 20px",
borderRadius: "8px",
cursor: "pointer"
};

export default Admin;
