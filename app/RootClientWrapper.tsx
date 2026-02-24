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
  const iscustomerProfile = pathname?.startsWith("/customer");
  const isUnlistedAdmin = pathname?.startsWith("/UnlistedAdmin");
  const isHRProfile = pathname?.startsWith("/hr");

  const isContactList = pathname?.startsWith("/page/contactlist");
  return (
    <ModalProvider>
      {!isDashboard && !isContactList && !isAdminDashboard && !isRM && !isdepartmenthead && !isaccountProfile && !iscustomerProfile && !isUnlistedAdmin && !isHRProfile && <Header />}
      {children}
      {!isDashboard && !isContactList && !isAdminDashboard && !isRM && !isdepartmenthead && !isaccountProfile && !iscustomerProfile && !isUnlistedAdmin && !isHRProfile && <Footer />}
    </ModalProvider>
  );
}
