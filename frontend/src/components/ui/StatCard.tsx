interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="border-borda rounded-2xl border bg-white p-4 text-center">
      <p className="text-botao text-2xl font-extrabold">{value}</p>
      <p className="text-traco mt-1 text-xs">{label}</p>
    </div>
  );
}
