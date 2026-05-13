import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthLayout,
  InputField,
  AuthButton,
} from '../components/auth/AuthComponents';

export default function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleReset = () => {
    // TODO: integrar com POST /api/auth/reset-password
    navigate('/password-changed');
  };

  return (
    <AuthLayout>
      {/* Header */}
      <h1 className="mb-3 text-2xl leading-tight font-extrabold text-gray-800">
        Create New Password
      </h1>
      <p className="mb-6 text-xs leading-relaxed text-gray-400">
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
