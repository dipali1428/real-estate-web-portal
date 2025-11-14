// DashboardHeader.tsx
"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function DashboardHeader() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/"); // redirect to home
    };

    return (
        <header className="border-b text-[#1CADA3]  flex items-center justify-between px-6 py-4 shadow-sm">
            <h1 className="text-lg font-semibold text-[#2076C7]">Dashboard</h1>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2076C7]">
                <LogOut size={18} />
                Logout
            </button>
        </header>
    );
}
