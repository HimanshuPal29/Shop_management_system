// src/pages/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "employee",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form.username, form.email, form.password, form.role);
    alert("Registered Successfully!");
  };

  return (
    <div style={{ width: "300px", margin: "auto", paddingTop: "80px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} /><br/><br/>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} /><br/><br/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br/><br/>

        <select name="role" onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select><br/><br/>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
