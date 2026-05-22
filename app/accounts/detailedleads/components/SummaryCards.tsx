import { IndianRupee, CheckCircle2, Clock3, Users } from "lucide-react";
import { Lead } from "../types";

interface Props {
    leads: Lead[];
}

export default function SummaryCards({ leads }: Props) {
    const confirmed = leads.filter(
        (lead) => lead.final_lead_confirm_status
    ).length;

    const pending = leads.length - confirmed;

    const totalPayout = leads.reduce((acc, lead) => {
        return acc + Number(lead.net_payout_amount || 0);
    }, 0);

    const cards = [
        {
            title: "Total Leads",
            value: leads.length,
            icon: Users,
        },
        {
            title: "Confirmed",
            value: confirmed,
            icon: CheckCircle2,
        },
        {
            title: "Pending",
            value: pending,
            icon: Clock3,
        },
        {
            title: "Total Payout",
            value: `₹${totalPayout.toLocaleString("en-IN")}`,
            icon: IndianRupee,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                                <Icon size={20} />
                            </div>
                        </div>

                        <p className="text-sm font-medium text-slate-600">
                            {card.title}
                        </p>

                        <h3 className="mt-1 text-2xl font-bold text-slate-900">
                            {card.value}
                        </h3>
                    </div>
                );
            })}
        </div>
    );
}