import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elite Bonds Hub | Institutional-Grade Fixed Income Dashboard',
  description: 'Manage and acquire high-yield institutional-grade bonds. Evaluate yield alpha matrices, monitor government and corporate debt holdings, and secure your financial future with our premium Bonds Investment Portal.',
  keywords: 'Bonds, Fixed Income, Corporate Bonds, Government Bonds, Yield Alpha, Institutional Investment, SGB, PSU Bonds, Tax-Free Bonds',
  openGraph: {
    title: 'Elite Bonds Portal - Secured Institutional Wealth',
    description: 'A dedicated hub for evaluating and managing premium fixed income assets with real-time yield analytics.',
    type: 'website',
  },
};

export default function BondsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}