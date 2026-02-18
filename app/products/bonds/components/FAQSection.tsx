"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqData } from "../data/faqData";

export default function FAQSection() {
    return (
        <section className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-16">
                        <HelpCircle className="text-[#1CADA3]" size={32} />
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-center">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <Disclosure key={index} as="div" className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                {({ open }) => (
                                    <>
                                        <DisclosureButton className="flex w-full justify-between items-center px-8 py-6 text-left text-lg font-bold text-slate-700 hover:bg-gray-50 transition-colors">
                                            <span>{faq.question}</span>
                                            <ChevronDown
                                                className={`${open ? "rotate-180" : ""
                                                    } h-6 w-6 text-[#2076C7] transition-transform duration-300 ease-in-out`}
                                            />
                                        </DisclosureButton>
                                        <Transition
                                            enter="transition duration-200 ease-out"
                                            enterFrom="transform scale-95 opacity-0"
                                            enterTo="transform scale-100 opacity-100"
                                            leave="transition duration-150 ease-out"
                                            leaveFrom="transform scale-100 opacity-100"
                                            leaveTo="transform scale-95 opacity-0"
                                        >
                                            <DisclosurePanel className="px-8 pb-8 pt-0 text-gray-600 leading-relaxed font-sans text-base">
                                                {faq.answer}
                                            </DisclosurePanel>
                                        </Transition>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
