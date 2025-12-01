"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../component/ui/sidebar";
import { cn } from "../lib/utils";
import {
  LayoutDashboard,
  User,
  LogOut,
  Briefcase,
  Megaphone,
  Download,
  Users,
  HelpCircle,
  HandCoins,
  UserCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Lead Management",
      href: "/dashboard/leadmanagement",
      icon: <UserCheck className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Client Portfolio",
      href: "/dashboard/clientPortfolio",
      icon: <Briefcase className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Incentives & Payouts",
      href: "/dashboard/incentives",
      icon: <HandCoins className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Marketing Campaigns",
      href: "/dashboard/marketing",
      icon: <Megaphone className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Downloads",
      href: "/dashboard/pdf-download",
      icon: <Download className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Relationship Manager",
      href: "/dashboard/relationshipManager",
      icon: <Users className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Help & Support",
      href: "/dashboard/helpSupport",
      icon: <HelpCircle className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
  ];

  const handleLogout = () => {
    document.cookie = "authToken=; path=/; max-age=0; SameSite=Lax";
    router.push("/");
  };

  return (
    <div className={cn("flex h-full flex-col border-r border-neutral-300 dark:border-neutral-300")}>
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          {/* Logo Section */}
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto bg-gray-100">
            <Logo />

            <div className="mt-8 flex flex-col gap-1">
              {links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => router.push(link.href)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md transition-all text-left",
                    pathname === link.href
                      ? "bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white"
                      : "hover:bg-[#60b2ff9c] text-gray-700"
                  )}>
                  {link.icon}
                  <motion.span
                    animate={{
                      opacity: open ? 1 : 1,
                      display: "inline-block",
                    }}
                    className="text-sm">
                    {link.label}
                  </motion.span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div>
            <SidebarLink
              link={{
                label: "Logout",
                href: "/",
                icon: <LogOut className="h-5 w-5 text-neutral-800" />,
                onClick: handleLogout
              }}
              className="text-red-600"
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <img
      src="/logo.png"
      alt="Infinity Arthviksha Logo"
      className="h-17 w-auto object-contain"
    />
  );
};
