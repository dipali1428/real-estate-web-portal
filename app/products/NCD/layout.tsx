import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secured NCD Investments | High-Yield Fixed Income | Infinity Arthvishva",
  description: "Invest in high-yield secured Non-Convertible Debentures (NCDs) with Infinity Arthvishva. Earn regular monthly/yearly payouts with higher returns than Bank FDs. 100% digital and secure.",
  keywords: [
    "NCD", 
    "Non-Convertible Debentures", 
    "Fixed Income Investment", 
    "High Yield NCD", 
    "Infinity Arthvishva NCD", 
    "Secure Investments India", 
    "Wealth Growth", 
    "NCD vs FD"
  ],
  openGraph: {
    title: "High-Yield Secured NCD Investments | Infinity Arthvishva",
    description: "Grow your wealth with secured NCDs. Higher interest rates than traditional FDs with flexible payout options.",
    type: "website",
    url: "https://infinityarthvishva.com/products/NCD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secured NCD Investments | Infinity Arthvishva",
    description: "Maximize your fixed income returns with our curated selection of high-rated NCDs.",
  }
};

export default function NCDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
