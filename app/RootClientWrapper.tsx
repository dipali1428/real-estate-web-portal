"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { ModalProvider, useModal } from "./context/ModalContext";

function ReferralHandler() {
  const searchParams = useSearchParams();
  const { openPartner } = useModal();

  useEffect(() => {
    const ref = searchParams.get("ref");

    if (ref && !localStorage.getItem("ref_handled")) {
      // Save referral
      localStorage.setItem("referral_code", ref);
      localStorage.setItem("ref_handled", "true");

      // Open signup modal
      openPartner();
    }
  }, [searchParams, openPartner]);

  return null;
}

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

      {/* ✅ Referral handler runs globally */}
      <ReferralHandler />

      {!isDashboard &&
        !isContactList &&
        !isAdminDashboard &&
        !isRM &&
        !isdepartmenthead &&
        !isaccountProfile &&
        !iscustomerProfile &&
        !isUnlistedAdmin &&
        !isHRProfile &&
        !isDirector &&
        !isBranchHead && <Header />}


      {children}

      {!isDashboard &&
        !isContactList &&
        !isAdminDashboard &&
        !isRM &&
        !isdepartmenthead &&
        !isaccountProfile &&
        !iscustomerProfile &&
        !isUnlistedAdmin &&
        !isHRProfile &&
        !isDirector &&
        !isBranchHead && <Footer />}

    </ModalProvider>
  );
}