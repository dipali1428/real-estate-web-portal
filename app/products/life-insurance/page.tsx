"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import LifeProductGrid from "./components/LifeProductGrid";
import TopPlansComparison from "./components/TopPlansComparison";
import RecommendedPlansGraph from "./components/RecommendedPlansGraph";
import InsurersMarquee from "./components/InsurersMarquee";
import TopRecommendedPlans from "./components/TopRecommendedPlans";
import WealthAnalysis from "./components/WealthAnalysis";
import ClaimProcess from "./components/ClaimProcess";
import EligibilityDocs from "./components/EligibilityDocs";
import TrustSection from "./components/TrustSection";
import TermCalculator from "./components/TermCalculator";
import FAQSection from "./components/FAQSection";
// Remove Reveal import since we're not using it
// import Reveal from "./components/Reveal";

import { motion, MotionConfig } from "framer-motion";

export default function LifeInsurancePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Ensure body is scrollable
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, []);

    // Prevent hydration mismatch
    if (!mounted) return null;

    return (
        <MotionConfig transition={{ type: "spring", stiffness: 100, damping: 20 }}>
  <main className="bg-white min-h-screen overflow-visible font-sans">
    <Hero />

    <div className="w-full">
      <TermCalculator />
    </div>

    <div className="w-full">
      <WealthAnalysis />
    </div>

    <div className="w-full">
      <TopRecommendedPlans />
    </div>

    <div className="w-full">
      <TopPlansComparison />
    </div>

    <div className="w-full">
      <LifeProductGrid />
    </div>

    <div className="space-y-0">
      <div className="w-full">
        <EligibilityDocs />
      </div>

      <div className="w-full">
        <TrustSection />
      </div>

      <div className="w-full">
        <ClaimProcess />
      </div>

      <InsurersMarquee />
    </div>

    <div className="w-full">
      <FAQSection />
    </div>

    <div className="w-full">
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-16 shadow-2xl rounded-3xl relative overflow-hidden bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-6"
            >
              Ready to protect your family's future?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-10 leading-relaxed font-light"
            >
              Join elite families who choose professional protection over generic
              plans. Let's build a legacy that lasts forever.
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() =>
                  document
                    .getElementById("calculator")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-[#2076C7] hover:bg-white/90 px-12 py-4 rounded-xl font-bold transition-all inline-flex items-center justify-center text-xl shadow-lg"
              >
                Calculate My Premium
              </button>

              <a
                href="mailto:info@infinityarthvishva.com"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-12 py-4 rounded-xl font-bold transition-all inline-flex items-center justify-center text-xl"
              >
                Talk to an Expert
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  </main>
</MotionConfig>
    );
}