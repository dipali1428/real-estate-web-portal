"use client";

import { usePathname } from "next/navigation";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { ModalProvider } from "./context/ModalContext";

export default function RootClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <ModalProvider>
      {!isDashboard && <Header />}
      {children}
      {!isDashboard && <Footer />}
    </ModalProvider>
  );
}
