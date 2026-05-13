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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: integrar com POST /api/auth/login
    navigate("/quiz");
  };

  return (
    <AuthLayout>
      {/* Header */}
      <h1 className="text-2xl font-extrabold text-gray-800 leading-tight mb-6">
           Welcome Back! Glad To See You, Again!
     </h1>

      {/* Inputs */}
      <InputField
        placeholder="Enter your username / Phone no."
        value={username}
        onChange={setUsername}
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

      {/* Login btn */}
      <AuthButton label="Login" onClick={handleLogin} />

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
