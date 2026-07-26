import { useState } from "react";
import api from "../Api/axios";

function LeadForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "new",
    assigned_to: "",
  });

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

      alert("Lead created");

      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <form onSubmit={submit}>
      <input name="name" placeholder="Name" onChange={handleChange} />

      <input name="email" placeholder="Email" onChange={handleChange} />

      <input name="phone" placeholder="Phone" onChange={handleChange} />

      <input name="company" placeholder="Company" onChange={handleChange} />

      <select name="status" onChange={handleChange}>
        <option value="new">New</option>

        <option value="contacted">Contacted</option>

        <option value="qualified">Qualified</option>

        <option value="converted">Converted</option>
      </select>

      <button>Create Lead</button>
    </form>
  );
}

export default LeadForm;
