"use client";

import { Eye, CheckCircle2 } from "lucide-react";
import { Lead } from "../types";

interface Props {
    leads: Lead[];
    onView: (lead: Lead) => void;

    onConfirm: (
        leadId: number,
        value: string
    ) => void;
}

export default function LeadTable({
    leads,
    onView,
    onConfirm,
}: Props) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full">
                <thead className="border-b bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">Id</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">Lead Name / Lead Id</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">Product</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">DSA</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">RM</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">Final Status</th>
                        <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-600">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {leads.map((lead) => (
                        <tr
                            key={lead.id}
                            className={`border-b transition-all hover:bg-slate-50
                                ${lead.final_lead_confirm_status ? "bg-emerald-50/70" : ""}`}>

                            <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-slate-800">{lead.id}</p>

                                    {lead.final_lead_confirm_status && (
                                        <div className="rounded-full bg-emerald-500 p-1 text-white">
                                            <CheckCircle2 size={14} />
                                        </div>
                                    )}
                                </div>
                            </td>

                            {/* LEAD */}
                            <td className="px-6 py-5">
                                <div>
                                    <p className="font-semibold text-slate-900">{lead.lead_name}</p>
                                    <p className="text-xs text-slate-600">{lead.detail_lead_id}</p>
                                </div>
                            </td>

                            {/* PRODUCT */}
                            <td className="px-6 py-5">
                                <div>
                                    <p className="font-medium text-slate-800">{lead.product_type}</p>
                                    <p className="text-xs text-slate-600">{lead.department}</p>
                                </div>
                            </td>

                            {/* DSA */}
                            <td className="px-6 py-5">
                                <div>
                                    <p className="font-medium text-slate-800">{lead.dsa_name}</p>
                                    <p className="text-xs text-slate-600">{lead.dsa_adv_id}</p>
                                </div>
                            </td>

                            {/* RM */}
                            <td className="px-6 py-5">
                                <div>
                                    <p className="font-medium text-slate-800">{lead.assigned_rm_name}</p>
                                    <p className="text-xs text-slate-600">{lead.assigned_rm_mobile}</p>
                                </div>
                            </td>

                            {/* STATUS */}
                            <td className="px-6 py-5">
                                {lead.final_lead_confirm_status ? (
                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                        <CheckCircle2 size={14} />
                                        Verified
                                    </div>
                                ) : (
                                    <select
                                        defaultValue="no"
                                        onChange={(e) =>
                                            onConfirm(
                                                lead.id,
                                                e.target.value
                                            )
                                        }
                                        className="cursor-pointer rounded-xl border border-slate-200 text-gray-600 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-blue-500">
                                        <option value="">
                                            Select
                                        </option>

                                        <option value="yes">
                                            Confirm
                                        </option>

                                        <option value="no">
                                            Pending
                                        </option>
                                    </select>
                                )}
                            </td>

                            {/* ACTION */}
                            <td className="px-6 py-5 text-right">
                                <button
                                    onClick={() => onView(lead)}
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                    <Eye size={16} />
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}