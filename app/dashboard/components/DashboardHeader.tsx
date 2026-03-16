"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User as UserIcon, LogOut, Settings, UserCircle, ChevronDown } from "lucide-react";
import { MobileSidebar, SidebarProvider } from "../../component/ui/sidebar";
import { useRouter, usePathname } from "next/navigation";
import { getSidebarLinks } from "@/app/utils/getSidebarLinks";
import type { Role } from "../../utils/getSidebarLinks";
// import { NotificationPanel } from "./NotificationPanel";
import { DashboardService } from "@/app/services/dashboardService";


export default function DashboardHeader({ role }: { role: Role }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>(role); // Added state for name, defaulting to role
    const links = getSidebarLinks(role);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Only fetch profile data if the role is DSA
        if (role === "DSA") {
            const fetchImageData = async () => {
                try {
                    const res = await DashboardService.getProfile();
                    // Set the name from profile data
                    if (res.user?.name) {
                        setUserName(res.user.name);
                    }
                    if (res.kycDetails?.profile_image_url) {
                        setProfileImage(`${res.kycDetails.profile_image_url}?t=${Date.now()}`);
                    }
                } catch (error) {
                    console.error("Failed to load header profile data", error);
                }
            };
            fetchImageData();
        }
    }, [role]);

    const getActiveLabel = (items: any[]): string => {
        for (const item of items) {
            if (item.href === pathname) return item.label;
            if (item.children) {
                const childLabel = getActiveLabel(item.children);
                if (childLabel !== "Dashboard") return childLabel;
            }
        }
        return "Dashboard";
    };

    const handleLogout = () => {
        document.cookie = "authToken=; path=/; max-age=0; SameSite=Lax";
        router.push("/");
    };

    const activeLabel = getActiveLabel(links);
    const userId = "user_12345";

    return (
        <SidebarProvider>
            <motion.header className="border-b flex items-center justify-between px-4 sm:px-6 py-3 shadow-sm bg-white relative z-50">
                {/* Left */}
                <div className="flex items-center gap-4">
                    <MobileSidebar
                        links={links}
                        onNavigate={(href) => router.push(href)}
                    />
                    <h1 className="text-lg sm:text-xl font-bold text-[#2076C7]">
                        {activeLabel}
                    </h1>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* <NotificationPanel /> */}

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors group"
                        >
                            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#2076C7] rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform overflow-hidden border border-slate-100">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UserIcon size={20} />
                                )}
                            </div>
                            <div className="hidden sm:flex flex-col items-start leading-tight">
                                {/* Changed {role} to {userName} */}
                                <span className="text-sm font-semibold text-gray-700"></span>
                            </div>
                            <ChevronDown size={14} className={`text-gray-400 transition-transform hidden sm:block ${isProfileOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-20"
                                    >
                                        {/* <div className="px-4 py-3 border-b border-gray-100">
                                            <span className="block text-sm font-medium text-gray-900">{userName}</span>
                                            <span className="block text-xs text-gray-500">{role}</span>
                                        </div> */}
                                        {/* <div className="hidden sm:flex flex-col items-start leading-tight pl-2 m-2 bg-green-50">
                                            <span className="text-sm font-semibold text-gray-700">{userName}</span>
                                        </div> */}
                                        <button
                                            onClick={() => {
                                                // Redirect to /dashboard/profile if role is DSA, otherwise use role-based path
                                                const targetPath = role === "DSA" ? "/dashboard/profile" : `/${role.toLowerCase()}/profile`;
                                                router.push(targetPath);
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <UserCircle size={18} className="text-gray-400" />
                                            My Profile
                                        </button>
                                        {/* <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                            <Settings size={18} className="text-gray-400" />
                                            Account Settings
                                        </button> */}
                                        <div className="border-t border-gray-100 my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut size={18} />
                                            Sign Out
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.header>
        </SidebarProvider>
    );
}