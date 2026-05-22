import DashboardSidebar from "../component/Sidebar";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import { Toaster } from "react-hot-toast";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  
    const role = "ACCOUNTS";

    return (
        <div className="flex h-screen bg-gray-50">

            <Toaster position="top-right" />

            {/* Responsive Sidebar */}
            <div className="hidden md:block">
                <DashboardSidebar role={role} />
            </div>

            {/* Main Section */}
            <div className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden max-md:pl-0">
                <DashboardHeader role={role} />
                <main className="flex-1 overflow-y-auto max-h-screen font-sans">
                    {children}
                </main>
            </div>
        </div>
    );
}
