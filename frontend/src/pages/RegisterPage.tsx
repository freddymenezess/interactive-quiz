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

  const handleRegister = () => {
    // TODO: integrar com POST /api/auth/register
    navigate("/login");
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

      {/* Register btn */}
      <AuthButton label="Register" onClick={handleRegister} />

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
