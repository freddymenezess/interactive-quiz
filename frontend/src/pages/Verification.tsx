import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout, AuthButton } from '../components/auth/AuthComponents';

export default function OTPVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 3) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      refs[i - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    // TODO: integrar com POST /api/auth/verify-otp
    navigate('/new-password');
  };

  return (
    <AuthLayout>
      {/* Header */}
      <h1 className="mb-3 text-2xl leading-tight font-extrabold text-gray-800">
        OTP Verification
      </h1>
      <p className="mb-6 text-xs leading-relaxed text-gray-400">
        Enter the verification code we just sent on your email address.
      </p>

      {/* OTP Boxes */}
      <div className="mb-6 flex justify-center gap-3">
        {otp.map((v, i) => (
          <input
            key={i}
            ref={refs[i]}
            maxLength={1}
            value={v}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-14 w-14 rounded-xl border border-transparent bg-[#EAE6DF] text-center text-xl font-bold transition outline-none focus:ring-2 focus:ring-[#4F7EF7]"
          />
        ))}
      </div>

      {/* Verify btn */}
      <AuthButton label="Verify" onClick={handleVerify} />

      {/* Bottom link */}
      <p className="mt-6 text-center text-xs text-gray-400">
        Didn't receive a code?{' '}
        <button
          className="font-bold text-[#4F7EF7] hover:underline"
          onClick={() => {
            // TODO: integrar com POST /api/auth/resend-otp
          }}
        >
          Resend
        </button>
      </p>
    </AuthLayout>
  );
}
