// "use client";

// import { cookies } from "next/headers";
import DashboardSidebar from "../component/Sidebar";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import { Toaster } from "react-hot-toast";
// import jwt from "jsonwebtoken";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    // Only determine role on server
    // const token = (await cookies()).get("authToken")?.value;
    // const decoded = token ? jwt.decode(token) as any : null;
    const role = "BRANCHHEAD";

    return (
        <div className="flex h-screen bg-gray-50 font-sans">

            <Toaster position="top-right" />

            {/* Responsive Sidebar */}
            <div className="hidden md:block">
                <DashboardSidebar role={role} />
            </div>

            {/* Main Section */}
            <div className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden max-md:pl-0">
                <DashboardHeader role={role} />
                <main className="flex-1 overflow-y-auto max-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
