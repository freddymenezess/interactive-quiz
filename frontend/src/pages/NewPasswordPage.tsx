import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthLayout,
  InputField,
  AuthButton,
} from "../components/auth/AuthComponents";

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = () => {
    // TODO: integrar com POST /api/auth/reset-password
    navigate("/password-changed");
  };

  return (
    <AuthLayout>
      {/* Header */}
      <h1 className="text-2xl font-extrabold text-gray-800 leading-tight mb-3">
        Create New Password
      </h1>
      <p className="text-xs text-gray-400 leading-relaxed mb-6">
        Your new password must be unique from those previously used.
      </p>

      {/* Inputs */}
      <InputField
        placeholder="New Password"
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

      {/* Reset btn */}
      <div className="mt-2">
        <AuthButton label="Reset Password" onClick={handleReset} />
      </div>
    </AuthLayout>
  );
}
