import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps {
  placeholder: string;
  label?: string;
  type?: string;
  hasEye?: boolean;
  value?: string;
  onChange?: (v: string) => void;
}

export function Input({
  placeholder,
  label,
  type = 'text',
  hasEye = false,
  value,
  onChange,
}: InputProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative mb-3 w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={hasEye ? (show ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-input border-input placeholder-txtplacehorlder focus:placeholder-txtplacehorlder w-full rounded-lg border px-4 py-3.5 text-sm text-gray-700 transition outline-none focus:border-[#4D61DE] focus:ring-1 focus:ring-[#4D61DE]"
      />
      {hasEye && (
        <button
          type="button"
          onClick={() => setShow((s: boolean) => !s)}
          className="absolute top-8/12 right-4 -translate-y-1/2"
        >
          {show ? (
            <Eye className="text-eyeinput hover:cursor-pointer" />
          ) : (
            <EyeOff className="text-eyeinput hover:cursor-pointer" />
          )}
        </button>
      )}
    </div>
  );
}
