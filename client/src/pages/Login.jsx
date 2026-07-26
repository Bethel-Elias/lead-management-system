


import { useState, useContext } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import api from "../Api/axios";
import { AuthContext } from "../context/AuthContex";

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
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="shadow p-4" style={{ width: "100%", maxWidth: "420px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>

          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;