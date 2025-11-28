'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DashboardService } from "@/app/services/dashboardService";
import toast from 'react-hot-toast';
import TicketSummaryCard from "./TicketSummaryCard";

const HelpSupportPage: React.FC = () => {
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: '',
    description: ''
  });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<any>(null);
  const [loadingTickets, setLoadingTickets] = useState(true);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchTickets = async () => {
      try {
        const result = await DashboardService.getMyTickets();
        if (result.tickets.length > 0) {
          setSubmittedTicket(result.tickets[0]); // show latest ticket 
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoadingTickets(false); // <-- VERY IMPORTANT
      }
    };

    fetchTickets();
  }, []);


  const faqs = [
    {
      question: "How do I update my contact information?",
      answer: "You can update your contact information in the 'My Profile' section. Go to Profile > Personal Details and edit your information."
    },
    {
      question: "When are incentive payouts processed?",
      answer: "Incentive payouts are processed on the 15th of each month for policies issued in the previous month."
    },
    {
      question: "How can I download my commission statement?",
      answer: "Commission statements are available in the 'Incentives & Payouts' section. You can download them from the Incentive History table."
    },
    {
      question: "How do I add a new lead?",
      answer: "Navigate to the 'Lead Management' section and click the 'Add New Lead' button. You can then select the relevant product category and fill in the potential client's details. Please note that currently, you can only add referral leads through the platform."
    },
    {
      question: "What do the different lead statuses (New, Contacted, Follow-up, Converted) mean?",
      answer: "These statuses help you track your pipeline. 'New' is a freshly added lead. 'Contacted' means you've made initial contact. 'Follow-up' indicates a future action is needed. 'Converted' means the lead has successfully become a client."
    },
    {
      question: "A lead's contact information has changed. How can I update it?",
      answer: "You can edit a lead's details from the 'All Leads' table in the 'Lead Management' section. Click on the action menu (likely represented by three dots or an edit icon) next to the relevant lead to update their information."
    },
    {
      question: "Why can't I see any clients in my 'My Client Portfolio' section?",
      answer: "The 'My Client Portfolio' will only show clients after you have converted leads. If you have just started, ensure you are updating your lead statuses to 'Converted.' Also, check if you have any active filters (like Category or Product) applied that might be hiding your clients."
    },
    {
      question: "Where can I see the detailed payout structure for different products?",
      answer: "The complete payout structure, including commission rates for various insurance and loan products, is available for download in the 'Downloads' section under the 'Payout Structure' category."
    },
    {
      question: "The status for my incentive is 'Processing.' What does this mean?",
      answer: "The 'Processing' status means your commission for that transaction has been approved and the finance team is in the process of releasing the payment. It should move to 'Paid' shortly, typically within the payout schedule."
    },
    {
      question: "How is the 'Pending Commission' in My Client Portfolio calculated?",
      answer: "'Pending Commission' represents the total incentive amount from policies that have been issued but have not yet reached the payout stage in the cycle. It includes commissions that are awaiting the payout processing date."
    },
    {
      question: "How do I use the personalized marketing templates?",
      answer: "Go to the 'Marketing and Campaigns' section, select a template, and click 'Download.' The system will automatically generate a PDF with your name and contact number added below the marketing material, making it ready for you to share."
    },
    {
      question: "Where can I find application forms for specific products?",
      answer: "All necessary application forms and product brochures are available in the 'Downloads' section. You can filter by document type (e.g., 'Application Forms') and product category (e.g., 'Insurance' or 'Loan') to find what you need."
    },
    {
      question: "How do I change my primary business categories (Head Category and Category)?",
      answer: "You can update your specialized business categories from your Profile page. Click on 'Edit' and select the relevant 'Head Category' (e.g., Investment, Protection) and 'Category' to ensure you see the most relevant products and leads."
    },
    {
      question: "How can I schedule a meeting with my Relationship Manager?",
      answer: "You can easily schedule a meeting from the 'My Relationship Manager' section. Click on the 'Schedule Meeting' button under 'Quick Actions' to choose a date and time that works for you."
    },
    {
      question: "I forgot my password. How can I reset it?",
      answer: "On the login screen, click on 'Forgot Password.' You will receive a password reset link on your registered email address. You can also update your password anytime from the 'Update Password' section within your Profile."
    },
    {
      question: "How do I track my business performance?",
      answer: "You can track your business performance through the Dashboard section. It provides a comprehensive overview of your total business volume, active policies, pending follow-ups, client growth, and YTD incentives earned."
    },
    {
      question: "What should I do if a client wants to cancel their policy?",
      answer: "For policy cancellations, please contact your Relationship Manager or raise a support ticket under the 'Commission Related' category. They will guide you through the cancellation process and any impact on your incentives."
    },
    {
      question: "How do I access product training materials?",
      answer: "Product training materials, including brochures and detailed product information, are available in the 'Downloads' section under 'Product Brochures'. You can filter by product category to find specific training resources."
    },
    {
      question: "Can I transfer a lead to another DSA?",
      answer: "Currently, lead transfer functionality is not available on the platform. If you have a lead that would be better handled by another DSA, please contact your Relationship Manager for assistance."
    },
    {
      question: "How do I check my active policy count?",
      answer: "Your active policy count is displayed on the Dashboard under 'Active Policies'. For detailed information, you can also check the 'My Client Portfolio' section which shows all your converted clients and their policy status."
    },
    {
      question: "What is the difference between 'Pending Follow-ups' and 'Overdue' follow-ups?",
      answer: "'Pending Follow-ups' are scheduled actions that are due in the future, while 'Overdue' follow-ups are those that have passed their scheduled date without being completed. The dashboard shows counts for both categories."
    },
    {
      question: "How do I generate performance reports?",
      answer: "Performance reports can be generated from the 'My Client Portfolio' and 'Incentives & Payouts' sections. You can filter data by date range, product category, or status, and export the information for your records."
    },
    {
      question: "What happens if I miss a follow-up deadline?",
      answer: "Missed follow-ups are marked as 'Overdue' in the system. It's important to regularly update follow-up statuses to maintain accurate tracking. Consistent overdue follow-ups may affect your performance metrics."
    },
    {
      question: "How do I update my banking information for payouts?",
      answer: "Banking information updates can be made in the 'My Profile' section under banking details. Please ensure your information is accurate to avoid delays in commission payouts."
    },
    {
      question: "Can I see my year-to-date earnings breakdown?",
      answer: "Yes, your YTD earnings are displayed on the Dashboard, and detailed breakdowns are available in the 'Incentives & Payouts' section where you can filter by date range and view transaction-level details."
    },
    {
      question: "How do I handle client documentation?",
      answer: "Client documentation can be managed through the 'My Client Portfolio' section. Required documents for each client can be uploaded and tracked in the Documents tab within each client's profile."
    },
    {
      question: "What is the process for new product onboarding?",
      answer: "New product onboarding is handled through your Relationship Manager. When new products are available, they will appear in your product categories, and training materials will be provided in the Downloads section."
    },
    {
      question: "How do I check my lead conversion rate?",
      answer: "Your lead conversion rate can be calculated from the 'Lead Management' section by comparing the number of converted leads against total active leads. The system shows both active leads and converted counts for each product category."
    },
    {
      question: "What support is available for technical issues?",
      answer: "For technical issues, you can raise a support ticket under the 'Technical Issue' category. Our support team typically responds within 24 hours. For urgent matters, contact your Relationship Manager directly."
    },
    {
      question: "How do I access compliance guidelines?",
      answer: "Compliance guidelines and regulatory information are available in the 'Downloads' section. You can also raise a 'Compliance Query' support ticket for specific compliance-related questions."
    },
    {
      question: "Can I customize my marketing templates?",
      answer: "Currently, marketing templates are pre-designed but personalized with your contact information. For custom marketing material requests, please contact your Relationship Manager to discuss available options."
    },
    {
      question: "How do I handle client complaints?",
      answer: "For client complaints, please escalate to your Relationship Manager immediately. They are trained to handle complaint resolution and will guide you through the proper channels and documentation required."
    },
    {
      question: "What is the timeline for new lead approval?",
      answer: "New leads are typically approved instantly when added through the platform. However, in some cases, there might be a brief review process which usually takes less than 24 hours."
    },
    {
      question: "How do I check my incentive calculation for a specific policy?",
      answer: "Incentive calculations for specific policies can be viewed in the 'Incentives & Payouts' section. Each transaction shows the product, amount, and status with detailed breakdowns available in the commission statements."
    },
    {
      question: "What happens if a client's policy lapses?",
      answer: "If a client's policy lapses, it will be reflected in your 'Active Policies' count. You should follow up with the client for policy renewal. Lapsed policies may affect your ongoing incentives for that client."
    },
    {
      question: "How do I get support during non-business hours?",
      answer: "For emergency support outside business hours, you can use the 24/7 emergency support line available in the 'My Relationship Manager' section. For non-urgent matters, raise a support ticket which will be addressed on the next business day."
    },
    {
      question: "Can I have multiple product categories active?",
      answer: "Yes, you can have multiple product categories active simultaneously. Your profile allows you to select multiple categories under different head categories (Investment, Protection, Finance) to diversify your business portfolio."
    },
    {
      question: "How do I track my progress towards targets?",
      answer: "Target progress can be tracked through the Dashboard which shows key performance indicators. For detailed target tracking and progress reports, consult with your Relationship Manager who can provide comprehensive performance analytics."
    },
    {
      question: "What is the referral lead policy?",
      answer: "The platform currently only allows adding referral leads. These are leads generated through your personal and professional networks. Cold calling or purchased lead databases are not permitted under our referral policy."
    },
    {
      question: "How do I update my tax information?",
      answer: "Tax information, including PAN details, can be updated in the 'My Profile' section. Ensure your PAN number is correctly entered as it is used for TDS calculations on your incentives."
    },
    {
      question: "What training resources are available for new DSAs?",
      answer: "New DSAs can access comprehensive training materials in the 'Downloads' section, including product brochures, application forms, and process guides. Regular training sessions are also conducted by Relationship Managers."
    },
    {
      question: "How do I handle duplicate leads?",
      answer: "If you encounter duplicate leads, please contact support with the lead IDs. The support team will help merge or remove duplicates to maintain clean data in your lead management system."
    },
    {
      question: "What is the policy on client data privacy?",
      answer: "Client data privacy is strictly maintained in accordance with regulatory requirements. All client information stored on the platform is encrypted and accessible only to authorized personnel. Never share client data outside the platform."
    },
    {
      question: "How do I escalate an urgent client issue?",
      answer: "Urgent client issues should be escalated directly to your Relationship Manager via phone or scheduled meeting. For critical matters, use the emergency support contact available in the 'My Relationship Manager' section."
    },
    {
      question: "Can I access the platform on mobile devices?",
      answer: "Yes, the platform is fully responsive and can be accessed on mobile devices through your web browser. The interface adapts to different screen sizes for optimal usability on smartphones and tablets."
    },
    {
      question: "How do I provide feedback about the platform?",
      answer: "Platform feedback can be submitted through the support ticket system under the 'Other' category. We regularly review feedback to improve the DSA experience and platform functionality."
    }
  ];

  const categories = [
    "Technical Issue",
    "Commission Related",
    "Product Information",
    "Lead Management",
    "Profile Settings",
    "Other"
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let processedValue = value;

    if (name === "subject") {
      processedValue = processedValue.replace(/[0-9]/g, "");

      // Capitalize first letter
      processedValue =
        processedValue.charAt(0).toUpperCase() + processedValue.slice(1).toLowerCase();
    }

    // ✏ Auto-capitalize description (first letter only)
    if (name === "description") {
      processedValue =
        ticketData.description === ""
          ? processedValue.charAt(0).toUpperCase() + processedValue.slice(1)
          : processedValue;
    }

    setTicketData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ticketPayload = {
      category: ticketData.category,
      subject: ticketData.subject,
      description: ticketData.description,
    };

    try {
      const result = await DashboardService.createTicket(ticketPayload);
      toast.success("Ticket raised successfully!")

      setSubmittedTicket(result.ticket);
    } catch (error: any) {
      console.error("Error submitting ticket:", error);

      if (error.response) {
        alert("Failed to submit ticket: " + (error.response.data?.message || "Please try again."));
      } else {
        alert("Failed to submit ticket. Please check your connection.");
      }
    }

    // Reset form
    setTicketData({
      subject: "",
      category: "",
      description: "",
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 lg:p-8 xl:p-12 rounded-lg">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-700 mb-3 sm:mb-4">Help & Support</h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-2 sm:px-0">
            Find answers to frequently asked questions or raise a ticket for dedicated support.
          </p>
        </div>

        {/* Support Ticket Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:p-8 mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-6 sm:mb-8">Raise a Support Ticket</h2>

          {loadingTickets ? (
            <div className="flex justify-center items-center py-10 sm:py-16 lg:py-20">
              <div className="flex flex-col items-center gap-3">
                <p className="text-slate-500 text-sm sm:text-base">Loading...</p>
              </div>
            </div>
          ) : submittedTicket && submittedTicket.status !== "Closed" ? (
            <TicketSummaryCard ticket={submittedTicket} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Category Field */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={ticketData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-400 transition-colors text-slate-700 outline-none text-sm sm:text-base">
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={ticketData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 
                            rounded-lg focus:ring-1 focus:ring-blue-400 transition-colors 
                            text-slate-700 outline-none text-sm sm:text-base"
                  placeholder="Enter the subject of your issue"
                />
              </div>


              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={ticketData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-400  transition-colors resize-vertical text-slate-700 outline-none text-sm sm:text-base"
                  placeholder="Please describe your issue in detail..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base">
                  Submit ticket
                </button>
              </div>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-6 sm:mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow overflow-hidden">
                {/* FAQ Question - Clickable Header */}
                <button
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center outline-none select-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-base sm:text-lg font-medium text-slate-900 pr-3 sm:pr-4 leading-relaxed">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 mt-0.5 ${openFaqIndex === index ? 'transform rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* FAQ Answer - Collapsible Content */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4 pt-1 sm:pt-2 border-t border-slate-100">
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <p className="text-slate-600 text-sm sm:text-base">
            Need immediate assistance? Contact us at{" "}
            <a href="mailto:info@infinityarthvishva.com" className="text-blue-600 hover:text-blue-700 font-medium wrap-break-word">
              info@infinityarthvishva.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default HelpSupportPage;