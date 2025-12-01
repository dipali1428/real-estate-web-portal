"use client";

import { motion } from "motion/react";
import { MobileSidebar, SidebarProvider } from "../../component/ui/sidebar";
import { useRouter } from "next/navigation";

import {
    LayoutDashboard,
    User,
    UserCheck,
    Briefcase,
    HandCoins,
    Megaphone,
    Download,
    Users,
    HelpCircle,
} from "lucide-react";

export default function DashboardHeader() {
    const router = useRouter();

    const links = [
        { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
        { label: "Profile", href: "/dashboard/profile", icon: <User /> },
        { label: "Lead Management", href: "/dashboard/leadmanagement", icon: <UserCheck /> },
        { label: "Client Portfolio", href: "/dashboard/clientPortfolio", icon: <Briefcase /> },
        { label: "Incentives & Payouts", href: "/dashboard/incentives", icon: <HandCoins /> },
        { label: "Marketing Campaigns", href: "/dashboard/marketing", icon: <Megaphone /> },
        { label: "Downloads", href: "/dashboard/pdf-download", icon: <Download /> },
        { label: "Relationship Manager", href: "/dashboard/relationshipManager", icon: <Users /> },
        { label: "Help & Support", href: "/dashboard/helpSupport", icon: <HelpCircle /> },
    ];


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
