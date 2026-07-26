import { useEffect, useState } from "react";
import LeadForm from "../components/LeadForm";

import api from "../Api/axios";
import Loading from "../components/Loading";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try{
      setLoading(true);
      const res = api.get("/leads");

      setLeads(res.data.data || res.data);
    }
    
    finally{
      setLoading(false);
    }
    
  };

  // PUT FILTER HERE
  const filtered = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );


  const deleteLead = async (id) => {
    if (confirm("Delete this lead?")) {
      await api.delete(`/leads/${id}`);

      loadLeads();
    }
  };

  return (
    <div>
      <h2>Leads</h2>

      <input
        placeholder="Search leads..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>

        <option value="new">New</option>

        <option value="qualified">Qualified</option>

        <option value="converted">Converted</option>
      </select>

      <LeadForm refresh={loadLeads} />

      {loading ? (
        <Loading />
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>

              <th>Email</th>

              <th>Company</th>

              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>

                <td>{lead.email}</td>

                <td>{lead.company}</td>

                <td>
                  <span className="badge bg-success">{lead.status}</span>
                </td>

                <td>
                  <button className="btn btn-sm btn-primary">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leads;
