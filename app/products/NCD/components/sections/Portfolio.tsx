
import {
    Target,
    Download
} from 'lucide-react';
import { useModal } from '../../../../context/ModalContext';

// 1. Define the Profile interface to fix "implicit any" errors
interface Profile {
    name: string;
    age: string;
    desc: string;
    allocation: string;
}

const profiles: Profile[] = [
    {
        name: 'Conservative',
        age: '50+',
        desc: 'Focus on capital preservation and steady monthly income with maximum safety.',
        allocation: '70% AAA Rated NCDs, 20% AA+ Rated, 10% Cash/Liquid'
    },
    {
        name: 'Moderate',
        age: '35-50',
        desc: 'A balanced approach seeking higher yields while maintaining a high credit profile.',
        allocation: '50% AAA Rated NCDs, 40% AA Rated, 10% AA- Rated'
    },
    {
        name: 'Aggressive',
        age: '25-35',
        desc: 'Maximizing returns by capturing higher yields in shorter duration papers.',
        allocation: '30% AAA Rated NCDs, 40% AA Rated, 30% AA- Rated'
    }
];

const Portfolio = () => {
    const { openLogin } = useModal();

    const handleDownloadStrategy = (name: string) => {
        openLogin();
    };

    return (
        <section className="py-12 md:py-16 bg-white font-sans px-4 sm:px-6 lg:px-8" id="portfolio">
            <div className="container-custom max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Investment Portfolios
                    </h2>

                    <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                        Tailored NCD investment strategies based on your risk appetite and financial goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {profiles.map((p: Profile, idx: number) => (
                        <div
                            key={idx}
                            className="bg-white p-6 sm:p-8 rounded-[2.25rem] md:rounded-[2.5rem] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-12px_rgba(28,173,163,0.15)] transition-all duration-500 flex flex-col h-full group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="bg-[#1CADA3]/10 text-[#1CADA3] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                    {p.name}
                                </div>
                                <div className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                                    Age: {p.age}
                                </div>
                            </div>

                            <p className="text-slate-500 font-medium mb-8 leading-relaxed border-l-4 border-[#1CADA3]/20 pl-4 py-1">
                                "{p.desc}"
                            </p>

                            <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-gray-100 transition-colors group-hover:bg-[#F0F9F8]">
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] block mb-3">
                                    Suggested Allocation
                                </span>
                                <div className="font-extrabold text-slate-800 leading-tight">
                                    {/* Typed parameters (part: string, i: number) fix 7006 errors */}
                                    {p.allocation.split(',').map((part: string, i: number) => (
                                        <span key={i} className="block mb-1 last:mb-0">
                                            {part.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                suppressHydrationWarning={true}
                                onClick={() => handleDownloadStrategy(p.name)}
                                className="mt-auto w-full py-4 bg-white text-[#1CADA3] font-extrabold rounded-2xl border-2 border-[#1CADA3]/10 flex items-center justify-center gap-2 hover:bg-[#1CADA3] hover:text-white hover:border-[#1CADA3] transition-all duration-300 shadow-sm"
                            >
                                <span>Get Strategy Details</span>
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default Portfolio;