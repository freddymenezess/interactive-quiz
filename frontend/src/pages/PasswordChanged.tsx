import { useNavigate } from 'react-router-dom';
import { AuthButton } from '@components/ui/AuthButton';

export default function PasswordChangedPage() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-5 py-4">
        {/* Check circle */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4F7EF7] shadow-lg">
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
          <h1 className="text-2xl font-extrabold text-gray-800">
            Password Changed!
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-gray-400">
            Your password has been changed successfully.
          </p>
        </div>

        {/* Back btn */}
        <div className="mt-2 w-full">
          <AuthButton
            label="Back to Login"
            onClick={() => navigate('/login')}
          />
        </div>
      </div>
    </section>
  );
}
