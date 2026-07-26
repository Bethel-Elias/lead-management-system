import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../Api/axios";

function CreateLead() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "new",
    assigned_to: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/leads", form);

      alert("Lead created successfully");

      navigate("/leads");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create lead");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Lead</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="card p-4 shadow" onSubmit={submit}>
        <div className="mb-3">
          <label>Name</label>

          <input
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>

          <input
            className="form-control"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>

          <input
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Company</label>

          <input
            className="form-control"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Status</label>

          <select
            className="form-control"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="new">New</option>

            <option value="contacted">Contacted</option>

            <option value="qualified">Qualified</option>

            <option value="converted">Converted</option>

            <option value="lost">Lost</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Assign User ID</label>

          <input
            className="form-control"
            name="assigned_to"
            value={form.assigned_to}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary">Create Lead</button>
      </form>
    </div>
  );
}

export default CreateLead;
