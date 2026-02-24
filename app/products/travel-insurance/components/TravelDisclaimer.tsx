'use client';

import { motion } from 'framer-motion';

export default function TravelDisclaimer() {
    return (
        <section className="py-8 px-6 bg-[#f8fafc] border-t border-slate-200">
            <div className="max-w-[1440px] mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-slate-500 text-[12px] leading-relaxed text-justify"
                >
                    <p>
                        <span className="font-bold text-slate-700">Disclaimer:</span> The information provided on this website is for general informational purposes only. Details related to the insurance providers, associated entities, and their past experience are indicative in nature and subject to change without prior notice. References to completed claims or upcoming policy features do not constitute any assurance of future performance. Any information regarding coverage, connectivity, infrastructure, or development potential of travel plans is based on current understanding and publicly available sources and may vary over time. Such statements should not be construed as guarantees of future growth or returns. This content does not constitute a legal offer, financial advice, or commitment of any kind. Prospective buyers are advised to independently verify all information with the respective insurance authorities or providers before making any decision.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
