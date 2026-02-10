"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils"; // optional utility (or remove if not using)
import React from "react";

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    delay?: number;
    subtitle?: string;
    color?: string; // blue | green | orange | purple | red
}

const colorMap: Record<string, string> = {
    blue: "from-blue-50 to-blue-100 text-blue-600",
    green: "from-green-50 to-green-100 text-green-600",
    orange: "from-orange-50 to-orange-100 text-orange-600",
    purple: "from-purple-50 to-purple-100 text-purple-600",
    red: "from-red-50 to-red-100 text-red-600",
};

export default function StatsCard({
    title,
    value,
    icon,
    subtitle,
    delay = 0,
    color = "blue",
}: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay }}
            className="rounded-2xl glass-card p-5 shadow-md border border-white/20 backdrop-blur-md 
      hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <h2 className="text-3xl font-bold text-gray-900 mt-1">{value}</h2>
                </div>

                <div
                    className={cn(
                        "p-3 rounded-xl bg-linear-to-br shadow-sm",
                        colorMap[color]
                    )}>
                    {icon}
                </div>
            </div>

            {subtitle && (
                <p className="text-xs text-gray-500 mt-3 border-t border-gray-200 pt-2">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
