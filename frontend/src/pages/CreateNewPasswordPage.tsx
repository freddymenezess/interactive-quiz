import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateNewPasswordPage() {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = (location.state as { email?: string; otp?: string }) || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("As passwords não coincidem.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Ocorreu um erro.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Erro de ligação ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.bg}>
        <div style={styles.card}>
          <div style={styles.logoRow}>
            <div style={styles.logoCircle}>Q</div>
            <span style={styles.logoText}>QuizApp</span>
          </div>
          <div style={styles.successIcon}>✓</div>
          <h1 style={styles.heading}>Password Changed!</h1>
          <p style={styles.subtitle}>
            Your password has been changed successfully.
          </p>
          <button
            style={styles.submitBtn}
            onClick={() => navigate("/auth")}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoRow}>
          <div style={styles.logoCircle}>Q</div>
          <span style={styles.logoText}>QuizApp</span>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/auth/otp")}>
          ← Back
        </button>

        <h1 style={styles.heading}>Create New Password</h1>
        <p style={styles.subtitle}>
          Your new password must be unique from those previously used.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="password"
            type="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "A guardar..." : "Reset Password"}
          </button>
        </form>
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
  successIcon: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    background: "#1a1a2e",
    color: "#fff",
    fontSize: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
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
};
