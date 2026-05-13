import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EnterQuizCodePage() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (code.trim()) {
      navigate("/quiz");
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE4] flex items-center justify-center px-5">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-800 mb-4">Enter Quiz code</h2>
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-[#F7F8F9] border border-[#E8ECF4] rounded-lg px-4 py-3 text-sm outline-none mb-4"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-[#4D61DE] text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition flex items-center justify-center gap-2"
        >
          🔍 Search Quiz
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
