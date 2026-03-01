import React from 'react';
import { Plane, Heart, Home, GraduationCap, Briefcase, ShoppingCart } from 'lucide-react';

const plans = [
    {
        id: 1,
        title: 'Medical Emergency Loan',
        description: 'Instant funds to cover unplanned medical expenses with flexible terms.',
        icon: Heart,
        color: 'bg-teal-50 text-[#1CADA3]',
    },
    {
        id: 2,
        title: 'Wedding Loan',
        description: 'Make your big day stress-free with quick financing up to ₹50 Lakhs.',
        icon: Heart,
        color: 'bg-teal-50 text-[#1CADA3]',
    },
    {
        id: 3,
        title: 'Travel Loan',
        description: 'Finance your dream vacation and return the money in easy EMIs.',
        icon: Plane,
        color: 'bg-teal-50 text-[#1CADA3]',
    },
    {
        id: 4,
        title: 'Home Renovation Loan',
        description: 'Upgrade your living space without compromising on your savings.',
        icon: Home,
        color: 'bg-teal-50 text-[#1CADA3]',
    },
    {
        id: 5,
        title: 'Higher Education',
        description: 'Pursue global education without financial hurdles.',
        icon: GraduationCap,
        color: 'bg-teal-50 text-[#1CADA3]',
    },
    {
        id: 6,
        title: 'Debt Consolidation',
        description: 'Combine all your existing high-interest debts into one easily manageable EMI.',
        icon: Briefcase,
        color: 'bg-teal-50 text-[#1CADA3]',
    },
];

export default function LoanPlans() {
    return (
        <section className="py-16 md:py-24 bg-gray-50 font-sans" id="loan-plans">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                        Personal Loan Plans
                    </h2>
                    <p className="text-gray-600">
                        Whether it's an emergency, a beautiful milestone, or clearing out old debt, Infinity Arthvishva has the right personal loan for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#2076C7]/30 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 \${plan.color} group-hover:scale-110 transition-transform`}>
                                <plan.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{plan.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {plan.description}
                            </p>
                            <button className="text-[#2076C7] font-semibold flex items-center hover:text-[#1CADA3] transition-colors">
                                Know More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
