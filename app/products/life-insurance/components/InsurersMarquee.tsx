"use client";

import { motion } from "framer-motion";

const partners = [
    { name: "HDFC Life", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/HDFC_Life_logo.svg/200px-HDFC_Life_logo.svg.png", stat: "99.7% CSR" },
    { name: "ICICI Prudential", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/ICICI_Prudential_Life_Insurance_logo.svg/200px-ICICI_Prudential_Life_Insurance_logo.svg.png", stat: "99.2% CSR" },
    { name: "Max Life", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Max_Life_Insurance_logo.svg/200px-Max_Life_Insurance_logo.svg.png", stat: "99.5% CSR" },
    { name: "TATA AIA", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Tata_AIA_Life_logo.svg/200px-Tata_AIA_Life_logo.svg.png", stat: "99.0% CSR" },
    { name: "Bajaj Allianz", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Bajaj_Allianz_Life_Insurance_logo.svg/200px-Bajaj_Allianz_Life_Insurance_logo.svg.png", stat: "98.5% CSR" },
    { name: "Kotak Life", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Kotak_Mahindra_Bank_logo.svg/200px-Kotak_Mahindra_Bank_logo.svg.png", stat: "99.1% CSR" },
    { name: "Aditya Birla", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Aditya_Birla_Group_logo.svg/200px-Aditya_Birla_Group_logo.svg.png", stat: "98.1% CSR" },
    { name: "SBI Life", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/SBI_Life_Insurance_logo.svg/200px-SBI_Life_Insurance_logo.svg.png", stat: "99.4% CSR" },
];

const InsurersMarquee = () => {
    return (
        <section className="py-6 bg-white border-b border-slate-50 overflow-hidden select-none min-h-[160px] flex flex-col justify-center font-sans">
            <div className="container-custom px-6 md:px-10 mx-auto max-w-7xl">
                <p className="text-[10px] font-black text-[#2076C7]/60 uppercase tracking-[0.4em] text-center mb-2">
                    Institutional Partners
                </p>

                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-[1px] w-8 md:w-16 bg-slate-100" />
                    <h3 className="text-sm font-bold text-gray-400 text-center uppercase tracking-widest px-4">
                        Trusted Claims & Service Data
                    </h3>
                    <div className="h-[1px] w-8 md:w-16 bg-slate-100" />
                </div>

                <div className="relative flex overflow-hidden">
                    <motion.div
                        className="flex whitespace-nowrap gap-12 md:gap-24 py-4"
                        animate={{ x: [0, -2500] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 50,
                                ease: "linear",
                            },
                        }}>
                        {[...partners, ...partners, ...partners].map((partner, idx) => (
                            <div
                                key={`${partner.name}-${idx}`} // ✅ improved key
                                className="flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 group/item px-4 border-r border-slate-50 last:border-0">
                                <div className="h-8 md:h-10 flex items-center justify-center mb-1">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-full w-auto object-contain grayscale group-hover/item:grayscale-0 transition-all duration-500 opacity-60 group-hover/item:opacity-100"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = "none";
                                            const fallback = target.nextElementSibling as HTMLElement;
                                            if (fallback) fallback.classList.remove("hidden");
                                        }}
                                    />
                                    <span className="hidden text-xs font-black text-[#2076C7] uppercase tracking-tighter">
                                        {partner.name}
                                    </span>
                                </div>

                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover/item:text-[#2076C7] transition-colors">
                                        {partner.name}
                                    </span>
                                    <span className="text-[8px] font-bold bg-[#1CADA3]/10 text-[#1CADA3] px-2 py-0.5 rounded-full tracking-tighter shadow-sm group-hover/item:bg-[#1CADA3] group-hover/item:text-white transition-all duration-500">
                                        {partner.stat}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <div className="absolute top-0 left-0 w-12 md:w-24 h-full bg-linear-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-12 md:w-24 h-full bg-linear-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default InsurersMarquee;
