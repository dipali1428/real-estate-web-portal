import { useState } from 'react';
import {
    Target,
    PieChart as ChartIcon,
    Zap,
    Shield,
    TrendingUp,
    Download
} from 'lucide-react';
import StrategyDetailsContent from './StrategyDetailsContent';
import { strategyDetailsData } from '../../utils/StrategyDetailsData';

// 1. Define the Profile interface to fix "implicit any" errors
interface Profile {
    name: string;
    age: string;
    desc: string;
    allocation: string;
}

// 2. Define data BEFORE the component so 'keyof typeof' works correctly
const strategies = {
    ladder: {
        title: "Laddering Strategy",
        icon: <Target className="w-6 h-6" />,
        description: "Divide your investment across different maturities to balance liquidity and returns."
    },
    bullet: {
        title: "Bullet Strategy",
        icon: <Zap className="w-6 h-6" />,
        description: "Concentrate investments in a specific maturity date to meet a future cash need."
    },
    barbell: {
        title: "Barbell Strategy",
        icon: <TrendingUp className="w-6 h-6" />,
        description: "Invest in short-term and long-term bonds, avoiding the middle range."
    }
};

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
    // 3. State types now reference the objects defined above
    const [activeStrategy, setActiveStrategy] =
        useState<keyof typeof strategies>('ladder');

    const [printProfile, setPrintProfile] = 
        useState<keyof typeof strategyDetailsData.profiles | null>(null);

    const handleDownloadStrategy = (name: string) => {
        // Narrow the string type to the specific keys allowed by strategyDetailsData
        let profileKey: keyof typeof strategyDetailsData.profiles = 'Moderate';
        
        if (name === 'Conservative' || name === 'Moderate' || name === 'Aggressive') {
            profileKey = name as keyof typeof strategyDetailsData.profiles;
        }
        
        setPrintProfile(profileKey);

        // Timeout to allow state to propagate before printing
        setTimeout(() => {
            window.print();
        }, 150);
    };

    return (
        <section className="py-12 bg-white" id="portfolio">
            <div className="container-custom max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                        Investment <span className="text-[#1CADA3]">Portfolios</span>
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

                            <p className="text-slate-500 font-medium mb-8 leading-relaxed italic border-l-4 border-[#1CADA3]/20 pl-4 py-1">
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

            {/* Printable Strategy Details Content - Visible only during printing */}
            {printProfile && (
                <div className="absolute top-0 left-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none print:static print:w-full print:h-auto print:opacity-100 print:visible">
                    <StrategyDetailsContent profileName={printProfile} />
                </div>
            )}
        </section>
    );
};

export default Portfolio;