"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const creditCardFaqs = [
    {
        question: "How do I apply for a credit card online?",
        answer: "Applying is simple! Just browse through our card collection, compare benefits, and click the 'Contact Us' or 'Call Me Back' button. Our experts will guide you through the 100% digital application process, including Video KYC and E-documentation."
    },
    {
        question: "What are the common documents required for my application?",
        answer: "You typically need: 1. Identity Proof (Aadhaar, PAN, Passport), 2. Address Proof (Utility bills, Voter ID), 3. Income Proof (3 months salary slips, ITR, or Form 16). For banks like Union Bank, you might also need two passport-size photos."
    },
    {
        question: "What is the 'SBI Card Sprint' and how does it work?",
        answer: "SBI Card Sprint is an instant, digital-only application platform. It allows you to complete your application in just 3 easy steps—Personal Details, Professional Details, and KYC—getting you an instant decision on your card approval."
    },
    {
        question: "Does HDFC Bank offer travel-specific rewards?",
        answer: "Yes! HDFC Bank's premium cards (like Regalia or Regalia Gold) allow you to redeem reward points for flights and hotel bookings via the SmartBuy portal at a highly competitive value, often up to 0.50 – 1.00 per point."
    },
    {
        question: "What is the 'Total Security Policy' on IndusInd Bank cards?",
        answer: "This is a unique feature that covers you against unauthorized transactions for an amount equal to your credit limit in case of card loss or theft, giving you complete peace of mind."
    },
    {
        question: "Can I get a Kotak Credit Card without income proof?",
        answer: "Yes, the 'Kotak 811 Dream Different' card is an FD-backed credit card. It requires no income proof or credit history and is issued against a Fixed Deposit of as low as ₹10,000 with a 90% credit limit."
    },
    {
        question: "Does Union Bank of India offer cards for family members?",
        answer: "Yes, Union Bank allows primary cardholders to take 'Add-on' cards for siblings, parents, spouse, or children (above 18 years). These cards share the primary account's limit while offering separate tracking."
    },
    {
        question: "What is the interest-free period on credit cards?",
        answer: "Most credit cards offer an interest-free period of 20 to 50 days (sometimes up to 55 days for Union Bank cards). This applies if you pay your total outstanding balance in full by the due date."
    },
    {
        question: "How is my credit limit determined?",
        answer: "Banks like ICICI and Axis determine your credit limit based on your take-home income, current debt-to-income ratio, and your CIBIL score. Disciplined usage for 6-12 months often leads to automatic limit increase offers."
    },
    {
        question: "What are the movie benefits on Axis Bank cards?",
        answer: "Many Axis cards (like Axis My Zone) offer a 'Buy One Get One' (BOGO) offer on movie tickets through BookMyShow, allowing you to save up to ₹200 on your second ticket once per month."
    },
    {
        question: "Does AU Bank provide interest on my credit card balance?",
        answer: "AU Bank is unique for its monthly interest benefits on specific card categories, particularly when linked to their savings accounts, and they are known for customizable reward programs based on your spending habits."
    },
    {
        question: "How do I redeem my ICICI Bank reward points?",
        answer: "ICICI points can be redeemed for a variety of vouchers (Amazon, Flipkart, etc.), products from their rewards catalogue, or even as cash back against your statement through the iMobile app or internet banking."
    },
    {
        question: "What happens if I make a late payment on my SBI Card?",
        answer: "Late payments attract a 'Late Payment Fee' based on your outstanding amount and finance charges (interest) at current rates. It also negatively impacts your CIBIL score, which can affect future loan eligibility."
    },
    {
        question: "Are IDFC First Bank credit cards always lifetime free?",
        answer: "IDFC First Bank is pioneer in offering 'Lifetime Free' (LTF) credit cards with no joining or annual fees across several card variants (like Millennia, Classic, and Select) without any hidden terms."
    },
    {
        question: "Can I use my Union Bank card internationally?",
        answer: "Yes, all Union Bank cards (Visa/Mastercard/JCB) can be enabled for international usage through the Union Vyom app. Some premium cards like Nexteria Metal also offer lower foreign markup fees."
    },
    {
        question: "How does the 'Cash Advance' facility work in Kotak?",
        answer: "Kotak rewards cards allow you to withdraw cash from ATMs. While most banks charge interest from day 1, certain Kotak variants offer an interest-free cash withdrawal period for up to 48 days (only a flat processing fee applies)."
    },
    {
        question: "What is the benefit of a RuPay Credit Card on UPI?",
        answer: "RuPay credit cards from banks like HDFC, Axis, and Kotak can be linked to UPI apps (like BHIM, GPay, PhonePe). This allows you to pay merchants directly from your credit card limit by scanning any QR code."
    },
    {
        question: "How can I improve my chances of credit card approval?",
        answer: "To improve approval chances: 1. Maintain a CIBIL score of 750+, 2. Ensure your debt-to-income ratio is low, 3. Avoid multiple card applications in a short period, and 4. Keep your Aadhaar linked with your current mobile number."
    },
    {
        question: "Is Video KYC mandatory for all new credit card applications?",
        answer: "Most modern banks (SBI, ICICI, HDFC) now use Video KYC as a faster alternative to physical verification. It is a 5-minute process where you show your original PAN card to a bank officer over a secure video call."
    },
    {
        question: "What is a 'Joining Fee' vs 'Annual Fee'?",
        answer: "The Joining Fee is a one-time charge paid in the first month. The Annual Fee is a recurring charge paid every year. Many cards waiver the annual fee if you spend above a certain limit (e.g., ₹1 Lakh) in the previous year."
    },
    {
        question: "Can I convert high-value purchases into EMIs with IndusInd Bank?",
        answer: "Yes, IndusInd offers 'IndusEasyEMI' which allows you to convert any transaction above ₹2,000 into flexible EMIs of 6 to 36 months at the time of purchase or through their mobile app later."
    },
    {
        question: "How do cashback cards differ from reward points cards?",
        answer: "Cashback cards (like Flipkart Axis) credit money directly to your card statement or as vouchers. Reward points (like SBI Prime) give you points that can be used to buy products or services from a bank-specific catalogue."
    },
    {
        question: "How secure are contactless 'Tap & Pay' transactions?",
        answer: "Contactless cards are highly secure as they use encrypted technology. In India, transactions up to ₹5,000 can be done without a PIN, but you can always disable this feature or set lower limits via your bank app for extra safety."
    },
    {
        question: "What should I do if my credit card application is rejected?",
        answer: "If rejected, wait for at least 6 months before reapplying. Check your CIBIL report for errors, pay off existing debts, and consider applying for a secured card (against FD) to build your credit profile first."
    },
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white font-sans">
            <div className="max-w-[1440px] mx-auto px-6 py-16 lg:py-24">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto text-xl md:text-1xl">
                             Got questions? We have answers. Explore commonly asked questions about our credit card products.
                        </p>
                </div>

                <div className="space-y-4">
                    {(showAllFaqs ? creditCardFaqs : creditCardFaqs.slice(0, 5)).map((faq, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-md" >
                            <button onClick={() => toggleFAQ(idx)} className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group" >
                                <span className={`font-bold text-base sm:text-lg pr-2 transition-colors ${activeIndex === idx ? 'text-[#2076C7]' : 'text-gray-700 group-hover:text-[#2076C7]'}`}>{faq.question}</span>
                                <div className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 shrink-0 ${activeIndex === idx ? 'rotate-180' : ''}`}>
                                    {activeIndex === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                </div>
                            </button>
                            {activeIndex === idx && ( <div className="px-6 py-3 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100">{faq.answer}</div> )}
                        </div>
                    ))}
                </div>

                {creditCardFaqs.length > 5 && (
                    <div className="text-center mt-8">
                        <button onClick={() => setShowAllFaqs(!showAllFaqs)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 text-[#2076C7] font-semibold hover:bg-blue-100 transition-colors cursor-pointer" >
                            {showAllFaqs ? 'View Less' : 'View More'}
                            <Plus size={18} className={`transition-transform duration-300 ${showAllFaqs ? 'rotate-45' : ''}`} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
