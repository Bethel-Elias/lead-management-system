import { useEffect, useState } from "react";

import api from "../Api/axios";

function Admin() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const res = await api.get("/leads");

      setLeads(res.data.data || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      <div className="card shadow p-4">
        <h4>All Leads</h4>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>

              <th>Email</th>

              <th>Company</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>

                <td>{lead.email}</td>

                <td>{lead.company}</td>

                <td>
                  <span className="badge bg-success">{lead.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
