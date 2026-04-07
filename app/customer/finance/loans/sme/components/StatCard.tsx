interface StatProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
}

export default function StatCard({ title, value, trend, isPositive }: StatProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#2076C7] transition-colors">{value}</h3>
      <div className={`inline-flex items-center gap-1.5 mt-3 px-2 py-0.5 rounded-lg text-[10px] font-black ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        <span>{isPositive ? '↑' : '↓'}</span>
        <span>{trend}</span>
      </div>
    </div>
  );
}