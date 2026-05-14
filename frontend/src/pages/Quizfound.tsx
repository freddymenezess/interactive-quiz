import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Clock, BookOpen, User } from "lucide-react";
import { BottomNav } from "../components/layout/BottomNav";

interface QuizFoundCardProps {
  category: string;
  duration: string;
  title: string;
  questionCount: number;
  creatorName: string;
  onStart: () => void;
}

function QuizFoundCard({
  category,
  duration,
  title,
  questionCount,
  creatorName,
  onStart,
}: QuizFoundCardProps) {
  return (
    <div className="bg-[#2D2D2D] rounded-2xl p-5">

      {/* Tags */}
      <div className="flex gap-2 mb-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F5EDE2] text-gray-800">
          {category}
        </span>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F5EDE2] text-gray-800 flex items-center gap-1">
          <Clock size={11} />
          {duration}
        </span>
      </div>

      <h2 className="text-white text-xl font-bold mb-1">{title}</h2>

      <p className="text-sm text-gray-400 mb-4 flex items-center gap-1">
        <BookOpen size={13} />
        {questionCount} Quizzes
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7B89FF] flex items-center justify-center">
            <User size={16} color="white" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Created by</p>
            <p className="text-white text-sm font-semibold">{creatorName}</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-[#4D61DE] hover:bg-blue-600 transition"
        >
          Start Now
        </button>
      </div>

    </div>
  );
}

export default function QuizzesFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { code, quiz } = location.state || {
    code: "Q-452-456",
    quiz: {
      category: "General Knowledge",
      duration: "2min",
      title: "Saturday night Quiz",
      questionCount: 13,
      creatorName: "Brandon Matrovs",
    },
  };

  return (
    <div className="min-h-screen bg-[#F5EDE2] flex items-start justify-center px-5 py-6 pb-24">
      <div className="w-full max-w-sm">

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white border border-[#E8ECF4] rounded-xl flex items-center justify-center"
          >
            <ChevronLeft size={18} color="#1E232C" />
          </button>
          <h1 className="text-lg font-extrabold text-gray-900">Quiz Found!</h1>
        </div>

        <p className="text-base font-bold text-gray-600 mb-4">{code}</p>

        <QuizFoundCard
          category={quiz.category}
          duration={quiz.duration}
          title={quiz.title}
          questionCount={quiz.questionCount}
          creatorName={quiz.creatorName}
          onStart={() => navigate("/quiz/play", { state: { quiz } })}
        />

      </div>
      <BottomNav />
    </div>
  );
    }

