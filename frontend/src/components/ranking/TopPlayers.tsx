import { Trophy } from 'lucide-react';

interface Player {
  name: string;
  score: string;
  avatarColor: string;
  isMe?: boolean;
}

interface TopPlayersProps {
  players: Player[];
}

export function TopPlayers({ players }: TopPlayersProps) {
  return (
    <div className="border-borda rounded-2xl border-2 bg-white p-4">
      <p className="text-titulo mb-3 flex items-center gap-2 text-sm font-extrabold">
        <Trophy size={16} className="text-botao" />
        Top jogadores
      </p>
      {players.map((player, i) => (
        <div
          key={player.name}
          className="border-borda flex items-center gap-3 border-b py-2 last:border-0"
        >
          <span className="text-traco w-4 text-xs font-bold">{i + 1}</span>
          <div
            className={`h-8 w-8 rounded-full ${player.avatarColor} flex items-center justify-center text-xs font-bold text-white`}
          >
            {player.name[0]}
          </div>
          <div className="flex-1">
            <p
              className={`text-sm font-bold ${player.isMe ? 'text-botao' : 'text-titulo'}`}
            >
              {player.name}{' '}
              {player.isMe && (
                <span className="text-traco font-normal">(eu)</span>
              )}
            </p>
          </div>
          <span className="text-traco text-xs">{player.score}</span>
        </div>
      ))}
    </div>
  );
}
