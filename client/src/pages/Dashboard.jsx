import { Link } from "react-router-dom";

// function Dashboard() {
//   return (
//     <div className="container mt-5">
//       <h1>Lead Dashboard</h1>

//       <Link to="/leads">View Leads</Link>
//     </div>
//   );
// }

// export default Dashboard;

function Dashboard() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h4>Total Leads</h4>

              <h2>120</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h4>New Leads</h4>

              <h2>30</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
