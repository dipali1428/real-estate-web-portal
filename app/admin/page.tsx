'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AdminService } from '../services/adminService';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UserProfile {
    id: number;
    adv_id: string;
    name: string;
    email: string;
    mobile: string;
    city: string;
    head: string;
    category: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const hasFetched = useRef(false);

    // ✅ Fetch profile data from API
    useEffect(() => {

        // Hit API Once
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchProfile = async () => {
            try {
                const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
                if (!token) return router.push("/");
                setLoading(true);

                const data = await AdminService.getAdminProfile();
                setUser(data.user);

            } catch (error: any) {
                console.error("Profile fetch error:", error);
                toast.error("Failed to fetch profile.");
                // 🔥 If backend says token expired → logout user
                if (error?.response?.status === 401) {

                    // Show toast for 2 seconds
                    toast.error("Login session expired! Please login again.", {
                        duration: 2000,
                    });

                    document.cookie = `authToken=; path=/; expires=${new Date(0).toUTCString()}`;

                    setTimeout(() => {
                        router.push("/");
                    }, 500);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // token check 
    useEffect(() => {
        const cookie = document.cookie.includes("authToken=");
        if (!cookie) router.push("/");
    }, []);

    if (loading || !user)
        return (
            <div className="flex justify-center items-center h-[60vh] text-[#1CADA3]">
                Loading profile...
            </div>
        );

    return (
        <div className="flex-1 p-4 sm:p-6">
            {/* Dashboard Header */}
            <section className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">

                    </div>
                </div>

                {/* Welcome Message */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">
                        {loading ? "Loading..." : `Welcome back, ${user?.name || "Partner"}.`}
                    </h2>
                    <p className="text-sm sm:text-base mb-4">Here&apos;s a snapshot of your business performance.</p>
                </motion.div>
            </section>
        </div>
    );
}