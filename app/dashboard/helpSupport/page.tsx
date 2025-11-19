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
    }
  ];

  const categories = [
    "Technical Issue",
    "Commission Related",
    "Product Information",
    "Complience Query",
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
      <div className="max-w-6xl mx-auto bg-white p-12 rounded-lg">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-700 mb-4">Help & Support</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find answers to frequently asked questions or raise a ticket for dedicated support.
          </p>
        </div>

        {/* Support Ticket Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
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
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-500"
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
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-500"
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
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical text-slate-600"
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
        <div className="mb-16 mt-16">
          <h2 className="text-2xl font-semibold text-slate-700 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
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