import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../Api/axios";

function LeadDetails() {
  const { id } = useParams();

  const [lead, setLead] = useState(null);

  useEffect(() => {
    loadLead();
  }, []);

  const loadLead = async () => {
    const res = await api.get(`/leads/${id}`);

    setLead(res.data);
  };

  const update = async () => {
    await api.put(`/leads/${id}`, lead);

    alert("Updated");
  };

  if (!lead) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{lead.name}</h2>

      <input
        value={lead.company}
        onChange={(e) =>
          setLead({
            ...lead,

            company: e.target.value,
          })
        }
      />

      <select
        value={lead.status}
        onChange={(e) =>
          setLead({
            ...lead,

            status: e.target.value,
          })
        }
      >
        <option>new</option>

        <option>contacted</option>

        <option>qualified</option>

        <option>converted</option>

        <option>lost</option>
      </select>

      <button onClick={update}>Save</button>
    </div>
  );
}

export default LeadDetails;
