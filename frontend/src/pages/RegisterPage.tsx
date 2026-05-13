import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthLayout,
  InputField,
  AuthButton,
  OrDivider,
  SocialButtons,
} from "../components/auth/AuthComponents";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    if (password !== confirm) {
      setError("As passwords não coincidem.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Erro ao criar conta.");
      } else {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch {
      setError("Erro de ligação ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* Header */}
      <p className="text-sm font-semibold text-gray-500 mb-1">Hello!</p>
      <h1 className="text-2xl font-extrabold text-gray-800 leading-tight mb-6">
        Register To Get<br />Started
      </h1>

      {/* Inputs */}
      <InputField
        placeholder="Username"
        value={username}
        onChange={setUsername}
      />
      <InputField
        placeholder="Enter your email / Phone no."
        type="email"
        value={email}
        onChange={setEmail}
      />
      <InputField
        placeholder="Enter your password"
        hasEye
        value={password}
        onChange={setPassword}
      />
      <InputField
        placeholder="Confirm Password"
        hasEye
        value={confirm}
        onChange={setConfirm}
      />

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Register btn */}
      <AuthButton label={loading ? "A criar conta..." : "Register"} onClick={handleRegister} />

      {/* Social */}
      <OrDivider label="Or Register with" />
      <SocialButtons />

      {/* Bottom link */}
      <p className="text-center text-xs text-gray-400 mt-6">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-[#4F7EF7] font-bold hover:underline"
        >
          Login Now
        </button>
      </p>
    </AuthLayout>
  );
}
