import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import PatientForm from "./PatientForm";
import { PatientsAPI } from "../../api/patients";

export default function PatientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setApiError("");
      try {
        const res = await PatientsAPI.get(id);
        setInitialValues(res.data);
      } catch {
        setApiError("Failed to load patient");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSubmit = async (values) => {
    setSubmitting(true);
    setApiError("");
    try {
      await PatientsAPI.update(id, values);
      navigate("/patients");
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        (err?.response?.data?.errors ? JSON.stringify(err.response.data.errors) : "") ||
        "Failed to update patient";
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
              <h2 className="title" style={{ margin: 0 }}>Edit Patient</h2>
              <div className="sub">Update patient info. Changes are saved to Postgres.</div>
            </div>
            <button className="btn" onClick={() => navigate("/patients")}>← Back</button>
          </div>

          {apiError && <div className="toast">{apiError}</div>}
        </div>

        {loading ? (
          <div className="card">Loading...</div>
        ) : (
          <PatientForm
            title={`Patient #${id}`}
            subtitle="Edit fields and click Save to update."
            initialValues={initialValues}
            submitting={submitting}
            submitLabel="Save Changes"
            onCancel={() => navigate("/patients")}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </Layout>
  );
}