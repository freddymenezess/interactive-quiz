import { useNavigate } from "react-router-dom";
import { AuthLayout, AuthButton } from "../components/auth/AuthComponents";

export default function PasswordChangedPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center gap-5 py-4">
        {/* Check circle */}
        <div className="w-20 h-20 rounded-full bg-[#4F7EF7] flex items-center justify-center shadow-lg">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-800">Password Changed!</h1>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Your password has been changed successfully.
          </p>
        </div>

        {/* Back btn */}
        <div className="w-full mt-2">
          <AuthButton label="Back to Login" onClick={() => navigate("/login")} />
        </div>
      </div>
    </AuthLayout>
  );
}
