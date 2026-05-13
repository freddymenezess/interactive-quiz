import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Copy } from "lucide-react";

const quizCode = "Q-452-456";

export default function CreateQuizPage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("What is the h02?");
  const [options, setOptions] = useState(["Option One", "Option Two", "Option Three"]);

  const handleOption = (i: number, val: string) => {
    const updated = [...options];
    updated[i] = val;
    setOptions(updated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(quizCode);
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center px-5 py-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white border border-[#E8ECF4] rounded-xl flex items-center justify-center"
          >
            <ChevronLeft size={18} color="#1E232C" />
          </button>
          <h1 className="text-lg font-extrabold text-gray-900">Create Quiz</h1>
        </div>

        {/* Quiz Code */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-base font-bold text-gray-900">{quizCode}</span>
          <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-[#4D61DE] font-semibold">
            <Copy size={14} color="#4D61DE" /> Copy
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-100 rounded-full mb-5">
          <div className="h-1 bg-[#4D61DE] rounded-full" style={{ width: "60%" }} />
        </div>

        {/* Question number */}
        <h2 className="text-base font-extrabold text-gray-900 mb-4">Question 10</h2>

        {/* Quiz Question */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Quiz Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border border-[#E8ECF4] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#4D61DE] transition"
          />
        </div>

        {/* Quiz Options */}
        <div className="mb-8">
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Quiz Options</label>
          <div className="flex flex-col gap-3">
            {options.map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={(e) => handleOption(i, e.target.value)}
                className="w-full border border-[#E8ECF4] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#4D61DE] transition"
              />
            ))}
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={() => navigate("/quiz-found")}
          className="w-full bg-[#4D61DE] text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
