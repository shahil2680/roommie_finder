import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const propertyColors = ["#6366f1", "#8b5cf6", "#06b6d4", "#ec4899", "#f59e0b"];

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties");
      setProperties(res.data);
    } catch {
      console.error("Could not load properties");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rf-page">
      <div className="bg-blob blob1" />
      <div className="bg-blob blob2" />

      <nav className="rf-nav">
        <div className="brand" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>Roomie<span>Finder</span></div>
        <a href="/dashboard" className="auth-link" style={{ fontSize: "0.85rem" }}>← Dashboard</a>
        <a href="/matches" className="auth-link" style={{ fontSize: "0.85rem" }}>Find Roommates</a>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 1 }}>
        <div className="slide-up">
          <h1 className="section-title">Available Properties</h1>
          <p className="section-sub">Browse rooms and flats to find your next home.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.4)" }}>
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>⏳</div>
            Loading properties…
          </div>
        ) : properties.length === 0 ? (
          <div className="glass-card" style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🏚️</div>
            No properties listed yet.
          </div>
        ) : (
          <div className="cards-grid slide-up">
            {properties.map((p, i) => {
              const accent = propertyColors[i % propertyColors.length];
              return (
                <div
                  key={p.id}
                  className="glass-card"
                  style={{ overflow: "hidden", transition: "transform 0.25s, box-shadow 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 28px 60px rgba(0,0,0,0.45), 0 0 0 1px ${accent}33`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = ""; }}
                >
                  {/* Accent header strip */}
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${accent}, ${accent}88)` }} />

                  <div style={{ padding: "22px 22px 24px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${accent}22`, border: `1px solid ${accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                        🏠
                      </div>
                      <div>
                        <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.3 }}>{p.title}</h3>
                        <div className="detail-row" style={{ marginTop: 4 }}>📍 <span>{p.location}</span></div>
                      </div>
                    </div>

                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 16 }}>
                      {p.description || "A comfortable living space waiting for you."}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Monthly Rent</div>
                        <div style={{ color: accent, fontWeight: 800, fontSize: "1.2rem" }}>₹{p.rent?.toLocaleString()}</div>
                      </div>
                      {p.contact && (
                        <a
                          href={`tel:${p.contact}`}
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${accent}22`, border: `1px solid ${accent}44`, color: accent, padding: "8px 14px", borderRadius: 10, fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", transition: "background 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.background = `${accent}40`}
                          onMouseLeave={e => e.currentTarget.style.background = `${accent}22`}
                        >
                          📞 Contact
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Properties;