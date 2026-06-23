import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
const navigate = useNavigate();

const [form, setForm] = useState({
username: "",
email: "",
password: "",
});

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  const res = await api.post(
    "/auth/register",
    form
  );

  alert("Account Created Successfully");

  localStorage.setItem(
    "token",
    res.data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );

  navigate("/dashboard");

} catch (err) {
  alert(
    err.response?.data?.message ||
    "Registration Failed"
  );
}

};

return (
<div
style={{
minHeight: "100vh",
background: "#08142e",
display: "flex",
justifyContent: "center",
alignItems: "center",
}}
>
<form
onSubmit={handleSubmit}
style={{
background: "#13203d",
padding: "30px",
borderRadius: "12px",
width: "350px",
}}
>
<h1
style={{
color: "#ff7b22",
textAlign: "center",
}}
>
Create Account
</h1>

    <input
      type="text"
      name="username"
      placeholder="Username"
      onChange={handleChange}
      required
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "15px",
      }}
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      onChange={handleChange}
      required
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "15px",
      }}
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
      required
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "15px",
      }}
    />

    <button
      type="submit"
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "20px",
        background: "#ff7b22",
        border: "none",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Register
    </button>
  </form>
</div>

);
}

export default Register;
