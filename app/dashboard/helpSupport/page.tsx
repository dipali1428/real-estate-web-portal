'use client';
import React, { useState } from 'react';

const HelpSupportPage: React.FC = () => {
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: '',
    description: ''
  });

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
      answer: "The complete payout structure, including commission rates for various insurance and loan products, is available for download in the 'Downloads' section under the '💰 Payout Structure' category."
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
    }
  ];

  const categories = [
    "Technical Issue",
    "Commission Related",
    "Product Information",
    "Lead Management",
    "Client Portfolio",
    "Marketing Templates",
    "Profile Settings",
    "Compliance Query",
    "Other"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicketData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission logic here
    console.log('Ticket submitted:', ticketData);
    alert('Support ticket submitted successfully!');
    
    // Reset form
    setTicketData({
      subject: '',
      category: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white p-12 rounded-lg">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-700 mb-4">Help & Support</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find answers to frequently asked questions or raise a ticket for dedicated support.
          </p>
        </div>

        {/* Support Ticket Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-16">
          <h2 className="text-2xl font-semibold text-slate-700 mb-8">Raise a Support Ticket</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={ticketData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-700"
                placeholder="Enter the subject of your issue"
              />
            </div>

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
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-700"
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
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
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical text-slate-700"
                placeholder="Please describe your issue in detail..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit ticket
              </button>
            </div>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-slate-700 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Need immediate assistance? Contact us at{" "}
            <a href="mailto:info@infinityarthvishva.com" className="text-blue-600 hover:text-blue-700 font-medium">
              info@infinityarthvishva.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;