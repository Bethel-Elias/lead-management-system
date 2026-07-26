import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import ProtectedRoute from "./components/ProtectedRoute";
import LeadDetails from "./pages/LeadDetails";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import CreateLead from "./pages/CreateLead";
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
        <Route
          path="/admin"
          element={
            // <ProtectedRoute adminOnly={true}>
              <Admin />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/create-lead"
          element={
            // <ProtectedRoute>
              <CreateLead />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/leads"
          element={
            // <ProtectedRoute>
              <Leads />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/leads/:id"
          element={
            // <ProtectedRoute>
              <LeadDetails />
            // </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
