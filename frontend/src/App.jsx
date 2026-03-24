import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PatientList from "./pages/Patients/PatientList";
import PatientCreate from "./pages/Patients/PatientCreate";
import PatientEdit from "./pages/Patients/PatientEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/patients" replace />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/new" element={<PatientCreate />} />
        <Route path="/patients/:id/edit" element={<PatientEdit />} />
      </Routes>
    </BrowserRouter>
  );
}