'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { DashboardService } from "@/app/services/dashboardService";
import toast from 'react-hot-toast';
import { faqs } from './data/faqs';
import { Info } from 'lucide-react';

const STATUS_GROUPS = {
  open: ['open', 'pending', 'in-progress', 'new', 'assigned'],
  resolved: ['resolved', 'solved', 'completed'],
  closed: ['closed']
};

const formatDate = (val: any) => {
  if (!val) return 'N/A';
  const d = new Date(isNaN(val) ? val : parseInt(val));
  return isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
  });
};

const getStatusColor = (status: string = '') => {
  const s = status.toLowerCase();
  if (STATUS_GROUPS.open.includes(s)) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (STATUS_GROUPS.resolved.includes(s)) return 'bg-green-100 text-green-800 border-green-200';
  if (STATUS_GROUPS.closed.includes(s)) return 'bg-gray-100 text-gray-800 border-gray-200';
  return 'bg-slate-100 text-slate-800 border-slate-200';
};

const TicketItem = ({ ticket, activeTab }: { ticket: any, activeTab: string }) => {
  // Logic: Open tickets are expanded by default, Closed/Resolved are collapsed
  const [isExpanded, setIsExpanded] = useState(activeTab === 'open');
  const isOpen = activeTab === 'open';
  const response = ticket.admin_solution;

  // Reset expansion state when user switches tabs
  useEffect(() => {
    setIsExpanded(activeTab === 'open');
  }, [activeTab]);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`border rounded-lg p-4 transition-all duration-300 cursor-pointer animate-fadeIn group
        ${isOpen ? 'border-blue-200 bg-white shadow-sm' : 'border-slate-200 bg-gradient-to-r from-white to-slate-50/30 hover:border-blue-300 hover:shadow-md'}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className={`font-semibold text-base sm:text-lg transition-colors ${isExpanded || isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
              {ticket.subject || 'No Subject'}
            </h2>
            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full border ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span><span className="font-medium text-slate-700">ID:</span> #{ticket.ticket_id}</span>
            <span><span className="font-medium text-slate-700">Category:</span> {ticket.category}</span>
            {isOpen && <span><span className="font-medium text-slate-700">Name:</span> {ticket.name}</span>}
            {!isOpen && ticket.solved_at && (
              <span className="text-green-600 font-medium">
                {activeTab === 'closed' ? 'Closed' : 'Resolved'}: {formatDate(ticket.solved_at)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
          <div className="text-[11px] text-slate-400">
            <span className="font-medium">Created:</span> {formatDate(ticket.created_at)}
          </div>
          {/* Chevron Indicator */}
          <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Expandable Section */}
      <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="pt-3 border-t border-slate-100">
            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Description</p>
                <p className="bg-slate-50 border border-slate-100 p-3 rounded text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                  {ticket.description || 'No description provided'}
                </p>
              </div>

              {response && (
                <div className="pl-3 border-l-2 border-green-400 bg-green-50/30 p-2 rounded-r">
                  <p className="text-[11px] font-bold text-green-600 uppercase mb-1">Support Response</p>
                  <div className="text-slate-700 text-sm italic leading-relaxed">
                    {response}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HelpSupportPage: React.FC = () => {
  const [ticketData, setTicketData] = useState({ subject: '', category: '', description: '' });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'open' | 'resolved' | 'closed'>('open');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    DashboardService.getMyTickets().then(res => setTickets(res.tickets || [])).finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => ({
    open: tickets.filter(t => STATUS_GROUPS.open.includes(t.status?.toLowerCase())).length,
    resolved: tickets.filter(t => STATUS_GROUPS.resolved.includes(t.status?.toLowerCase())).length,
    closed: tickets.filter(t => STATUS_GROUPS.closed.includes(t.status?.toLowerCase())).length,
  }), [tickets]);

  const handleInputChange = (e: any) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === "subject") value = value.replace(/[0-9]/g, "").charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    if (name === "description" && ticketData.description === "") value = value.charAt(0).toUpperCase() + value.slice(1);
    setTicketData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (counts.open >= 3) return toast.error("You cannot have more than 3 open tickets.");
    try {
      const result = await DashboardService.createTicket(ticketData);
      toast.success("Ticket raised successfully!");
      setTickets(prev => [result.ticket, ...prev]);
      setActiveTab('open');
      setTicketData({ subject: "", category: "", description: "" });
    } catch (err) { toast.error("Failed to submit ticket."); }
  };

  const filteredTickets = tickets.filter(t => STATUS_GROUPS[activeTab].includes(t.status?.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-10 rounded-xl shadow-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Help & Support</h1>
          <p className="text-slate-500">Need help? Raise a ticket or check our FAQs below.</p>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-700">My Support Tickets</h2>

          <div className="flex border-b border-slate-100 mb-6 overflow-x-auto scrollbar-hide">
            {(['open', 'resolved', 'closed'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 text-sm font-semibold capitalize transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-600'}`}>
                {tab} <span className="ml-1 text-[10px] opacity-60">({counts[tab]})</span>
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-12 text-center animate-pulse text-slate-400">Loading your tickets...</div>
          ) : (
            <div className="space-y-4">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((t, i) => <TicketItem key={t.ticket_id || i} ticket={t} activeTab={activeTab} />)
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-sm">
                  No {activeTab} tickets found.
                </div>
              )}
            </div>
          )}

          {!loading && activeTab === 'open' && (
            <div className="mt-10">
              {counts.open >= 3 ? (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-700 flex items-start gap-3">
                  <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
                  <p>You have reached the limit of 3 open tickets. Please wait for a resolution before opening a new one.</p>
              </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-5 rounded-xl border border-slate-200 space-y-4 text-gray-700">
                  <h3 className="text-lg font-bold text-slate-700 mb-2">Raise New Ticket</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <select name="category" value={ticketData.category} onChange={handleInputChange} required className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Category</option>
                      {["Technical Issue", "Commission Related", "Product Information", "Lead Management", "Profile Settings", "KYC/Verification", "Other"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input name="subject" value={ticketData.subject} onChange={handleInputChange} required placeholder="Brief Subject" className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <textarea name="description" value={ticketData.description} onChange={handleInputChange} required rows={3} placeholder="Describe your issue in detail..." className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">Submit Ticket</button>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="pt-10 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-lg overflow-hidden transition-all hover:border-slate-300">
                <button className="w-full px-5 py-4 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors" onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}>
                  <span className="font-semibold text-slate-700 text-sm sm:text-base">{faq.question}</span>
                  <span className={`text-slate-400 transition-transform ${openFaqIndex === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-3">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-12 text-center text-slate-400 text-xs">
          Email support: <a href="mailto:info@infinityarthvishva.com" className="text-blue-500 hover:underline">info@infinityarthvishva.com</a>
        </footer>
      </div>
    </div>
  );
};

export default HelpSupportPage;