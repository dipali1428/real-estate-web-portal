import Hero from './components/Hero';
import AboutNPS from './components/AboutNPS';
import NPSVatsalya from './components/NPSVatsalya';
import Features from './components/Features';
import Eligibility from './components/Eligibility';
import AccountTypes from './components/AccountTypes';
import Comparison from './components/Comparison';
import NPSCalculator from './components/NPSCalculator';
import NPSWithdrawal from './components/NPSWithdrawal';
import ApplicationProcess from './components/ApplicationProcess';
import FAQ from './components/FAQ';

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Hero />
      <AboutNPS />
      <AccountTypes />
      <NPSVatsalya />
      <NPSCalculator />
      <NPSWithdrawal />
      <Features />
      <Comparison />
      <Eligibility />
      <ApplicationProcess />
      <FAQ />
    </main>
  );
}
