import { ChevronDown } from 'lucide-react';


interface FormFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}

export function FormField({ label, placeholder, value, onChange, type = 'text' }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#E8ECF4] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#4D61DE] transition bg-white"
      />
    </div>
  );
}



interface TextAreaFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

export function TextAreaField({ label, placeholder, value, onChange }: TextAreaFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full border border-[#E8ECF4] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#4D61DE] transition bg-white resize-none"
      />
    </div>
  );
}

// ─── SelectField ──────────────────────────────────

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  options: SelectOption[];
}

export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-[#E8ECF4] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#4D61DE] transition appearance-none bg-white"
        >
          <option value="" disabled>Selecionar...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
        />
      </div>
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="text-red-500 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
      {message}
    </p>
  );
}

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function PrimaryButton({ label, onClick, loading, disabled }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full bg-[#4D61DE] text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition disabled:opacity-60"
    >
      {loading ? 'A carregar...' : label}
    </button>
  );
          }
          
