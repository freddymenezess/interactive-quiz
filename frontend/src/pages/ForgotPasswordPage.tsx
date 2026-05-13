import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthLayout,
  InputField,
  AuthButton,
} from "../components/auth/AuthComponents";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSend = () => {
    // TODO: integrar com POST /api/auth/forgot-password
    navigate("/otp-verification");
  };

  return (
    <AuthLayout>
      {/* Header */}
      <h1 className="text-2xl font-extrabold text-gray-800 leading-tight mb-3">
        Forgot Password?
      </h1>
      <p className="text-xs text-gray-400 leading-relaxed mb-6">
        Don't worry it occurs. Please enter the email address linked with your account.
      </p>

      {/* Input */}
      <InputField
        placeholder="Enter your email address"
        type="email"
        value={email}
        onChange={setEmail}
      />

      {/* Send btn */}
      <div className="mt-2">
        <AuthButton label="Send Code" onClick={handleSend} />
      </div>

      {/* Bottom link */}
      <p className="text-center text-xs text-gray-400 mt-6">
        Remember Password?{" "}
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
