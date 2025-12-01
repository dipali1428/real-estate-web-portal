"use client";

import DashboardSidebar from "../component/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50">

            <Toaster position="top-right" />

            {/* Responsive Sidebar */}
            <div className="hidden md:block">
                <DashboardSidebar />
            </div>

            {/* Main Section */}
            <div className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden max-md:pl-0">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto max-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
