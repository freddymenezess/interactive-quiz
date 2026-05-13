import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthLayout,
  InputField,
  AuthButton,
  OrDivider,
  SocialButtons,
} from "../components/auth/AuthComponents";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Email ou password incorretos.");
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
      <p className="text-sm font-semibold text-gray-500 mb-1">Welcome Back! Glad</p>
      <h1 className="text-2xl font-extrabold text-gray-800 leading-tight mb-6">
        To See You,<br />Again!
      </h1>

      {/* Inputs */}
      <InputField
        placeholder="Enter your email / Phone no."
        type="email"
        value={email}
        onChange={setEmail}
      />
      <InputField
        placeholder="Password"
        hasEye
        value={password}
        onChange={setPassword}
      />

      {/* Forgot */}
      <div className="text-right mb-4">
        <button
          onClick={() => navigate("/forgot-password")}
          className="text-xs text-[#4F7EF7] hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Login btn */}
      <AuthButton label={loading ? "A entrar..." : "Login"} onClick={handleLogin} />

      {/* Social */}
      <OrDivider label="Or Login with" />
      <SocialButtons />

      {/* Bottom link */}
      <p className="text-center text-xs text-gray-400 mt-6">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-[#4F7EF7] font-bold hover:underline"
        >
          Register Now
        </button>
      </p>
    </AuthLayout>
  );
}
