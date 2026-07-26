// import { useEffect, useState } from "react";
// import LeadForm from "../components/LeadForm";

// import api from "../Api/axios";
// import Loading from "../components/Loading";

// function Leads() {
//   const [leads, setLeads] = useState([]);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadLeads();
//   }, []);

//   const loadLeads = async () => {
//     try{
//       setLoading(true);
//       const res = api.get("/leads");

//       setLeads(res.data.data || res.data);
//     }
    
//     finally{
//       setLoading(false);
//     }
    
//   };

//   // PUT FILTER HERE
//   const filtered = leads.filter((lead) =>
//     lead.name.toLowerCase().includes(search.toLowerCase())
//   );


//   const deleteLead = async (id) => {
//     if (confirm("Delete this lead?")) {
//       await api.delete(`/leads/${id}`);

//       loadLeads();
//     }
//   };

//   return (
//     <div>
//       <h2>Leads</h2>

//       <input
//         placeholder="Search leads..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <select value={status} onChange={(e) => setStatus(e.target.value)}>
//         <option value="">All</option>

//         <option value="new">New</option>

//         <option value="qualified">Qualified</option>

//         <option value="converted">Converted</option>
//       </select>

//       <LeadForm refresh={loadLeads} />

//       {loading ? (
//         <Loading />
//       ) : (
//         <table className="table table-striped table-hover">
//           <thead>
//             <tr>
//               <th>Name</th>

//               <th>Email</th>

//               <th>Company</th>

//               <th>Status</th>

//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((lead) => (
//               <tr key={lead.id}>
//                 <td>{lead.name}</td>

//                 <td>{lead.email}</td>

//                 <td>{lead.company}</td>

//                 <td>
//                   <span className="badge bg-success">{lead.status}</span>
//                 </td>

//                 <td>
//                   <button className="btn btn-sm btn-primary">View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Leads;

import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Table,
  Button,
  Badge,
} from "react-bootstrap";

import LeadForm from "../components/LeadForm";
import Loading from "../components/Loading";
import api from "../Api/axios";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);

      const res = await api.get("/leads");

      setLeads(res.data.data || res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Search + Status Filter
  const filtered = leads.filter((lead) => {
    const matchesSearch = lead.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = status === "" || lead.status === status;

    return matchesSearch && matchesStatus;
  });

  const deleteLead = async (id) => {
    if (window.confirm("Delete this lead?")) {
      await api.delete(`/leads/${id}`);
      loadLeads();
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Body>
          <h2 className="mb-4">Lead Management</h2>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            <Col md={3}>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="mb-4">
            <LeadForm refresh={loadLeads} />
          </div>

          {loading ? (
            <Loading />
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th width="180">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.name}</td>
                      <td>{lead.email}</td>
                      <td>{lead.company}</td>

                      <td>
                        <Badge
                          bg={
                            lead.status === "new"
                              ? "primary"
                              : lead.status === "qualified"
                              ? "warning"
                              : "success"
                          }
                        >
                          {lead.status}
                        </Badge>
                      </td>

                      <td>
                        <Button variant="primary" size="sm" className="me-2">
                          View
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteLead(lead.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Leads;