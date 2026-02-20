import DashboardSidebar from "../component/Sidebar";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import { Toaster } from "react-hot-toast";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    // const token = (await cookies()).get("authToken")?.value;
    // const decoded: any = token ? jwt.decode(token) : null;
    const role = "UNLISTEDADMIN"; // CORRECTED: All uppercase
    // OR if from decoded token:
    // const role = decoded?.role || "GUEST";

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Toaster position="top-right" />

            <div className="hidden md:block">
                <DashboardSidebar role={role} />
            </div>

            <div className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden">
                <DashboardHeader role={role} />
                <main className="flex-1 overflow-y-auto max-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}