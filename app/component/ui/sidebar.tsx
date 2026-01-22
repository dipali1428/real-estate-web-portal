// ui/sidebar.tsx
"use client";
import { cn } from "../../lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import router from "next/router";
import { LogOut } from "lucide-react";

interface Links {
    label: string;
    href: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

interface SidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
    undefined
);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

export const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    const [openState, setOpenState] = useState(false);

    const open = openProp !== undefined ? openProp : openState;
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

    return (
        <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const Sidebar = ({
    children,
    open,
    setOpen,
    animate,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    return (
        <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>
    );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
    return <DesktopSidebar {...props} />;
};

export const DesktopSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof motion.div>) => {
    const { open, setOpen, animate } = useSidebar();

    return (
        <motion.div
            className={cn(
                "hidden md:flex flex-col bg-gray-100 px-4 py-4 h-full shrink-0",
                className
            )}
            animate={{
                width: animate ? (open ? "260px" : "64px") : "260px",
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            {...props}>
            {children}
        </motion.div>
    );
};

//  Mobile Sidebar (Full Link Menu) 
const handleLogout = () => {
    document.cookie = "authToken=; path=/; max-age=0; SameSite=Lax";
    router.push("/");
};

export const MobileSidebar = ({
    links,
    onNavigate
}: {
    links: { label: string; href: string; icon: React.ReactNode }[];
    onNavigate: (href: string) => void;
}) => {
    const { open, setOpen } = useSidebar();

    return (
        <div className="md:hidden">
            {/* Menu Icon */}
            <div className="p-2">
                <IconMenu2
                    className="h-7 w-7 text-neutral-700"
                    onClick={() => setOpen(true)}
                />
            </div>

            {/* Slide Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 bg-white z-50 p-6 flex flex-col">
                        {/* Close Button */}
                        <IconX
                            className="absolute right-6 top-6 h-7 w-7 text-gray-700"
                            onClick={() => setOpen(false)}
                        />

                        {/* LOGO */}
                        <img
                            src="/logo.png"
                            className="h-14 mb-6 mt-12 mx-auto"
                        />

                        {/* LINKS LIST */}
                        <div className="flex flex-col gap-3 mt-4">
                            {links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        onNavigate(link.href);
                                        setOpen(false);
                                    }}
                                    className="flex items-center gap-3 py-2 px-3 rounded-md text-left 
                                               text-gray-800 hover:bg-blue-100 transition-all">
                                    {link.icon}
                                    <span className="text-[15px]">{link.label}</span>
                                </button>
                            ))}
                        </div>
                        
                        <div className="p-0.5 pt-2">
                            <SidebarLink
                                link={{
                                    label: "Logout",
                                    href: "/",
                                    icon: <LogOut className="h-5 w-5 text-neutral-700" />,
                                    onClick: handleLogout
                                }}
                                className="text-gray-700"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


export const SidebarLink = ({
    link,
    className,
    ...props
}: {
    link: Links;
    className?: string;
}) => {
    const { open, animate } = useSidebar();
    return (
        <a
            href={link.href}
            onClick={link.onClick}
            className={cn(
                "flex items-center gap-3 py-2 px-3 rounded-md hover:bg-blue-100 transition-all",
                className
            )}
            {...props}>
            {link.icon}

            <motion.span
                animate={{
                    display: animate ? (open ? "inline-block" : "none") : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-neutral-800 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0! m-0!">
                {link.label}
            </motion.span>
        </a>
    );
};
