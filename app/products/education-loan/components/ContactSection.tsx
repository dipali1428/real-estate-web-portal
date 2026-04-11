"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import { useModal } from "../../../context/ModalContext";

export default function ContactSection() {
  const { openLogin } = useModal();

  return (
    <>
      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <section className="bg-linear-to-r from-teal-600 to-teal-500 text-white py-16 font-sans">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-8 bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent tracking-tight leading-tight">
              Ready to Fund Your <br className="hidden md:block" />
              Dream Degree?
            </h2>
            <p className="text-white/80 font-bold text-lg max-w-3xl mx-auto leading-relaxed">
              Apply now for a free eligibility check. Our education loan expert
              will contact you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={openLogin}
                className="group flex items-center justify-center gap-3 px-10 py-4 bg-white text-teal-600 rounded-xl font-extrabold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto"
              >
                Apply for Education Loan
                <IconArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <Link
                href="/#contact"
                className="flex items-center justify-center gap-1 px-10 py-4 border-2 border-white/40 text-white rounded-xl font-extrabold text-base hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
              >
                Talk to an Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
