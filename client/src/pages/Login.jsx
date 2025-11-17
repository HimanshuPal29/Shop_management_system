// src/pages/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    alert("Login Success!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    padding: "20px",
  },

  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#ffffffee",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  title: {
    marginBottom: "5px",
    fontSize: "26px",
    color: "#333",
  },

  subtitle: {
    marginBottom: "20px",
    color: "#777",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    transition: "0.3s",
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "5px",
    backgroundColor: "#2575fc",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

// Add hover effect
styles.input[":focus"] = { borderColor: "#6a11cb" };
styles.button[":hover"] = { backgroundColor: "#1a5fd0" };

export default Login;
