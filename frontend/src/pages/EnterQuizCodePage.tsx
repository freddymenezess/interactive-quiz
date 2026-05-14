import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EnterQuizCodePage() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (code.trim()) {
      navigate('/quiz');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2EDE4] px-5">
      <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-bold text-gray-800">
          Enter Quiz code
        </h2>
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mb-4 w-full rounded-lg border border-[#E8ECF4] bg-[#F7F8F9] px-4 py-3 text-sm outline-none"
        />
        <button
          onClick={handleSearch}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4D61DE] py-3 font-bold text-white transition hover:bg-blue-600"
        >
          🔍 Search Quiz
        </button>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 w-full text-sm text-gray-400 transition hover:text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
