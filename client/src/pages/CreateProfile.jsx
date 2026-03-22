import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const fields = [
  { name: "name",              label: "Full Name",          icon: "👤", placeholder: "e.g. Sahil Sharma" },
  { name: "age",               label: "Age",                icon: "🎂", placeholder: "e.g. 22" },
  { name: "gender",            label: "Gender",             icon: "⚧", placeholder: "Male / Female / Other" },
  { name: "occupation",        label: "Occupation",         icon: "💼", placeholder: "Student / Working" },
  { name: "college_company",   label: "College / Company",  icon: "🏫", placeholder: "e.g. KIIT University" },
  { name: "mother_tongue",     label: "Mother Tongue",      icon: "🗣️", placeholder: "e.g. Hindi, Odia" },
  { name: "region",            label: "Region",             icon: "🌍", placeholder: "e.g. North India" },
  { name: "budget",            label: "Monthly Budget (₹)",  icon: "💰", placeholder: "e.g. 8000" },
  { name: "preferred_location",label: "Preferred Location", icon: "📍", placeholder: "e.g. Bhubaneswar" },
  { name: "stay_duration",     label: "Stay Duration",      icon: "📅", placeholder: "e.g. 6 months" },
];

function CreateProfile() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setLoading(true);
    try {
      const mobile = localStorage.getItem("mobile");
      await axios.post("http://localhost:5000/api/user/create-profile", { ...form, mobile });
      setDone(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch {
      alert("Error saving profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rf-page">
      <div className="bg-blob blob1" />
      <div className="bg-blob blob2" />

      {/* Navbar */}
      <nav className="rf-nav">
        <div className="brand" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>Roomie<span>Finder</span></div>
        <a href="/dashboard" className="auth-link" style={{ fontSize: "0.85rem" }}>← Back to Dashboard</a>
      </nav>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 1 }}>
        <div className="slide-up">
          <h1 className="section-title">Create Your Profile</h1>
          <p className="section-sub">Fill in your details to start finding compatible roommates.</p>
        </div>

        <div className="glass-card slide-up" style={{ padding: "36px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px" }}>
            {fields.map((f) => (
              <div key={f.name} style={f.name === "name" || f.name === "college_company" ? { gridColumn: "1 / -1" } : {}}>
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

          <div style={{ marginTop: 32 }}>
            <button className="rf-btn" onClick={submit} disabled={loading}>
              {loading ? "Saving…" : done ? "✅ Profile Saved!" : "Save Profile →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;