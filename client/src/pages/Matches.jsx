import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const searchFields = [
  { name: "location",      label: "Location",       icon: "📍", placeholder: "e.g. Bhubaneswar" },
  { name: "budget",        label: "Budget (₹)",      icon: "💰", placeholder: "e.g. 8000" },
  { name: "mother_tongue", label: "Mother Tongue",  icon: "🗣️", placeholder: "e.g. Hindi" },
  { name: "region",        label: "Region",         icon: "🌍", placeholder: "e.g. North India" },
  { name: "occupation",    label: "Occupation",     icon: "💼", placeholder: "Student / Working" },
  { name: "age",           label: "Age",            icon: "🎂", placeholder: "e.g. 22" },
];

function Matches() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const search = async () => {
    setLoading(true);
    try {
      const { location = "any", budget = 0, mother_tongue = "any", region = "any", occupation = "any", age = 0 } = form;
      const res = await axios.get(
        `http://localhost:5000/api/match/${location}/${budget}/${mother_tongue}/${region}/${occupation}/${age}`
      );
      setUsers(res.data);
      setSearched(true);
    } catch {
      alert("Error fetching matches.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return { bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.3)", color: "#4ade80" };
    if (score >= 40) return { bg: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.3)", color: "#fbbf24" };
    return { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", color: "#f87171" };
  };

  return (
    <div className="rf-page">
      <div className="bg-blob blob1" />
      <div className="bg-blob blob2" />
      <div className="bg-blob blob3" />

      <nav className="rf-nav">
        <div className="brand" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>Roomie<span>Finder</span></div>
        <a href="/dashboard" className="auth-link" style={{ fontSize: "0.85rem" }}>← Dashboard</a>
        <a href="/properties" className="auth-link" style={{ fontSize: "0.85rem" }}>Properties</a>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 1 }}>
        <div className="slide-up">
          <h1 className="section-title">Find Compatible Roommates</h1>
          <p className="section-sub">Enter your preferences to discover your best matches.</p>
        </div>

        {/* Search Form */}
        <div className="glass-card slide-up" style={{ padding: "28px 28px", marginBottom: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px 20px", marginBottom: 20 }}>
            {searchFields.map((f) => (
              <div key={f.name}>
                <label className="rf-label">{f.icon} {f.label}</label>
                <input
                  className="rf-input"
                  name={f.name}
                  placeholder={f.placeholder}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <button className="rf-btn" style={{ maxWidth: 200 }} onClick={search} disabled={loading}>
            {loading ? "Searching…" : "🔍 Find Matches"}
          </button>
        </div>

        {/* Results */}
        {searched && (
          <div className="slide-up">
            {users.length === 0 ? (
              <div className="glass-card" style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>😕</div>
                No matches found. Try different criteria!
              </div>
            ) : (
              <>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.88rem", marginBottom: 16 }}>
                  Found <strong style={{ color: "#818cf8" }}>{users.length}</strong> potential roommates
                </p>
                <div className="cards-grid">
                  {users.map((user) => {
                    const sc = getScoreColor(user.matchScore);
                    return (
                      <div
                        key={user.id}
                        className="glass-card"
                        style={{ padding: "24px", transition: "transform 0.25s, box-shadow 0.25s" }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>
                            {(user.name || "?")[0].toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: "#fff" }}>{user.name || "Anonymous"}</div>
                            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>{user.occupation || "—"}</div>
                          </div>
                          <div style={{ marginLeft: "auto", background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color, padding: "3px 10px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 700 }}>
                            {user.matchScore}% match
                          </div>
                        </div>
                        <div className="detail-row">📍 <span>{user.preferred_location || "—"}</span></div>
                        <div className="detail-row">💰 <span>₹{user.budget || "—"}/mo</span></div>
                        <div className="detail-row">🗣️ <span>{user.mother_tongue || "—"}</span></div>
                        <div className="detail-row">🌍 <span>{user.region || "—"}</span></div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Matches;