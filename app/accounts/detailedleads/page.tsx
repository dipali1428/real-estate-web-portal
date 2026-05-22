"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Search, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";
import { AccountService } from "@/app/services/accountsService";

import LeadTable from "./components/LeadTable";
import LeadDrawer from "./components/LeadDrawer";
import Pagination from "./components/Pagination";
import SummaryCards from "./components/SummaryCards";

import { Lead } from "./types";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [search, setSearch] = useState("");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    // FETCH LEADS
    const fetchLeads = async () => {
        try {
            setLoading(true);
            const response = await AccountService.getCompletedDetailLeads();

            setLeads(response.data || []);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to fetch leads"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    // UPDATE CONFIRM STATUS
    const handleConfirmStatus = async (
        leadId: number,
        value: string
    ) => {
        try {
            const status = value === "yes";

            await AccountService.updateLeadConfirmStatus(leadId, status);
            toast.success("Lead status updated");

            fetchLeads();
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to update status"
            );
        }
    };

    // FILTER
    const filteredLeads = useMemo(() => {
        return leads.filter((lead) => {
            const term = search.toLowerCase();

            return (
                lead.lead_name?.toLowerCase().includes(term) ||
                lead.detail_lead_id?.toLowerCase().includes(term) ||
                lead.dsa_adv_id?.toLowerCase().includes(term) ||
                lead.assigned_rm_name?.toLowerCase().includes(term)
            );
        });
    }, [leads, search]);

    // PAGINATION
    const totalPages = Math.ceil(
        filteredLeads.length / itemsPerPage
    );

    const paginatedLeads = useMemo(() => {
        const start = (page - 1) * itemsPerPage;

        return filteredLeads.slice(
            start,
            start + itemsPerPage
        );
    }, [filteredLeads, page]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-[1800px] space-y-6">

                {/* HEADER */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Completed Leads by RM
                        </h1>

                        <p className="mt-1 text-sm text-slate-600">
                            Manage all Completed lead and mark final confirmation status to proceed
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative w-[350px]">
                            <Search
                                size={18}
                                className="absolute left-3 top-3 text-slate-500"
                            />

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search leads by lead name, id"
                                className="h-11 w-full rounded-xl border border-slate-200 text-gray-600 bg-white pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                            />
                        </div>

                        <button
                            onClick={fetchLeads}
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-gray-600 hover:bg-slate-100 cursor-pointer">
                            <RefreshCcw size={18} />
                        </button>
                    </div>
                </div>

                {/* SUMMARY */}
                <SummaryCards leads={leads} />

                {/* TABLE */}
                <LeadTable
                    leads={paginatedLeads}
                    onView={setSelectedLead}
                    onConfirm={handleConfirmStatus}
                />

                {/* PAGINATION */}
                <div className="flex justify-end">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onNext={() =>
                            setPage((prev) => prev + 1)
                        }
                        onPrev={() =>
                            setPage((prev) => prev - 1)
                        }
                    />
                </div>
            </div>

            {/* DRAWER */}
            <LeadDrawer
                lead={selectedLead}
                onClose={() => setSelectedLead(null)}
            />
        </div>
    );
}