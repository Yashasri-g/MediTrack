import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import PatientForm from "./PatientForm";
import { PatientsAPI } from "../../api/patients";

export default function PatientCreate() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (values) => {
    setSubmitting(true);
    setApiError("");
    try {
      await PatientsAPI.create(values);
      navigate("/patients");
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        (err?.response?.data?.errors ? JSON.stringify(err.response.data.errors) : "") ||
        "Failed to create patient";
      setApiError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="card">
          <div className="hstack">
            <div>
              <h2 className="title" style={{ margin: 0 }}>Add Patient</h2>
              <div className="sub">Create a new patient record and store it in Postgres.</div>
            </div>
            <button className="btn" onClick={() => navigate("/patients")}>← Back</button>
          </div>

          {apiError && <div className="toast">{apiError}</div>}
        </div>

        <PatientForm
          title="Patient Details"
          subtitle="Fill the form. Validation happens on UI and backend."
          submitting={submitting}
          submitLabel="Create Patient"
          onCancel={() => navigate("/patients")}
          onSubmit={onSubmit}
        />
      </div>
    </Layout>
  );
}