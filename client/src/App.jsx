

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import ProtectedRoute from "./components/ProtectedRoute";
import LeadDetails from "./pages/LeadDetails";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import CreateLead from "./pages/CreateLead";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/admin" element={<Admin />} />

            <Route path="/create-lead" element={<CreateLead />} />

            <Route path="/leads" element={<Leads />} />

            <Route path="/leads/:id" element={<LeadDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;