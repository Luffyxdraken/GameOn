import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
const navigate = useNavigate();

const [form, setForm] = useState({
email: "",
password: ""
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
  const res = await axios.post(
    "https://pr-esports-gameon.onrender.com/api/auth/login",
    form
  );

  localStorage.setItem(
    "token",
    res.data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );

  if (
    form.email === "luffy@world.com" &&
    form.password === "735208"
  ) {
    navigate("/superadmin");
    return;
  }

  navigate("/dashboard");

} catch (error) {
  alert(
    error.response?.data?.message ||
    "Login Failed"
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
alignItems: "center"
}}
>
<form
onSubmit={handleSubmit}
style={{
background: "#13203d",
padding: "30px",
borderRadius: "15px",
width: "350px"
}}
>
<h1
style={{
textAlign: "center",
color: "#ff7b22"
}}
>
Login
</h1>

    <input
      type="email"
      name="email"
      placeholder="Email"
      onChange={handleChange}
      required
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "15px"
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
        marginTop: "15px"
      }}
    />

    <button
      type="submit"
      style={{
        width: "100%",
        marginTop: "20px",
        padding: "12px",
        border: "none",
        background: "#ff7b22",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      Login
    </button>

    <p
      style={{
        textAlign: "center",
        marginTop: "15px",
        color: "white"
      }}
    >
      Don't have an account?
      <a
        href="/register"
        style={{
          color: "#ff7b22",
          marginLeft: "5px"
        }}
      >
        Register
      </a>
    </p>
  </form>
</div>

);
}

export default Login;
