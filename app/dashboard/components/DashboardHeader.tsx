"use client";

import { motion } from "motion/react";
import { MobileSidebar, SidebarProvider } from "../../component/ui/sidebar";
import { useRouter } from "next/navigation";
import { getSidebarLinks } from "@/app/utils/getSidebarLinks";
import type { Role } from "../../utils/getSidebarLinks";

export default function DashboardHeader({ role }: { role: Role }) {
    const links = getSidebarLinks(role);
    const router = useRouter();

    return (
        <>
            <SidebarProvider>
                <motion.header className="border-b flex items-center justify-between px-4 py-3 shadow-sm bg-white">
                    <MobileSidebar
                        links={links}
                        onNavigate={(href) => router.push(href)}
                    />

                    <h1 className="text-xl font-semibold text-[#2076C7]">
                        Dashboard
                    </h1>
                </motion.header>
            </SidebarProvider>
        </>
    );
}
