export default function Layout({ children }) {
  return (
    <div className="page">
      <div className="nav">
        <div className="brand">
          <span style={{ fontSize: 18 }}>🏥</span>
          <span>MediTrack</span>
          <span className="badge">SaaS Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="pill">Patients</span>
          <span className="pill">Flask • Postgres • React</span>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>{children}</div>
    </div>
  );
}