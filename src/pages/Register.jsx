import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
const navigate = useNavigate();

const [form, setForm] = useState({
username: "",
email: "",
password: "",
uid: ""
});

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  await API.post("/auth/register", form);

  alert("Account Created Successfully");

  navigate("/login");
} catch (error) {
  alert(
    error.response?.data?.message ||
    "Registration Failed"
  );
}

};

return (
<div className="register-container">
<h1>Create Account</h1>

  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="username"
      placeholder="Game Name"
      onChange={handleChange}
    />

    <input
      type="text"
      name="uid"
      placeholder="Free Fire UID"
      onChange={handleChange}
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      onChange={handleChange}
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
    />

    <button type="submit">
      Create Account
    </button>
  </form>

  <p>
    Already have an account?
    <Link to="/login">
      Login
    </Link>
  </p>
</div>

);
}

export default Register;
