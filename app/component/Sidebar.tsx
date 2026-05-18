"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../component/ui/sidebar";
import { cn } from "../lib/utils";
import { LogOut, ChevronDown, ChevronRight, Smartphone } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { getSidebarLinks, Role } from "../utils/getSidebarLinks";

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

// Helper component for the Toggle
const PlatformToggle = ({
  platform,
  setPlatform
}: {
  platform: "android" | "ios",
  setPlatform: (p: "android" | "ios") => void
}) => (
  <div className="flex bg-gray-200 p-1 rounded-lg mb-3 mx-2">
    <button
      onClick={() => setPlatform("android")}
      className={cn(
        "flex-1 flex items-center justify-center gap-1 py-1 text-[10px] font-bold rounded-md transition-all",
        platform === "android" ? "bg-white shadow-sm text-black" : "text-gray-500"
      )}
    >
      <Smartphone size={12} /> Android
    </button>
    <button
      onClick={() => setPlatform("ios")}
      className={cn(
        "flex-1 flex items-center justify-center gap-1 py-1 text-[10px] font-bold rounded-md transition-all",
        platform === "ios" ? "bg-white shadow-sm text-black" : "text-gray-500"
      )}
    >
      <Smartphone size={12} /> iOS
    </button>
  </div>
);

export default function DashboardSidebar({ role }: { role: Role }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  // New state for platform
  const [platform, setPlatform] = useState<"android" | "ios">("android");

  const links = getSidebarLinks(role) as SidebarItem[];

  const handleLogout = () => {
    document.cookie = "authToken=; path=/; max-age=0; SameSite=Lax";
    router.push("/");
  };

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  const renderLinks = (items: SidebarItem[], level = 0, parentKey = "") => {
    return items.map((item, index) => {
      const key = `${parentKey}-${index}`;
      const hasChildren = item.children && item.children.length > 0;
      const active = isActive(item.href);
      const isExpanded = expanded[key];

      return (
        <div key={key}>
          <button
            onClick={() => {
              if (hasChildren) {
                toggleExpand(key);
              } else if (item.href) {
                router.push(item.href);
              }
            }}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2 rounded-md transition-all text-left",
              active
                ? "bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white"
                : "hover:bg-[#60b2ff9c] text-gray-700"
            )}
            style={{ paddingLeft: `${level * 16 + 12}px` }}>
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>

            {hasChildren && (
              <span>
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            )}
          </button>

          {hasChildren && isExpanded && (
            <div className="flex flex-col gap-1 mt-1">
              {renderLinks(item.children!, level + 1, key)}
            </div>
          )}
        </div>
      );
    });
  };

  // Helper to determine QR paths
  const getQRData = () => {
    if (role === "DSA") {
      return {
        qr: platform === "android" ? "/QR/IVishva_Play_Store_QR.jpeg" : "/QR/IVishva_IOS_QR.jpeg", // Update paths as needed
        storeIcon: platform === "android" ? "/icons/Play_Store_Logo.png" : "/icons/Apple_Store_Logo.png",
        platformIcon: platform === "android" ? "/icons/android_logo.png" : "/icons/Apple_Device_Logo.png",
      };
    }
    return {
      qr: platform === "android" ? "/QR/Infinity_App_QR.png" : "/QR/InfiWorld_IOS_QR.jpeg",
      storeIcon: platform === "android" ? "/icons/Play_Store_Logo.png" : "/icons/Apple_Store_Logo.png",
      platformIcon: platform === "android" ? "/icons/android_logo.png" : "/icons/Apple_Device_Logo.png",
    };
  };

  const qrData = getQRData();

  return (
    <div className="flex h-full flex-col border-r border-neutral-300">
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-hidden bg-gray-100">
            <Logo />
            <div className="mt-8 flex-1 overflow-y-auto px-2 custom-scrollbar [mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)]">
              <div className="flex flex-col gap-1 pb-10">
                {renderLinks(links)}
              </div>
            </div>
          </div>

          <div>
            {(role === "DSA" || role === "CUSTOMER") && (
              <div className="mx-2 mb-4">
                <PlatformToggle platform={platform} setPlatform={setPlatform} />

                <div className="flex flex-col items-center justify-center rounded-xl bg-white p-4 shadow-sm border border-neutral-200 transition-all">
                  <img
                    src={qrData.qr}
                    alt={`${platform} QR Code`}
                    className="h-32 w-32 object-contain"
                  />
                  <p className="mt-2 text-center text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                    Scan for {platform} App
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-4">
                    <img
                      src={qrData.storeIcon}
                      alt="Store logo"
                      className="h-6 w-auto object-contain"
                    />
                    <img
                      src={qrData.platformIcon}
                      alt="Platform logo"
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            <SidebarLink
              link={{
                label: "Logout",
                href: "/",
                icon: <LogOut className="h-5 w-5 text-neutral-800" />,
                onClick: handleLogout,
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
      className="h-16 w-auto object-contain"
    />
  );
};