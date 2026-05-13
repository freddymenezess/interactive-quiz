import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout, AuthButton } from "../components/auth/AuthComponents";

export default function OTPVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
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
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      refs[i - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    // TODO: integrar com POST /api/auth/verify-otp
    navigate("/new-password");
  };

  return (
    <AuthLayout>
      {/* Header */}
      <h1 className="text-2xl font-extrabold text-gray-800 leading-tight mb-3">
        OTP Verification
      </h1>
      <p className="text-xs text-gray-400 leading-relaxed mb-6">
        Enter the verification code we just sent on your email address.
      </p>

      {/* OTP Boxes */}
      <div className="flex gap-3 justify-center mb-6">
        {otp.map((v, i) => (
          <input
            key={i}
            ref={refs[i]}
            maxLength={1}
            value={v}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-14 h-14 text-center text-xl font-bold bg-[#EAE6DF] rounded-xl outline-none focus:ring-2 focus:ring-[#4F7EF7] border border-transparent transition"
          />
        ))}
      </div>

      {/* Verify btn */}
      <AuthButton label="Verify" onClick={handleVerify} />

      {/* Bottom link */}
      <p className="text-center text-xs text-gray-400 mt-6">
        Didn't receive a code?{" "}
        <button
          className="text-[#4F7EF7] font-bold hover:underline"
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
