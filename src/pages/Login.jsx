function Login() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
          width: "300px",
        }}
      >
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "#f97316",
            border: "none",
            color: "white",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
