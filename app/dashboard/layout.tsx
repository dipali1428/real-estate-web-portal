"use client";

import DashboardSidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50">

            {/* 🔥 Global Dashboard Toast */}
            <Toaster position="top-right" />

            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Section */}
            <div className="flex-1 flex flex-col">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
