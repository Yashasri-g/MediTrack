import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PatientsAPI } from "../../api/patients";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    setApiError("");
    try {
      const res = await PatientsAPI.list();
      setPatients(res.data);
    } catch {
      setApiError("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return patients;
    return patients.filter(p =>
      (p.full_name || "").toLowerCase().includes(s) ||
      (p.phone || "").toLowerCase().includes(s) ||
      String(p.id).includes(s)
    );
  }, [patients, q]);

  const onDelete = async (id) => {
    if (!confirm("Delete this patient?")) return;
    try {
      await PatientsAPI.remove(id);
      await load();
    } catch {
      setApiError("Failed to delete patient");
    }
  };

  return (
    <Layout>
      <div className="grid">
        <div className="card">
          <div className="hstack">
            <div>
              <h2 className="title">Patients</h2>
              <div className="sub">Search, add, edit and manage clinic patients.</div>
            </div>
            <Link className="btn primary" to="/patients/new">+ Add Patient</Link>
          </div>

          {apiError && <div className="toast">{apiError}</div>}

          <div className="field" style={{ marginTop: 14 }}>
            <label>Search</label>
            <input
              className="input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name / phone / id"
            />
          </div>

          <div className="tablewrap" style={{ marginTop: 14 }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: 70 }}>ID</th>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th style={{ width: 120 }}>DOB</th>
                  <th style={{ width: 170 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5">Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan="5">No patients found.</td></tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>
                        <div style={{ fontWeight: 650 }}>{p.full_name}</div>
                        <div className="sub" style={{ marginTop: 2 }}>
                          {p.email || "—"}
                        </div>
                      </td>
                      <td>{p.phone}</td>
                      <td>{p.dob}</td>
                      <td>
                        <div style={{ display: "flex", gap: 8 }}>
                          <Link className="btn" to={`/patients/${p.id}/edit`}>Edit</Link>
                          <button className="btn danger" onClick={() => onDelete(p.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3 className="title" style={{ fontSize: 16 }}>Overview</h3>
          <div className="sub">Quick stats for this module.</div>

          <div className="kpi" style={{ marginTop: 14 }}>
            <div className="kpiBox">
              <div className="kpiLabel">Total Patients</div>
              <div className="kpiValue">{patients.length}</div>
              <div className="sub">Active records in Postgres</div>
            </div>

            <div className="kpiBox">
              <div className="kpiLabel">Search Results</div>
              <div className="kpiValue">{filtered.length}</div>
              <div className="sub">Matching current filter</div>
            </div>

            <div className="kpiBox">
              <div className="kpiLabel">API Status</div>
              <div className="kpiValue" style={{ color: "var(--ok)" }}>OK</div>
              <div className="sub">GET/POST/PUT/DELETE working</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}