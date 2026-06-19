import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { verifyOtpApi, resendOtpApi } from "../api/authApi";
import "./Login.css";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle case where route is accessed directly without navigation state
  const { email = "", phoneNumber = "" } = location.state || {};

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await verifyOtpApi({
        email,
        phoneNumber,
        otp,
      });
      setSuccess("OTP Verified successfully!");
      alert("OTP Verified");
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    try {
      await resendOtpApi(email);
      setSuccess("OTP resent successfully!");
      alert("OTP Sent Again");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <div className="auth-card glass-card">
        <div className="auth-brand">
          <span className="auth-logo">👑</span>
          <h1 className="auth-title">Crown Assurance</h1>
          <p className="auth-sub">Enter OTP sent to your registered contacts</p>
          {email && <p className="auth-sub-email" style={{ color: "var(--accent)", fontSize: "12px", marginTop: "4px" }}>{email}</p>}
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleVerify} className="auth-form">
          <div className="form-group">
            <label className="form-label">One-Time Password (OTP)</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary auth-btn" type="submit" disabled={loading}>
            {loading ? "Verifying…" : "Verify OTP"}
          </button>
        </form>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--glass-border)", fontSize: "13px" }}>
          <button className="btn btn-secondary btn-sm" onClick={handleResend} type="button">
            Resend OTP
          </button>
          <Link to="/login" style={{ color: "var(--accent-light)", fontWeight: "600" }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;