import { useState } from "react";
import BottomNav from "../components/ui/BottomNav";
import Sidebar from "../components/ui/Sidebar";

const players = [
  { rank: 1, name: "Alexa Dorm", points: 1569, avatar: "A", color: "bg-yellow-400" },
  { rank: 2, name: "Olivia Forte", points: 1445, avatar: "O", color: "bg-pink-400" },
  { rank: 3, name: "Craig Gosse", points: 1375, avatar: "C", color: "bg-blue-400" },
  { rank: 4, name: "Madelyn Dias", points: 540, avatar: "M", color: "bg-purple-400" },
  { rank: 5, name: "Zain Vaccaro", points: 430, avatar: "Z", color: "bg-green-400" },
  { rank: 6, name: "Skyler Gadt", points: 325, avatar: "S", color: "bg-orange-400" },
];

export default function LeaderboardPage() {
  const [tab, setTab] = useState<"Weekly" | "All Time">("Weekly");

  return (
    <div className="min-h-screen bg-[#F2EDE4] pb-24 md:pb-0 md:flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 px-5 py-6 max-w-lg mx-auto md:max-w-2xl md:mx-0 md:px-10">
        <h1 className="text-xl font-extrabold text-gray-900 mb-6">Leaderboard</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["Weekly", "All Time"].map((t) => (
            <button key={t} onClick={() => setTab(t as "Weekly" | "All Time")}
              className={`px-5 py-2 rounded-full text-sm font-bold transition ${
                tab === t ? "bg-[#4D61DE] text-white" : "bg-white text-gray-500 border border-gray-200"
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* Top 3 */}
        <div className="flex justify-center items-end gap-6 mb-8">
          {[players[1], players[0], players[2]].map((p, i) => (
            <div key={p.rank} className={`flex flex-col items-center ${i === 1 ? "mb-4" : ""}`}>
              <div className={`${p.color} ${i === 1 ? "w-16 h-16" : "w-12 h-12"} rounded-full flex items-center justify-center text-white font-extrabold ${i === 1 ? "text-xl" : "text-base"}`}>
                {p.avatar}
              </div>
              <p className="text-xs font-bold text-gray-800 mt-2">{p.name}</p>
              <p className="text-xs text-[#4D61DE] font-semibold">{p.points} pts</p>
              <div className={`mt-2 ${i === 1 ? "bg-[#4D61DE]" : "bg-gray-300"} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center`}>
                {i === 1 ? "1" : i === 0 ? "2" : "3"}
              </div>
            </div>
          ))}
        </div>

        {/* Rest */}
        <div className="flex flex-col gap-3">
          {players.slice(3).map((p) => (
            <div key={p.rank} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
              <span className="text-sm font-bold text-gray-400 w-5">{p.rank}</span>
              <div className={`${p.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}>
                {p.avatar}
              </div>
              <p className="flex-1 text-sm font-bold text-gray-800">{p.name}</p>
              <p className="text-sm font-bold text-[#4D61DE]">{p.points} pts</p>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
