'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "Who can subscribe to NPS?",
        answer: "Any individual citizen of India (both resident and Non-resident) in the age group of 18-70 years (as on the date of submission of NPS application) can join NPS."
    },
    {
        question: "What are the tax benefits in NPS?",
        answer: "NPS offers tax benefits under Section 80CCD(1) within the overall ceiling of Rs. 1.5 lakh under Sec 80C. Additionally, an exclusive tax benefit for investment up to Rs. 50,000 is available u/s 80CCD(1B)."
    },
    {
        question: "Can I withdraw from NPS before 60?",
        answer: "Yes, partial withdrawal is allowed for specific purposes like higher education of children, marriage of children, purchase/construction of residential house, and treatment of critical illnesses, subject to certain conditions."
    },
    {
        question: "How is the annuity amount decided?",
        answer: "At the time of exit/retirement, at least 40% of the accumulated corpus must be utilized to purchase an annuity from an ASP. The remaining 60% can be withdrawn as a tax-free lump sum."
    },
    {
        question: "Is it mandatory to contribute every month?",
        answer: "No, there is no mandate for monthly contributions. However, a minimum contribution of Rs. 1,000 per financial year is required to keep the account active."
    }
];

export default function FAQ() {
    return (
        <section id="faq" className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm pb-2">
                        Frequently Asked Questions
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                    <p className="mt-4 text-slate-800">
                        Have questions about National Pension System? We have answers.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Disclosure key={index} as="div" className="border border-gray-200 rounded-lg">
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-left text-lg font-medium text-gray-900 bg-white hover:bg-gray-50 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                                        <span>{faq.question}</span>
                                        <ChevronDown
                                            className={`${open ? 'transform rotate-180' : ''
                                                } w-5 h-5 text-gray-500 transition-transform duration-200`}
                                        />
                                    </Disclosure.Button>
                                    <Transition
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Disclosure.Panel className="px-4 pb-4 text-slate-800 leading-relaxed">
                                            {faq.answer}
                                        </Disclosure.Panel>
                                    </Transition>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </div>
            </div>
        </section>
    );
}
