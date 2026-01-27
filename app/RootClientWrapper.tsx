"use client";

import { usePathname } from "next/navigation";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { ModalProvider } from "./context/ModalContext";

export default function RootClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAdminDashboard = pathname?.startsWith("/admin");
  const isRM = pathname?.startsWith("/rm");
  const isdepartmenthead = pathname?.startsWith("/departmenthead");
  const isaccountProfile = pathname?.startsWith("/accounts");

  const isContactList = pathname?.startsWith("/page/contactlist");
  return (
    <ModalProvider>
      {!isDashboard && !isContactList && !isAdminDashboard && !isRM && !isdepartmenthead && !isaccountProfile && <Header />}
      {children}
      {!isDashboard && !isContactList && !isAdminDashboard && !isRM && !isdepartmenthead && !isaccountProfile && <Footer />}
    </ModalProvider>
  );
}
