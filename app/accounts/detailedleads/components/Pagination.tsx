import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    page: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
}

export default function Pagination({
    page,
    totalPages,
    onNext,
    onPrev,
}: Props) {
    return (
        <div className="flex items-center gap-3 text-gray-600">
            <button
                onClick={onPrev}
                disabled={page === 1}
                className="rounded-lg border bg-white p-2 disabled:opacity-40">
                <ChevronLeft size={18} />
            </button>

            <p className="text-sm font-semibold text-slate-600">
                Page {page} of {totalPages}
            </p>

            <button
                onClick={onNext}
                disabled={page === totalPages}
                className="rounded-lg border bg-white p-2 disabled:opacity-40">
                <ChevronRight size={18} />
            </button>
        </div>
    );
}