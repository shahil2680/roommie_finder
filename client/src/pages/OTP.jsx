import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const mobile = localStorage.getItem("mobile");

  const verify = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { mobile, otp });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid OTP. Use 123456 in dev mode.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div className="bg-blob blob1" />
      <div className="bg-blob blob2" />
      <div className="bg-blob blob3" />

      <div className="glass-card slide-up" style={{ width: "100%", maxWidth: 420, padding: "48px 40px", position: "relative", zIndex: 1 }}>
        <div className="brand-logo" style={{ fontSize: "1.6rem" }}>🔐</div>
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "1.6rem", textAlign: "center", letterSpacing: "-0.4px", marginBottom: 6 }}>
          OTP Verification
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", textAlign: "center", fontSize: "0.88rem", marginBottom: 32 }}>
          Enter the code sent to <strong style={{ color: "#818cf8" }}>+91 {mobile}</strong>
        </p>

        <label className="rf-label">One-Time Password</label>
        <input
          className="rf-input"
          style={{ marginBottom: 20, letterSpacing: "0.3rem", fontSize: "1.2rem", textAlign: "center" }}
          placeholder="• • • • • •"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          onKeyDown={(e) => e.key === "Enter" && verify()}
        />

        <button className="rf-btn" onClick={verify} disabled={loading}>
          {loading ? "Verifying…" : "Verify & Continue →"}
        </button>

        <div style={{ textAlign: "center", marginTop: 20, color: "rgba(255,255,255,0.3)", fontSize: "0.82rem" }}>
          Dev mode: use code <strong style={{ color: "#4ade80" }}>123456</strong>
        </div>
      </div>
    </div>
  );
}

export default OTP;