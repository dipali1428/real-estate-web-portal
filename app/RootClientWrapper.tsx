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
  const isDirector = pathname?.startsWith("/director");
  const isBranchHead = pathname?.startsWith("/branchhead");

  const isContactList = pathname?.startsWith("/page/contactlist");
  return (
    <ModalProvider>
      {!isDashboard && !isContactList && !isAdminDashboard && !isRM && !isdepartmenthead && !isaccountProfile && !iscustomerProfile && !isUnlistedAdmin && !isHRProfile && !isDirector && !isBranchHead &&<Header />}
      {children}
      {!isDashboard && !isContactList && !isAdminDashboard && !isRM && !isdepartmenthead && !isaccountProfile && !iscustomerProfile && !isUnlistedAdmin && !isHRProfile && !isDirector && !isBranchHead &&<Footer />}
    </ModalProvider>
  );
}
