import { useState } from "react";
import api from "../api/axios";

function Admin() {
  const [form, setForm] = useState({
    title: "",
    type: "solo",
    prizePool: "",
    entryFee: "",
    totalSlots: "",
    startTime: "",
    description: "",
    roomId: "",
    roomPassword: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createTournament = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tournaments/create", form);

      setMessage("Tournament Created Successfully");

      setForm({
        title: "",
        type: "solo",
        prizePool: "",
        entryFee: "",
        totalSlots: "",
        startTime: "",
        description: "",
        roomId: "",
        roomPassword: ""
      });

    } catch (err) {
      setMessage("Failed To Create Tournament");
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
      <h1 style={{ color: "#ff7b22" }}>
        Super Admin Panel
      </h1>

      <form
        onSubmit={createTournament}
        style={{
          background: "#13203d",
          padding: "20px",
          borderRadius: "15px",
          maxWidth: "700px"
        }}
      >
        <input
          name="title"
          placeholder="Tournament Name"
          value={form.title}
          onChange={handleChange}
          style={input}
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          style={input}
        >
          <option value="solo">Solo</option>
          <option value="squad">Squad</option>
          <option value="guildwar">Guild War</option>
        </select>

        <input
          name="prizePool"
          placeholder="Prize Pool"
          value={form.prizePool}
          onChange={handleChange}
          style={input}
        />

        <input
          name="entryFee"
          placeholder="Entry Fee"
          value={form.entryFee}
          onChange={handleChange}
          style={input}
        />

        <input
          name="totalSlots"
          placeholder="Total Slots"
          value={form.totalSlots}
          onChange={handleChange}
          style={input}
        />

        <input
          type="datetime-local"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          style={input}
        />

        <input
          name="roomId"
          placeholder="Room ID"
          value={form.roomId}
          onChange={handleChange}
          style={input}
        />

        <input
          name="roomPassword"
          placeholder="Room Password"
          value={form.roomPassword}
          onChange={handleChange}
          style={input}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{
            ...input,
            height: "120px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#ff7b22",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Create Tournament
        </button>

        <p>{message}</p>
      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#1f2d4d",
  color: "white",
  boxSizing: "border-box"
};

export default Admin;
