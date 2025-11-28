const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col">
        <span className="text-xs sm:text-sm text-slate-500">{label}</span>
        <span className="font-semibold text-slate-800 wrap-break-word text-sm sm:text-base">
            {value}
        </span>
    </div>
);

const TicketSummaryCard = ({ ticket }: { ticket: any }) => {
    const createdDate = new Date(ticket.created_at).toLocaleString([], {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const statusColor =
        ticket.status.toLowerCase() === "open"
            ? "bg-green-100 text-green-700 border-green-300"
            : "bg-gray-100 text-gray-700 border-gray-300";

    return (
        <div className="w-full bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 lg:p-8 border border-blue-100 animate-fadeIn">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold font-sans bg-blue-500 text-transparent bg-clip-text">
                    🎫 Ticket Raised
                </h2>

                <div className="flex flex-col font-sans items-start sm:items-end w-full sm:w-auto">
                    <span className="text-sm sm:text-base font-medium text-slate-800">
                        <span className="text-blue-500">Ticket ID: </span> #{ticket.ticket_id}
                    </span>

                    <span
                        className={`mt-1 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${statusColor}`}>
                        {ticket.status}
                    </span>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InfoItem label="Name" value={ticket.name} />
                <InfoItem label="Category" value={ticket.category} />
                <InfoItem label="Subject" value={ticket.subject} />
                <InfoItem label="Created At" value={createdDate} />
            </div>

            {/* Description */}
            <div className="mt-6">
                <p className="text-sm sm:text-base font-medium text-slate-600 mb-2">
                    Description
                </p>

                <p className="bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-lg text-slate-700 text-sm sm:text-base leading-relaxed break-words">
                    {ticket.description}
                </p>
            </div>

        </div>
    );
};

export default TicketSummaryCard;
