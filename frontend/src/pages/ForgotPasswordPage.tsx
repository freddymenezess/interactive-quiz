import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Ocorreu um erro.");
      } else {
        navigate("/auth/otp", { state: { email } });
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

        {/* Back button */}
        <button style={styles.backBtn} onClick={() => navigate("/auth")}>
          ← Back
        </button>

        <h1 style={styles.heading}>Forgot Password?</h1>
        <p style={styles.subtitle}>
          Don't worry! It happens. Please enter the email associated with your account.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter your email or Phone no."
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "A enviar..." : "Send Code"}
          </button>
        </form>

        <p style={styles.switchText}>
          Remember Password?{" "}
          <button type="button" style={styles.switchLink} onClick={() => navigate("/auth")}>
            Login Now
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
  input: {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "#F5F1E8",
    border: "1.5px solid #D4CEC0",
    borderRadius: "10px",
    fontSize: "0.9rem",
    color: "#1a1a2e",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
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
