import { useState } from "react";
import BottomNav from "../components/ui/BottomNav";
import Sidebar from "../components/ui/Sidebar";

const friends = [
  { name: "Tanya", points: 120, avatar: "T", color: "bg-pink-400" },
  { name: "Esther", points: 98, avatar: "E", color: "bg-purple-400" },
  { name: "Regina", points: 87, avatar: "R", color: "bg-blue-400" },
  { name: "Aubrey", points: 76, avatar: "A", color: "bg-green-400" },
  { name: "Colleen", points: 65, avatar: "C", color: "bg-yellow-400" },
  { name: "Claire", points: 54, avatar: "C", color: "bg-orange-400" },
];

export default function FriendsPage() {
  const [search, setSearch] = useState("");

  const filtered = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F2EDE4] pb-24 md:pb-0 md:flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 px-5 py-6 max-w-lg mx-auto md:max-w-2xl md:mx-0 md:px-10">
        <h1 className="text-xl font-extrabold text-gray-900 mb-4">Friends</h1>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Find friend"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#E8ECF4] rounded-xl px-4 py-3 text-sm outline-none pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>

        {/* Friends list */}
        <div className="flex flex-col gap-3">
          {filtered.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
              <div className={`${f.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}>
                {f.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">{f.name}</p>
                <p className="text-xs text-gray-400">{f.points} points</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-[#F2EDE4] flex items-center justify-center text-[#4D61DE] font-bold hover:bg-[#4D61DE] hover:text-white transition">
                +
              </button>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
