import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    category: "General Knowledge",
    time: "2min",
    title: "Saturday Night Quiz",
    question: "What is the capital city of Australia?",
    options: ["a) Sydney", "b) Canberra", "c) Brisbane"],
    correct: 1,
  },
];

export default function QuizQuestionPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const navigate = useNavigate();
  const q = questions[0];

  const handleAnswer = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
  };

  return (
    <div className="min-h-screen bg-[#F2EDE4] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 bg-white border border-[#E8ECF4] rounded-xl flex items-center justify-center">
            <svg width="8" height="14" viewBox="0 0 10 16" fill="none">
              <path d="M8.5 1L1.5 8L8.5 15" stroke="#1E232C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2 className="text-sm font-bold text-gray-700">{q.title}</h2>
          <button className="text-gray-400 text-xl">✕</button>
        </div>

        {/* Category badge */}
        <div className="flex gap-2 mb-4">
          <span className="text-xs bg-[#4D61DE] text-white px-3 py-1 rounded-full font-semibold">{q.category}</span>
          <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full font-semibold">{q.time}</span>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl p-5 mb-6 border border-gray-100">
          <p className="text-base font-bold text-gray-800">{q.question}</p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-8">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full p-4 rounded-2xl text-left text-sm font-semibold border transition ${
                !answered
                  ? "bg-white border-gray-100 hover:border-[#4D61DE] hover:text-[#4D61DE]"
                  : i === q.correct
                  ? "bg-green-50 border-green-400 text-green-700"
                  : i === selected
                  ? "bg-red-50 border-red-400 text-red-700"
                  : "bg-white border-gray-100 text-gray-400"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Next button */}
        {answered && (
          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#4D61DE] text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
