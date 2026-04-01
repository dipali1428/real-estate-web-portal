"use client"

import { motion, AnimatePresence } from "framer-motion"
import { IconCreditCard, IconLoader } from "@tabler/icons-react"
import { X } from "lucide-react"

interface ApplyNowModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    productName?: string
}

const ApplyNowModal = ({ isOpen, onClose, onConfirm, productName }: ApplyNowModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
                    >
                        {/* Header Decoration */}
                        <div className="h-2 w-full bg-linear-to-r from-[#1CADA3] to-[#2076C7]" />
                        
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-linear-to-br from-[#1CADA3]/10 to-[#2076C7]/10 rounded-2xl flex items-center justify-center mb-6 text-[#2076C7]">
                                <IconCreditCard size={40} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">
                                Processing Application
                            </h3>
                            {productName && (
                                <p className="text-[#2076C7] font-bold mb-4 tracking-tight">
                                    {productName}
                                </p>
                            )}
                            
                            <div className="flex items-center gap-3 px-6 py-4 bg-blue-50/50 rounded-2xl border border-blue-100 mb-8 w-full justify-center">
                                <IconLoader className="animate-spin text-[#2076C7]" size={20} />
                                <span className="text-sm font-bold text-[#2076C7] uppercase tracking-widest">
                                    Payment gateway is on process
                                </span>
                            </div>

                            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                                Please wait while we initialize the secure payment environment. Click OK to proceed with your application details.
                            </p>

                            <button
                                onClick={onConfirm}
                                className="w-full py-4 rounded-2xl bg-linear-to-r from-[#1CADA3] to-[#2076C7] text-white font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
                            >
                                OK
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default ApplyNowModal;