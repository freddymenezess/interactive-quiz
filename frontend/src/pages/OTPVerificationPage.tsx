import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email || "";
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) {
      setError("Introduz o código completo.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Código inválido.");
      } else {
        navigate("/auth/new-password", { state: { email, otp: code } });
      }
    } catch {
      setError("Erro de ligação ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoRow}>
          <div style={styles.logoCircle}>Q</div>
          <span style={styles.logoText}>QuizApp</span>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/auth/forgot-password")}>
          ← Back
        </button>

        <h1 style={styles.heading}>OTP Verification</h1>
        <p style={styles.subtitle}>
          Enter the verification code we just sent to your email address.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.otpRow}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                style={{
                  ...styles.otpInput,
                  borderColor: digit ? "#1a1a2e" : "#D4CEC0",
                  background: digit ? "#1a1a2e" : "#F5F1E8",
                  color: digit ? "#fff" : "#1a1a2e",
                }}
              />
            ))}
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "A verificar..." : "Verify"}
          </button>
        </form>

        <p style={styles.switchText}>
          Didn't received code?{" "}
          <button
            type="button"
            style={styles.switchLink}
            onClick={() => navigate("/auth/forgot-password")}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  bg: {
    minHeight: "100vh",
    background: "#C8C0AD",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "1.5rem",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "2.5rem 2rem",
    background: "#FDFAF4",
    borderRadius: "20px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
  logoCircle: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#1a1a2e",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "1rem",
  },
  logoText: {
    fontSize: "1.05rem",
    fontWeight: "700",
    color: "#1a1a2e",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#1a1a2e",
    fontSize: "0.9rem",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: "600",
    padding: 0,
    marginBottom: "1.5rem",
    display: "block",
  },
  heading: {
    fontSize: "1.65rem",
    fontWeight: "800",
    color: "#1a1a2e",
    lineHeight: "1.35",
    marginBottom: "0.75rem",
  },
  subtitle: {
    fontSize: "0.88rem",
    color: "#7a7570",
    lineHeight: "1.5",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.85rem",
  },
  otpRow: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    marginBottom: "0.5rem",
  },
  otpInput: {
    width: "64px",
    height: "64px",
    textAlign: "center",
    fontSize: "1.4rem",
    fontWeight: "700",
    border: "1.5px solid #D4CEC0",
    borderRadius: "12px",
    outline: "none",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  error: {
    background: "rgba(220,38,38,0.08)",
    border: "1px solid rgba(220,38,38,0.25)",
    color: "#dc2626",
    borderRadius: "8px",
    padding: "0.6rem 0.9rem",
    fontSize: "0.85rem",
    margin: 0,
  },
  submitBtn: {
    marginTop: "0.3rem",
    padding: "0.9rem",
    background: "#1a1a2e",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "0.98rem",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    width: "100%",
  },
  switchText: {
    textAlign: "center",
    fontSize: "0.85rem",
    color: "#7a7570",
    margin: "1.5rem 0 0",
  },
  switchLink: {
    background: "none",
    border: "none",
    color: "#1a1a2e",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "0.85rem",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  },
};
