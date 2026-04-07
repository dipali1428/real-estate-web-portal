'use client';
import { useState, useEffect } from 'react';
import {
  FileText, Clock, Inbox, Download, Building2, Eye, X, Image as ImageIcon
} from 'lucide-react';
import { DashboardService } from '@/app/services/dashboardService';

// Brand Colors
const COLORS = {
  blue: '#2076C7',
  peacock: '#1CADA3'
};

interface PayoutRecord {
  Id: string;
  payoutId: string;
  date: string;
  clientName: string;
  leadId: string;
  product: string;
  category: string;
  paymentMode: string;
  gstAmount: string;
  invoiceDate: string;
  invoiceNumber: string;
  netPayout: string;
  tdsAmount: string;
  amount: string;
  grossAmount: string;
  status: string;
  loanNumber: string;
  refNumber: string;
}

export default function CreditNotePortal() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLibReady, setIsLibReady] = useState(false); // New state to track library loading
  const [payoutData, setPayoutData] = useState<PayoutRecord[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  // States for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [activePayoutId, setActivePayoutId] = useState<string>('');

  // Load html2canvas script for Image download reliably
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ((window as any).html2canvas) {
        setIsLibReady(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      script.async = true;
      script.onload = () => {
        console.log("html2canvas loaded successfully");
        setIsLibReady(true);
      };
      script.onerror = () => console.error("Failed to load html2canvas");
      document.body.appendChild(script);
    }
  }, []);

  const formatValue = (val: any, stripDecimals = false) => {
    if (!val) return "0";
    let str = val.toString().replace(/^"|"$/g, "").replace(/"/g, "").trim();
    if (stripDecimals) return str.split('.')[0];
    return str;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [profileRes, payoutRes] = await Promise.all([
          DashboardService.getProfile(),
          DashboardService.getCompletedDetailLeads()
        ]);

        setUserProfile({
          name: profileRes?.user?.name || 'Authorized Partner',
          address: profileRes?.kycDetails?.aadhaar_kyc_data?.full_address || profileRes?.user?.city || '',
          pan: profileRes?.user?.pan || '',
          gst: profileRes?.kycDetails?.gst_number || profileRes?.user?.gst_number || '',
          city: profileRes?.user?.city || '',
          state: profileRes?.user?.state || '',
          adv_id: profileRes?.user?.adv_id || '',
        });

        const rawList = Array.isArray(payoutRes) ? payoutRes : (payoutRes?.leads || payoutRes?.data || []);

        setPayoutData(rawList.map((item: any) => ({
          Id: item.id || 'N/A',
          payoutId: item.payout_id || `PAY-${item._id?.slice(-5).toUpperCase()}`,
          date: item.payout_date ? new Date(item.payout_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
          clientName: item.lead_name || 'N/A',
          leadId: item.detail_lead_id || 'N/A',
          product: item.product_type || item.sub_category || 'N/A',
          category: item.department || 'N/A',
          paymentMode: item.payment_mode || 'NEFT',
          gstAmount: item.gst_amount || '0',
          invoiceDate: item.invoice_date || '',
          invoiceNumber: item.invoice_number || 'N/A',
          netPayout: item.net_payout_amount || '0',
          tdsAmount: item.tds_amount || '0',
          amount: item.disbursement_amount || '0',
          grossAmount: item.gross_payout_amount || '0',
          status: item.lead_status || 'Completed',
          refNumber: item.transaction_reference_no || 'N/A',
          loanNumber: item.policy_number || item.form_data?.policy_number || 'N/A',
        })));
      } catch (error) {
        console.error("Portal Data Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const toBase64 = async (url: string) => {
    const res = await fetch(url, {
      mode: "cors",        // ✅ REQUIRED
      cache: "no-cache"
    });

    if (!res.ok) {
      throw new Error("Image fetch failed");
    }

    const blob = await res.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const getCNTemplate = async (payoutId: string) => {
    if (!payoutId) return "";
    const groupedRecords = payoutData.filter(item => item.payoutId === payoutId);
    if (groupedRecords.length === 0) return "";

    const baseRecord = groupedRecords[0];
    const addressParts = [userProfile?.address, userProfile?.city, userProfile?.state, userProfile?.pincode || userProfile?.zipCode];
    const fullAddress = addressParts.filter(part => part && part.toString().trim() !== "").join(", ");
    const parseAmt = (val: any) => parseFloat(val?.toString().replace(/,/g, '') || '0');
    const formatInr = (val: number) => val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const totalGross = groupedRecords.reduce((acc, item) => acc + parseAmt(item.grossAmount), 0);
    const totalGst = groupedRecords.reduce((acc, item) => acc + parseAmt(item.gstAmount), 0);
    const totalTds = groupedRecords.reduce((acc, item) => acc + parseAmt(item.tdsAmount), 0);
    const totalNet = groupedRecords.reduce((acc, item) => acc + parseAmt(item.netPayout), 0);

    const rowsHtml = groupedRecords.map((data, index) => {
      const cleanLoanNo = data.loanNumber ? data.loanNumber.toString().replace(/"/g, '').trim() : 'N/A';
      return `
        <tr>
          <td style="text-align: center; border: 1px solid #e2e8f0; padding: 10px;">${index + 1}</td>
          <td style="border: 1px solid #e2e8f0; padding: 10px;">${data.leadId}</td>
          <td style="border: 1px solid #e2e8f0; padding: 10px;">${data.clientName}</td>
          <td style="border: 1px solid #e2e8f0; padding: 10px;">${data.product}</td>
          <td style="border: 1px solid #e2e8f0; padding: 10px;">${cleanLoanNo}</td>
          <td style="border: 1px solid #e2e8f0; padding: 10px;">${data.refNumber?.toString().replace(/"/g, '').trim() || 'N/A'}</td>
          <td style="text-align: right; border: 1px solid #e2e8f0; padding: 10px;">₹ ${formatInr(parseAmt(data.grossAmount))}</td>
          <td style="text-align: right; border: 1px solid #e2e8f0; padding: 10px;">₹ ${formatInr(parseAmt(data.gstAmount))}</td>
          <td style="text-align: right; border: 1px solid #e2e8f0; padding: 10px; color: #ef4444;">₹ ${formatInr(parseAmt(data.tdsAmount))}</td>
          <td style="text-align: right; border: 1px solid #e2e8f0; padding: 10px; font-weight: bold; color: #1e3a8a;">₹ ${formatInr(parseAmt(data.netPayout))}</td>
        </tr>
      `;
    }).join('');

    return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 40px; background: #fff; width: 850px; margin: auto;" id="cn-capture-area">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 26px; text-transform: uppercase; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; display: inline-block;">Credit Note</h1>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px;">
          
        </div>

        <table style="width: 100%; font-size: 12px; margin-bottom: 30px;">
          <tr>
            <td width="50%" style="vertical-align: top;">
              <span style="color: #64748b; font-weight: bold;">TO:</span><br/>
              <strong style="font-size: 15px; color: #1e3a8a;">${userProfile?.name || 'Partner Name'}</strong><br/>
              <div style="max-width: 300px;">${fullAddress || 'Address on record'}</div>
              ${userProfile?.pan ? `<div><strong>PAN:</strong> ${userProfile.pan}</div>` : ''}
              ${userProfile?.gst ? `<div><strong>ADV_ID:</strong> ${userProfile.gst}</div>` : ''}
            </td>
            <td width="50%" style="vertical-align: top; text-align: right;">
              <span style="color: #64748b; font-weight: bold;">BILL TO:</span><br/>
              <strong style="font-size: 15px;">Infinity Arthvishva Advisory Private Limited</strong><br/>
              12th Floor, 1201, 7 Business Square, Shivaji Nagar, Pune, 411005<br/>
              <strong>GSTIN:</strong> 27AAICI0723K1ZJ<br/>
              <strong>PAN:</strong> AAICI0723K
            </td>
          </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 30px;">
          <thead>
            <tr style="background: #f8fafc;">
              <th style="border: 1px solid #e2e8f0; padding: 10px;">#</th>
              <th style="border: 1px solid #e2e8f0; padding: 10px;">Lead ID</th>
              <th style="border: 1px solid #e2e8f0; padding: 10px;">Client</th>
              <th style="border: 1px solid #e2e8f0; padding: 10px;">Product</th>
              <th style="border: 1px solid #e2e8f0; padding: 10px;">Reference No</th>
               <th style="border: 1px solid #e2e8f0; padding: 10px;">UTR No</th>
              <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: right;">Gross</th>
              <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: right;">GST</th>
              <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: right;">TDS</th>
              <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: right;">Net</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>

        <div style="display: flex; justify-content: space-between; margin-top: 20px; align-items: flex-start;">
          <div style="font-size: 13px; line-height: 1.6;">
            <strong style="color: #1e3a8a; text-decoration: underline;">Payment Information:</strong><br/>
            <strong>Beneficiary name:</strong> Infinity Arthvishva Advisory Pvt Ltd<br/>
            <strong>Bank Name:</strong> Induslnd Bank Ltd<br/>
            <strong>Account number:</strong> 251-026-041988<br/>
            <strong>IFSC code:</strong> INDB0000380
          </div>
          
          <table style="width: 300px; border-collapse: collapse; font-size: 13px; border: 1px solid #e2e8f0;">
            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;">Subtotal</td><td align="right">₹ ${formatInr(totalGross)}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;">GST</td><td align="right">₹ ${formatInr(totalGst)}</td></tr>
            <tr style="background: #f8fafc; font-weight: bold; color: #1e3a8a;"><td style="padding: 10px;">NET PAYABLE</td><td align="right">₹ ${formatInr(totalGross)}</td></tr>
          </table>
        </div>

        <div style="margin-top: 50px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #eee; padding-top: 15px;">
          This is a computer-generated Credit Note and does not require a physical signature.
        </div>
      </div>
    `;
  };

  const handleDownloadImage = async (payoutId: string) => {
    if (!payoutId) return;
    if (!isLibReady || !(window as any).html2canvas) {
      return;
    }

    const content = await getCNTemplate(payoutId);
    if (!content) return;

    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '0';
    element.innerHTML = content;
    document.body.appendChild(element);

    const captureTarget = element.querySelector('#cn-capture-area') as HTMLElement;

    if (!captureTarget) {
      console.error("Capture Error: Target element not found");
      document.body.removeChild(element);
      return;
    }

    setTimeout(() => {
      (window as any).html2canvas(captureTarget, {
        useCORS: true,
        allowTaint: false,
        scale: 3,
        backgroundColor: "#ffffff",
        logging: false
      }).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        link.download = `Credit_Note_${payoutId}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
        document.body.removeChild(element);
      }).catch((err: any) => {
        console.error("Capture Error:", err);
        if (document.body.contains(element)) document.body.removeChild(element);
      });
    }, 500);
  };

  const handleView = async (payoutId: string) => {
    setIsLoading(true);
    try {
      const content = await getCNTemplate(payoutId);
      setModalContent(content);
      setActivePayoutId(payoutId);
      setIsModalOpen(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-700 tracking-tight">Credit Note Management</h1>
          <p className="text-slate-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base lg:text-lg">Review adjustment records and export notes.</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm inline-block min-w-[300px]">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-slate-700">{userProfile?.name}</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            ADV_ID: {userProfile?.adv_id || 'UNREGISTERED'}
          </p>
        </div>

        {/* Action Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
          <div className="overflow-x-auto min-h-[400px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1CADA3]"></div>
              </div>
            ) : payoutData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Inbox className="w-12 h-12 mb-2 opacity-20" />
                <p>No records found</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-100 uppercase text-[11px] font-bold text-slate-500 tracking-wider">
                    <th className="px-8 py-5">Payout ID</th>
                    <th className="px-8 py-5">Client Details</th>
                    <th className="px-8 py-5">Product</th>
                    <th className="px-8 py-5">Gross Amount</th>
                    <th className="px-8 py-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {payoutData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-700">{row.payoutId}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-700">{row.clientName}</div>
                        <div className="text-xs text-slate-400 mt-1">{row.leadId}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-medium text-slate-700">{row.product}</div>
                      </td>
                      <td className="px-8 py-6 font-black text-slate-700">
                        ₹{parseFloat(row.grossAmount).toLocaleString('en-IN')}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleView(row.payoutId)}
                            className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                            title="View Note"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadImage(row.payoutId)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#2076C7] text-white text-xs font-bold rounded-lg"
                          >
                             Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
              <h3 className="font-bold text-slate-700">Preview Credit Note: {activePayoutId}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadImage(activePayoutId)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2076C7] text-white text-xs font-bold rounded-lg">
                  Download
                </button>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto p-8 bg-slate-100 flex-1">
              <div
                className="shadow-xl mx-auto"
                dangerouslySetInnerHTML={{ __html: modalContent }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}