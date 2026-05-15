import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { AuthButton } from '../components/ui/AuthButton';

export default function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleReset = () => {
    // TODO: integrar com POST /api/auth/reset-password
    navigate('/password-changed');
  };

  return (
    <section>
      {/* Header */}
      <h1 className="mb-3 text-2xl leading-tight font-extrabold text-gray-800">
        Create New Password
      </h1>
      <p className="mb-6 text-xs leading-relaxed text-gray-400">
        Your new password must be unique from those previously used.
      </p>

      {/* Inputs */}
      <Input
        placeholder="New Password"
        hasEye
        value={password}
        onChange={setPassword}
      />
      <Input
        placeholder="Confirm Password"
        hasEye
        value={confirm}
        onChange={setConfirm}
      />

      {/* Reset btn */}
      <div className="mt-2">
        <AuthButton label="Reset Password" onClick={handleReset} />
      </div>
    </section>
  );
}
