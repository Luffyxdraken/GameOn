import { useState } from "react";
import api from "../api/axios";

function Admin() {
  const [form, setForm] = useState({
    title: "",
    prizePool: "",
    entryFee: "",
    totalSlots: 12,
    description: ""
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
      const res = await api.post(
        "/tournaments/create",
        {
          title: form.title,
          prizePool: Number(form.prizePool),
          entryFee: Number(form.entryFee),
          totalSlots: Number(form.totalSlots),
          description: form.description
        }
      );

      setMessage("Tournament Created Successfully");

      setForm({
        title: "",
        prizePool: "",
        entryFee: "",
        totalSlots: 12,
        description: ""
      });

      console.log(res.data);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Failed to create tournament"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px"
      }}
    >
      <h1
        style={{
          color: "#f97316",
          marginBottom: "20px"
        }}
      >
        Admin Dashboard
      </h1>

      <form
        onSubmit={createTournament}
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          maxWidth: "600px"
        }}
      >
        <h2>Create Tournament</h2>

        <input
          type="text"
          name="title"
          placeholder="Tournament Title"
          value={form.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="prizePool"
          placeholder="Prize Pool"
          value={form.prizePool}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="entryFee"
          placeholder="Entry Fee"
          value={form.entryFee}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="totalSlots"
          placeholder="Total Slots"
          value={form.totalSlots}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{
            ...inputStyle,
            minHeight: "120px"
          }}
        />

        <button
          type="submit"
          style={{
            background: "#f97316",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Create Tournament
        </button>

        {message && (
          <p
            style={{
              marginTop: "15px"
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  background: "#334155",
  color: "white",
  boxSizing: "border-box"
};

export default Admin;
