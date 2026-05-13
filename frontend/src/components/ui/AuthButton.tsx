interface AuthButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function AuthButton({
  label,
  onClick,
  type = 'button',
  disabled = false,
}: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-botao mb-2 w-full rounded-lg py-3 text-sm font-semibold text-white transition-all hover:cursor-pointer hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 md:text-base"
    >
      {disabled ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          {label}
        </span>
      ) : (
        label
      )}
    </button>
  );
}
