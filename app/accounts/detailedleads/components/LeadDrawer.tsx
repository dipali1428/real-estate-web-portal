// "use client";

// import { X } from "lucide-react";
// import { Lead } from "../types";
// import InfoField from "./InfoField";
// import StatusBadge from "./StatusBadge";

// interface Props {
//     lead: Lead | null;
//     onClose: () => void;
// }

// export default function LeadDrawer({
//     lead,
//     onClose,
// }: Props) {
//     if (!lead) return null;

//     return (
//         <div className="fixed inset-0 z-50">
//             <div
//                 className="absolute inset-0 bg-black/40"
//                 onClick={onClose}
//             />

//             <div className="absolute right-0 top-0 h-screen w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
//                 <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5">
//                     <div>
//                         <h2 className="text-xl font-bold text-slate-900">
//                             {lead.lead_name}
//                         </h2>

//                         <p className="text-sm text-slate-700 bg-blue-100 inline-block mt-1 px-2 py-0.5 rounded">
//                             {lead.detail_lead_id}
//                         </p>
//                     </div>

//                     <button
//                         onClick={onClose}
//                         className="rounded-full p-2 hover:bg-slate-200 cursor-pointer text-slate-600">
//                         <X size={20} />
//                     </button>
//                 </div>

//                 <div className="space-y-8 p-6">
//                     <div className="flex flex-wrap gap-2">
//                         <StatusBadge label="Bank Verified" active={lead.bank_verified} />
//                         <StatusBadge label="KYC Completed" active={lead.kyc_completed} />
//                         <StatusBadge label="Agreement Created" active={lead.agreement_status === "created"} />
//                         <StatusBadge label="Lead Completed" active={lead.lead_status === "COMPLETED"} />
//                     </div>

//                     <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
//                         <h3 className="mb-5 text-lg font-bold text-slate-900">
//                             Lead Information
//                         </h3>

//                         <div className="grid grid-cols-2 gap-5">
//                             <InfoField label="Department" value={lead.department} />
//                             <InfoField label="Product Type" value={lead.product_type} />
//                             {/* <InfoField label="Sub Category" value={lead.sub_category} /> */}
//                             <InfoField label="Contact" value={lead.contact_number} />
//                             <InfoField label="Email" value={lead.email} />
//                             <InfoField
//                                 label="Created At"
//                                 value={lead.created_at
//                                     ? new Date(lead.created_at).toLocaleString("en-IN", {
//                                         day: "2-digit",
//                                         month: "short",
//                                         year: "numeric",
//                                         hour: "2-digit",
//                                         minute: "2-digit",
//                                         second: "2-digit",
//                                         hour12: true,
//                                     })
//                                     : "-"
//                                 }
//                             />
//                         </div>
//                     </section>

//                     <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
//                         <h3 className="mb-5 text-lg font-bold text-slate-900">
//                             DSA Information
//                         </h3>

//                         <div className="grid grid-cols-2 gap-5">
//                             <InfoField label="DSA Id" value={lead.dsa_id} />
//                             <InfoField label="DSA Name" value={lead.dsa_name} />
//                             <InfoField label="ADV ID" value={lead.dsa_adv_id} />
//                             <InfoField label="Email" value={lead.dsa_email} />
//                             <InfoField label="Mobile" value={lead.dsa_mobile} />
//                         </div>
//                     </section>

//                     <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
//                         <h3 className="mb-5 text-lg font-bold text-slate-900">
//                             RM Information
//                         </h3>

//                         <div className="grid grid-cols-2 gap-5">
//                             <InfoField label="RM Id" value={lead.assigned_rm_id} />
//                             <InfoField label="RM Name" value={lead.assigned_rm_name} />
//                             <InfoField label="RM Email" value={lead.assigned_rm_email} />
//                             <InfoField label="RM Mobile" value={lead.assigned_rm_mobile} />
//                         </div>
//                     </section>

//                     <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
//                         <h3 className="mb-5 text-lg font-bold text-slate-900">
//                             Payout Details
//                         </h3>

//                         <div className="grid grid-cols-2 gap-5">
//                             <InfoField label="Disbursement" value={lead.disbursement_amount} />
//                             <InfoField label="Gross Payout" value={lead.gross_payout_amount} />
//                             <InfoField label="GST" value={lead.gst_amount} />
//                             <InfoField label="TDS" value={lead.tds_amount} />
//                             <InfoField label="Net Payout" value={lead.net_payout_amount} />
//                             <InfoField label="Payment Date" value={lead.payout_date ? new Date(lead.created_at).toLocaleString("en-IN", {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                                 second: "2-digit",
//                                 hour12: true,
//                             })
//                                 : "-"} />
//                             <InfoField label="Payment Id" value={lead.payout_id} />
//                             <InfoField label="Payment Mode" value={lead.payment_mode} />
//                             <InfoField label="Transaction Reference No" value={lead.transaction_reference_no} />
//                             <InfoField label="Invoice Number" value={lead.invoice_number} />
//                             <InfoField label="Invoice Date" value={lead.invoice_date ? new Date(lead.created_at).toLocaleString("en-IN", {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                                 second: "2-digit",
//                                 hour12: true,
//                             })
//                                 : "-"} />
//                             <InfoField label="Policy Number" value={lead.policy_number} />
//                         </div>
//                     </section>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { X } from "lucide-react";
import { Lead } from "../types";
import InfoField from "./InfoField";
import StatusBadge from "./StatusBadge";

interface Props {
    lead: Lead | null;
    onClose: () => void;
}

const formatDate = (date?: string | Date | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
};

const SectionCard = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-slate-900">
                {title}
            </h3>
        </div>

        <div className="p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {children}
            </div>
        </div>
    </section>
);

export default function LeadDrawer({
    lead,
    onClose,
}: Props) {
    if (!lead) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="absolute right-0 top-0 h-screen w-full max-w-2xl overflow-y-auto bg-slate-100 shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
                    <div className="flex items-start justify-between px-6 py-5">
                        <div className="space-y-2">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {lead.lead_name}
                                </h2>

                                <p className="mt-1 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
                                    {lead.detail_lead_id}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-1">
                                <StatusBadge label="Bank Verified" active={lead.bank_verified} />
                                <StatusBadge label="KYC Completed" active={lead.kyc_completed} />
                                <StatusBadge label="Agreement Created" active={lead.agreement_status === "created"} />
                                <StatusBadge label="Lead Completed" active={lead.lead_status === "COMPLETED"} />
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6 p-6">
                    {/* LEAD SECTION */}
                    <SectionCard title="Lead Information">
                        <InfoField label="Department" value={lead.department} />
                        <InfoField label="Product Type" value={lead.product_type} />
                        <InfoField label="Contact" value={lead.contact_number} />
                        <InfoField label="Email" value={lead.email} />
                        <InfoField label="Created At" value={formatDate(lead.created_at)} />
                    </SectionCard>

                    <SectionCard title="DSA Information">
                        <InfoField label="DSA Id" value={lead.dsa_id} />
                        <InfoField label="DSA Name" value={lead.dsa_name} />
                        <InfoField label="ADV ID" value={lead.dsa_adv_id} />
                        <InfoField label="Email" value={lead.dsa_email} />
                        <InfoField label="Mobile" value={lead.dsa_mobile} />
                    </SectionCard>

                    <SectionCard title="RM Information">
                        <InfoField label="RM Id" value={lead.assigned_rm_id} />
                        <InfoField label="RM Name" value={lead.assigned_rm_name} />
                        <InfoField label="RM Email" value={lead.assigned_rm_email} />
                        <InfoField label="RM Mobile" value={lead.assigned_rm_mobile} />
                    </SectionCard>

                    <SectionCard title="Payout Details">
                        <InfoField label="Disbursement" value={lead.disbursement_amount} />
                        <InfoField label="Gross Payout" value={lead.gross_payout_amount} />
                        <InfoField label="GST" value={lead.gst_amount} />
                        <InfoField label="TDS" value={lead.tds_amount} />
                        <InfoField label="Net Payout" value={lead.net_payout_amount} />
                        <InfoField label="Payment Date" value={formatDate(lead.payout_date)} />
                        <InfoField label="Payment Id" value={lead.payout_id} />
                        <InfoField label="Payment Mode" value={lead.payment_mode} />
                        <InfoField label="Transaction Ref No" value={lead.transaction_reference_no} />

                        <InfoField label="Invoice Number" value={lead.invoice_number} />
                        <InfoField label="Invoice Date" value={formatDate(lead.invoice_date)} />
                        <InfoField label="Policy Number" value={lead.policy_number} />
                    </SectionCard>
                </div>
            </div>
        </div>
    );
}