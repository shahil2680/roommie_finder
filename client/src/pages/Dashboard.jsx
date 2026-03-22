import { Link, useNavigate } from "react-router-dom";

const navCards = [
  {
    icon: "👤",
    title: "Create Profile",
    desc: "Set up your roommate preferences and personal info",
    cta: "Set Up Profile",
    to: "/create-profile",
    color: "#6366f1",
  },
  {
    icon: "🤝",
    title: "Find Roommates",
    desc: "Discover compatible roommates based on your preferences",
    cta: "Search Matches",
    to: "/matches",
    color: "#8b5cf6",
  },
  {
    icon: "🏠",
    title: "Browse Properties",
    desc: "Explore available rooms and flats in your city",
    cta: "View Listings",
    to: "/properties",
    color: "#06b6d4",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const mobile = localStorage.getItem("mobile") || "User";

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="rf-page">
      <div className="bg-blob blob1" />
      <div className="bg-blob blob2" />
      <div className="bg-blob blob3" />

      {/* Navbar */}
      <nav className="rf-nav">
        <div className="brand">Roomie<span>Finder</span></div>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>📱 +91 {mobile}</span>
        <button className="rf-btn secondary" style={{ width: "auto", padding: "8px 18px", fontSize: "0.82rem" }} onClick={logout}>
          Logout
        </button>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px", position: "relative", zIndex: 1 }}>
        {/* Hero */}
        <div className="slide-up" style={{ marginBottom: 48 }}>
          <h1 className="section-title">
            Welcome back! 👋
          </h1>
          <p className="section-sub">
            What would you like to do today?
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="cards-grid">
          {navCards.map((card, i) => (
            <div
              key={card.to}
              className="glass-card slide-up"
              style={{ padding: "32px 28px", animationDelay: `${i * 0.1}s`, cursor: "pointer", transition: "transform 0.25s, box-shadow 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 28px 60px rgba(0,0,0,0.4), 0 0 0 1px ${card.color}33`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = ""; }}
              onClick={() => navigate(card.to)}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                background: `${card.color}22`, border: `1px solid ${card.color}44`, fontSize: "1.5rem", marginBottom: 18
              }}>
                {card.icon}
              </div>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>{card.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 20 }}>{card.desc}</p>
              <Link
                to={card.to}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  color: card.color === "#6366f1" ? "#818cf8" : card.color === "#8b5cf6" ? "#c084fc" : "#22d3ee",
                  textDecoration: "none", fontWeight: 600, fontSize: "0.88rem", transition: "gap 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.gap = "10px"}
                onMouseLeave={e => e.currentTarget.style.gap = "6px"}
              >
                {card.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;