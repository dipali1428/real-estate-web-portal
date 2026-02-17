"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../component/ui/sidebar";
import { cn } from "../lib/utils";
import { LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { getSidebarLinks } from "../utils/getSidebarLinks";
import type { Role } from "../utils/getSidebarLinks";

interface SidebarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

export default function DashboardSidebar({ role }: { role: Role }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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
          {/* Parent Button */}
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

          {/* Children */}
          {hasChildren && isExpanded && (
            <div className="flex flex-col gap-1 mt-1">
              {renderLinks(item.children!, level + 1, key)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex h-full flex-col border-r border-neutral-300">
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          {/* Logo Section */}
          <div className="flex flex-1 flex-col overflow-x-hidden bg-gray-100">
            <Logo />

            <div className="mt-8 flex flex-col gap-1">
              {renderLinks(links)}
            </div>
          </div>

          {/* Footer */}
          <div>
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
