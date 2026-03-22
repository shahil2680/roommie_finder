import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOTP = async () => {
    if (!mobile) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { mobile });
      localStorage.setItem("mobile", mobile);
      navigate("/otp");
    } catch (e) {
      alert("Error sending OTP. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") sendOTP(); };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      {/* Animated blobs */}
      <div className="bg-blob blob1" />
      <div className="bg-blob blob2" />
      <div className="bg-blob blob3" />

      <div className="glass-card slide-up" style={{ width: "100%", maxWidth: 420, padding: "48px 40px", position: "relative", zIndex: 1 }}>
        <div className="brand-logo">🏠</div>
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "1.75rem", textAlign: "center", letterSpacing: "-0.5px", marginBottom: 6 }}>
          Roomie Finder
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", textAlign: "center", fontSize: "0.9rem", marginBottom: 32 }}>
          Find your perfect roommate match
        </p>

        <label className="rf-label">Mobile Number</label>
        <div style={{ position: "relative", marginBottom: 20 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", fontSize: "1rem" }}>📱</span>
          <input
            className="rf-input"
            style={{ paddingLeft: 40 }}
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            onKeyDown={handleKey}
            maxLength={10}
          />
        </div>

        <button className="rf-btn" onClick={sendOTP} disabled={loading}>
          {loading ? "Sending OTP…" : "Get OTP →"}
        </button>

        <hr className="rf-divider" />
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.82rem" }}>
          We'll send a one-time password to verify your number
        </p>
      </div>
    </div>
  );
}

export default Login;