import { cloneElement } from "react";
import { PieChart, TrendingUp, Search, Shield, Coins } from "lucide-react";

const HeroGraphic = () => {
    // Config for Mutual Funds
    const config = {
        main: <PieChart />,
        orbs: [<TrendingUp />, <Coins />, <Search />, <Shield />],
        theme: "teal",
        accessory: <TrendingUp />,
        accColor: "emerald"
    };

    const themeColors: any = {
        teal: "from-teal-400 to-teal-600",
        emerald: "from-emerald-500 to-emerald-700",
    };

    const accColors: any = {
        emerald: "from-emerald-500 to-teal-600",
    };

    return (
        <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center select-none">
            {/* Background Pulse Glow */}
            <div className={`absolute w-56 h-56 bg-linear-to-br ${themeColors[config.theme]} opacity-10 rounded-full blur-3xl animate-pulse`}></div>

            {/* Dotted path SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 500 500">
                <path d="M100,250 Q100,100 250,100 T400,250 T250,400 T100,250" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" className="text-gray-400" />
            </svg>

            {/* Floating Satellite Orbs */}
            {[
                { pos: "top-10 left-10 md:top-20 md:left-20", delay: "0s" },
                { pos: "top-0 right-10 md:top-10 md:right-32", delay: "1.5s" },
                { pos: "bottom-10 left-0 md:bottom-20 md:left-10", delay: "3s" },
                { pos: "bottom-0 right-10 md:bottom-10 md:right-20", delay: "4.5s" },
            ].map((style, idx) => (
                <div key={idx} className={`absolute ${style.pos} z-30 animate-float`} style={{ animationDelay: style.delay }}>
                    <div className="bg-white p-3 md:p-4 rounded-full shadow-2xl border border-gray-100 flex items-center justify-center transition-transform hover:scale-110">
                        <div className="text-gray-500">
                            {cloneElement(config.orbs[idx] as React.ReactElement, { size: 24 } as any)}
                        </div>
                    </div>
                </div>
            ))}

            {/* Central Illustration Area */}
            <div className="relative z-20">
                <div className={`w-32 h-32 md:w-48 md:h-48 bg-linear-to-br ${themeColors[config.theme]} rounded-3xl shadow-2xl flex items-center justify-center text-white rotate-6 transition-transform hover:rotate-0 duration-500`}>
                    <div className="-rotate-6">
                        {cloneElement(config.main as React.ReactElement, { size: 70, strokeWidth: 1.5 } as any)}
                    </div>
                </div>

                {/* Dynamic Accessory Circle */}
                <div className={`absolute -bottom-3 -right-3 md:-bottom-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 bg-linear-to-br ${accColors[config.accColor]} rounded-full border-4 md:border-6 border-white shadow-xl flex items-center justify-center animate-bounce`}>
                    {cloneElement(config.accessory as React.ReactElement, { className: "text-white", size: 36 } as any)}
                </div>
            </div>
        </div>
    );
};

export default HeroGraphic;
