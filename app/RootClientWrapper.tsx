"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import GlobalAuthHandler from "./lib/global-auth-handler";
import { ModalProvider, useModal } from "./context/ModalContext";
// import { WishlistProvider } from "./context/WishlistContext";

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
  const isBranch = pathname?.startsWith("/branch");
  const isContactList = pathname?.startsWith("/page/contactlist");

  const isProtectedRoute = !!(
    isDashboard ||
    isAdminDashboard ||
    isRM ||
    isdepartmenthead ||
    isaccountProfile ||
    iscustomerProfile ||
    isUnlistedAdmin ||
    isHRProfile ||
    isDirector ||
    isBranchHead ||
    isBranch
  );

  return (
    <ModalProvider>
      <GlobalAuthHandler isProtectedRoute={isProtectedRoute} />

      {/* ✅ Referral handler runs globally */}
      <Suspense fallback={null}>
        <ReferralHandler />
      </Suspense>

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
        !isBranchHead &&
        !isBranch && <Header />}


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
        !isBranchHead &&
        !isBranch && <Footer />}
      {/* </WishlistProvider> */}
    </ModalProvider>
  );
}