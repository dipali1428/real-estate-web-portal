"use client";

import DashboardSidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50">
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
