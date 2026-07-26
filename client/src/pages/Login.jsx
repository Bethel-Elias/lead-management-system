import { useState, useContext } from "react";

import api from "../Api/axios";

import { AuthContext } from "../context/AuthContex";

import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data);

      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    <br />
    <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    <br />
    <br />
      <button>Login</button>
    </form>
  );
}

export default Login;
