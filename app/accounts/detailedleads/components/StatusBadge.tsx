interface Props {
    label: string;
    active?: boolean | null;
}

export default function StatusBadge({
    label,
    active,
}: Props) {
    return (
        <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold
            ${active ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-red-100 text-red-500"}`}>
            {label}
        </div>
    );
}