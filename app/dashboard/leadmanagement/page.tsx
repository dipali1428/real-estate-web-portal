"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddLeadModal from "./AddLeadModal";
import LifeInsuranceForm from "./lifeinsuranceform";
import HealthInsuranceForm from "./healthisurancform";
import MotorInsuranceForm from "./motorinsuranceform";
import TravelInsuranceForm from "./TravelInsuranceForm"
import PropertyInsuranceForm from "./propertyinsuranceform";
import CattleInsuranceForm from "./cattleinsuranceform";
import MarineInsuranceForm from "./marineinsuranceform";
import HomeLoanForm from "./homeloanform";
import PersonalLoanForm from "./personaloanform";
import BusinessLoanForm from "./businessloanform";
import MortgageLoanForm from "./mortgageloanform";
import SMELoanForm from "./smeloanform";
import EducationLoanForm from "./educationloanform";
import VehicleLoanForm from "./vahicleloanform";
import LoanAgainstSecuritiesForm from "./loanagainstsecuritiesform";
//import DebtCapitalMarketForm from "./debtcapitalmarketform";
import MutualFundForm from "./MutualFundForm";
import WealthManagementForm from "./WealthManagementForm";
import PMSAIFForm from "./PMSAIFForm";
import BondsForm from "./bondsfrom";
import FixedDepositForm from "./fineddf";
import RealEstateForm from "./realestate";
import BalanceTransferForm from "./balancetransferform";
export default function LeadManagement() {
  // Modal open/close state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Active tab state
  const [activeTab, setActiveTab] = useState("insurance");

  // Life Insurance Form visibility
  const [showLifeInsuranceForm, setShowLifeInsuranceForm] = useState(false);
  const [showHealthInsuranceForm, setShowHealthInsuranceForm] = useState(false);
  const [showMotorInsuranceForm, setShowMotorInsuranceForm] = useState(false);
  const [showTravelInsuranceForm, setShowTravelInsuranceForm] = useState(false);
  const [showPropertyInsuranceForm, setShowPropertyInsuranceForm] = useState(false);
  const [showCattleInsuranceForm, setShowCattleInsuranceForm] = useState(false);
  const [showMarineInsuranceForm, setShowMarineInsuranceForm] = useState(false);
  const [showHomeLoanForm, setShowHomeLoanForm] = useState(false);
  const [showPersonalLoanForm, setShowPersonalLoanForm] = useState(false);
  const [showBusinessLoanForm, setShowBusinessLoanForm] = useState(false);
  const [showMortgageLoanForm, setShowMortgageLoanForm] = useState(false);
  const [showSMELoanForm, setShowSMELoanForm] = useState(false);
  const [showEducationLoanForm, setShowEducationLoanForm] = useState(false)
  const [showVehicleLoanForm, setShowVehicleLoanForm] = useState(false);
  const [showLoanAgainstSecuritiesForm, setShowLoanAgainstSecuritiesForm] = useState(false);
  //const [showDebtCapitalMarketForm, setShowDebtCapitalMarketForm] =useState(false); //
  const [showMutualFundForm, setShowMutualFundForm] = useState(false); //
  const [showWealthManagementForm, setShowWealthManagementForm] = useState(false); //
  const [showPMSAIFForm, setShowPMSAIFForm] = useState(false);
  const [showFixedDepositForm, setShowFixedDepositForm] = useState(false);
  const [showBondsForm, setShowBondsForm] = useState(false);
  const [showRealEstateForm, setShowRealEstateForm] = useState(false);
  const [showBalanceTransferForm, setShowBalanceTransferForm] = useState(false);
  // If LifeInsuranceForm is open, show only that
  if (showLifeInsuranceForm) {
    return <LifeInsuranceForm onClose={() => setShowLifeInsuranceForm(false)} />;
  }
  if (showHealthInsuranceForm) {
    return <HealthInsuranceForm onClose={() => setShowHealthInsuranceForm(false)} />;
  }
  if (showMotorInsuranceForm) {
    return <MotorInsuranceForm onClose={() => setShowMotorInsuranceForm(false)} />;
  }
  if (showTravelInsuranceForm) {
    return <TravelInsuranceForm onClose={() => setShowTravelInsuranceForm(false)} />;
  }
  if (showPropertyInsuranceForm) {
    return <PropertyInsuranceForm onClose={() => setShowPropertyInsuranceForm(false)} />;
  }
  if (showCattleInsuranceForm) {
    return <CattleInsuranceForm onClose={() => setShowCattleInsuranceForm(false)} />;
  }
  if (showMarineInsuranceForm) {
    return <MarineInsuranceForm onClose={() => setShowMarineInsuranceForm(false)} />;
  }
  if (showHomeLoanForm) {
    return <HomeLoanForm onClose={() => setShowHomeLoanForm(false)} />;
  }
  if (showPersonalLoanForm) {
    return <PersonalLoanForm onClose={() => setShowPersonalLoanForm(false)} />;
  }
  if (showBusinessLoanForm) {
    return <BusinessLoanForm onClose={() => setShowBusinessLoanForm(false)} />;
  }
  if (showMortgageLoanForm) {
    return <MortgageLoanForm onClose={() => setShowMortgageLoanForm(false)} />;
  }
  if (showSMELoanForm) {
    return <SMELoanForm onClose={() => setShowSMELoanForm(false)} />;
  }
  if (showEducationLoanForm) {
    return <EducationLoanForm onClose={() => setShowEducationLoanForm(false)} />;
  }
  if (showVehicleLoanForm) {
    return <VehicleLoanForm onClose={() => setShowVehicleLoanForm(false)} />;
  }
  if (showLoanAgainstSecuritiesForm) {
    return <LoanAgainstSecuritiesForm onClose={() => setShowLoanAgainstSecuritiesForm(false)} />;
  }
  // if (showDebtCapitalMarketForm) {
  //   return <DebtCapitalMarketForm onClose={() => setShowDebtCapitalMarketForm(false)} />;
  // }
  if (showMutualFundForm) {
    return <MutualFundForm onClose={() => setShowMutualFundForm(false)} />;
  }
  if (showWealthManagementForm) {
    return <WealthManagementForm onClose={() => setShowWealthManagementForm(false)} />;
  }
  if (showPMSAIFForm) {
    return <PMSAIFForm onClose={() => setShowPMSAIFForm(false)} />;
  }
  if (showFixedDepositForm) {
    return <FixedDepositForm onClose={() => setShowFixedDepositForm(false)} />;
  }
  if (showBondsForm) {
    return <BondsForm onClose={() => setShowBondsForm(false)} />;
  }
  if (showRealEstateForm) {
    return <RealEstateForm onClose={() => setShowRealEstateForm(false)} />;
  }
  if (showBalanceTransferForm) {
    return <BalanceTransferForm onClose={() => setShowBalanceTransferForm(false)} />;
  }
  // Tabs list
  const tabs = [
    { id: "loans", label: "Loans" },
    { id: "insurance", label: "Insurance" },
    { id: "mutual_fund", label: "Mutual Fund" },
    { id: "investment", label: "Investments" },
    { id: "real_estate", label: "Real Estate" },
    { id: "unlisted", label: "Unlisted" },
  ];

  return (
    <>
      {/* ======= Lead Management Section ======= */}
      <section id="lead-management" className="p-8 bg-gray-20 min-h-screen">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          {/* Left Side Title + Subtitle */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">Lead Management</h1>
            <p className="text-slate-600 mt-2 text-base sm:text-lg">
              Efficiently manage your sales pipeline from initial contact to conversion.
              Track all potential clients and their journey.
            </p>
          </div>

          {/* Right Side Button + Text */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add New Lead
            </button>
            <p className="text-xs text-slate-500 text-center">Only referral lead</p>
          </div>
        </div>
        {/* Tabs / Navbar */}
        <div className="flex border-b border-gray-200 mb-6 space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 font-medium transition-all duration-300 ${activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600 scale-105"
                : "text-gray-500 hover:text-gray-700 hover:scale-105"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== Tab Content ===== */}
        <div className="bg-white p-6 rounded-lg shadow">
          {/* === Insurance Tab === */}
          {activeTab === "loans" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Home Loans */}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Home Loans</h2>
                  <p className="text-sm mb-6">
                    A home loan (mortgage) is money borrowed from a bank to buy a house.
                  </p>
                </div>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowHomeLoanForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>
              {/* Personal Loans*/}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Personal Loans</h2>
                  <p className="text-sm mb-6">A personal loan is money borrowed from a bank to cover personal expenses.</p>
                </div>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowPersonalLoanForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>
              {/* Business Loan*/}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Business Loan</h2>
                  <p className="text-sm mb-6">A business loan is money borrowed to help a company pay for its expenses.</p>
                </div>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowBusinessLoanForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>
              {/*Mortgage Loans*/}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Mortgage Loans</h2>
                  <p className="text-sm mb-6">A mortgage loan is money borrowed to buy a home, secured by the property itself.</p></div>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowMortgageLoanForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>
              {/* SME*/}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3">SME</h2>
                  <p className="text-sm mb-6">SME means Small and Medium-sized Enterprises, which are smaller businesses that support jobs and growth.</p></div>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowSMELoanForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>
              {/* Education loan*/}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Education Loan</h2>
                  <p className="text-sm mb-6">
                    An education loan is money borrowed to pay for study expenses like fees, books, and living costs.</p></div>
                {/*active leads*/}
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowEducationLoanForm(true)}
                  className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>
              {/* Balance Transfer*/}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3">NRP Loan</h2>
                  <p className="text-sm mb-6">To purchase or construct a commercial property like an office, shop, or factory.</p></div>
                {/*active leads*/}
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowBalanceTransferForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>

              {/* Vehicle Loan*/}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <h2 className="text-xl font-semibold mb-3">Vehicle Loan</h2>
                <p className="text-sm mb-6">A vehicle loan is money borrowed to buy a car or other vehicle, with the vehicle as security.</p>
                {/*active leads*/}
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowVehicleLoanForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>
              {/* loan against securities / MF*/}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <h2 className="text-xl font-semibold mb-3">Loan Against Securities / MF</h2>
                <p className="text-sm mb-6">A vehicle loan is money borrowed to buy a car or other vehicle, with the vehicle as collateral.</p>
                {/*active leads*/}
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLoanAgainstSecuritiesForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>
              {/* Debt Capital Market (DCM)
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <h2 className="text-xl font-semibold mb-3">Debt Capital Market (DCM)</h2>
                <p className="text-sm mb-6">The debt capital market is where bonds are issued to raise money, and loan syndication is when many lenders join to give one big loan.</p>
                
                <div className="flex items-center justify-between my-4">
              <div className="text-center">
                  <span className="text-xl font-bold text-blue-600">0</span>
                  <p className="text-sm text-gray-600">Active Leads</p>
                </div>
                <div className="text-center">
                  <span className="text-xl font-bold text-blue-600">0</span>
                  <p className="text-sm text-gray-600">Converted</p>
                </div>
                </div>
                <button onClick={() => setShowDebtCapitalMarketForm(true)}
                className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
                </div>*/}
            </div>
          )}
          {activeTab === "insurance" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Life Insurance */}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Life Insurance
                  </h2>
                  <p className="text-sm mb-4 leading-relaxed">
                    Life insurance gives money to family after death, and term life covers for 10–30 years.
                  </p>
                </div>
                {/*active leads*/}
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowLifeInsuranceForm(true)}
                  className="flex items-center gap-2 bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white px-4 py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Click to Add New
                </button>
              </div>

              {/* Health Insurance */}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Health Insurance
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Covers medical, surgical, and prescription expenses incurred
                    by the insured, reimbursing or paying providers directly.
                  </p>
                </div>
                {/*active leads*/}
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowHealthInsuranceForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Click to Add New
                </button>
              </div>

              {/* Motor Insurance */}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center ">
                    Motor Insurance
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Protects vehicles against loss or damage due to accidents,
                    theft, natural disasters, or third-party liabilities.
                  </p>
                </div>
                {/*active leads*/}
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowMotorInsuranceForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Click to Add New
                </button>
              </div>

              {/* Travel Insurance */}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Travel Insurance
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Travel insurance protects travelers from unexpected costs like medical emergencies or trip cancellations. </p>
                </div>
                {/*active leads*/}
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowTravelInsuranceForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Click to Add New
                </button>
              </div>
              {/*Property  Insurance */}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Property Insurance
                  </h2>
                  <p className="text-sm leading-relaxed">Property insurance protects your home and belongings from damage, theft, or loss.
                  </p>
                </div>
                {/*active leads*/}
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowPropertyInsuranceForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Click to Add New
                </button>
              </div>
              {/* Cattle Insurance */}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Cattle Insurance
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Cattle insurance protects farmers from financial loss if their animals die, get sick, or face accidents.  </p>
                </div>
                {/*active leads*/}
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowCattleInsuranceForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Click to Add New
                </button>
              </div>

              {/* Marine Insurance */}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Marine Insurance
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Marine insurance protects ships, cargo, and goods against loss or damage during transit by sea. </p>
                </div>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowMarineInsuranceForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Click to Add New
                </button>
              </div>
            </div>
          )}
          {activeTab === "mutual_fund" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* */}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <h2 className="text-xl font-semibold mb-3">Mutual Fund </h2>
                <p className="text-sm mb-6">A mutual fund pools money from many people to invest in stocks, bonds, or other assets.</p>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div><button onClick={() => setShowMutualFundForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>

            </div>
          )}
          {activeTab === "unlisted" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* unlisted */}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <h2 className="text-xl font-semibold mb-3">Unlisted</h2>
                <p className="text-sm mb-6"></p>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button //onClick={() => setShow(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>
            </div>
          )}
          {activeTab === "investment" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Wealth Management */}
              <div className="bg-white text-black p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <h2 className="text-xl font-semibold mb-3">Wealth Management</h2>
                <p className="text-sm mb-6">
                  Wealth management helps individuals manage and grow their
                  wealth with personalized strategies.
                </p>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowWealthManagementForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Click to Add New
                </button>
              </div>

              {/* PMS / AIF */}
              <div className="bg-white text-black p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <h2 className="text-xl font-semibold mb-3">PMS / AIF</h2>
                <p className="text-sm mb-6">PMS offers personalized investment services. AIFs invest in assets like private equity, hedge funds, and real estate.
                </p>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowPMSAIFForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Click to Add New
                </button>
              </div>

              {/* Fixed Deposit */}
              <div className="bg-white text-black p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <h2 className="text-xl font-semibold mb-3">Fixed Deposit</h2>
                <p className="text-sm mb-6">
                  A Fixed Deposit (FD) offers a fixed return over a set period —
                  ideal for low-risk investors.
                </p>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div><button onClick={() => setShowFixedDepositForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Click to Add New
                </button>
              </div>

              {/* Bonds */}
              <div className="bg-white text-black p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <h2 className="text-xl font-semibold mb-3">Bonds</h2>
                <p className="text-sm mb-6">Bonds are fixed-income instruments providing regular interest and principal return at maturity.
                </p>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div>
                <button onClick={() => setShowBondsForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Click to Add New
                </button>
              </div>
            </div>
          )}

          {activeTab === "real_estate" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* real estate*/}
              <div className="bg-white text-black rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-blue-200">
                <h2 className="text-xl font-semibold mb-3">Real Estate</h2>
                <p className="text-sm mb-6">Real estate investment involves buying or renting property to generate income or profit.</p>
                <div className="flex items-center justify-between my-4">
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Active Leads</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">0</span>
                    <p className="text-sm text-gray-600">Converted</p>
                  </div>
                </div><button onClick={() => setShowRealEstateForm(true)}
                  className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">Click to Add New</button>
              </div>
            </div>
          )}


        </div>
        <div className="w-full mt-6">
          <h3 className="text-xl font-semibold mb-4">All Leads</h3>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full mix-w-80 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Lead ID</th>
                  <th className="px-4 py-2 text-left">Client Name</th>
                  <th className="px-4 py-2 text-left">Contact No.</th>
                  <th className="px-4 py-2 text-left">Products</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Last Updated</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b">
                  <td className="px-4 py-3">LD-1024</td>
                  <td className="px-4 py-3">Amit Sharma</td>
                  <td className="px-4 py-3">9876543210</td>
                  <td className="px-4 py-3">Life Insurance</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                      Converted
                    </span>
                  </td>
                  <td className="px-4 py-3">15 Oct 2023</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </button>
                  </td>
                </tr>


                <tr className="border-b">
                  <td className="px-4 py-3">LD-1025</td>
                  <td className="px-4 py-3">Priya Singh</td>
                  <td className="px-4 py-3">8765432109</td>
                  <td className="px-4 py-3">Health Insurance</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                      Follow-up
                    </span>
                  </td>
                  <td className="px-4 py-3">14 Oct 2023</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </button>
                  </td>
                </tr>


                <tr className="border-b">
                  <td className="px-4 py-3">LD-1026</td>
                  <td className="px-4 py-3">Rahul Verma</td>
                  <td className="px-4 py-3">7654321098</td>
                  <td className="px-4 py-3">Motor Insurance</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                      Contacted
                    </span>
                  </td>
                  <td className="px-4 py-3">13 Oct 2023</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </button>
                  </td>
                </tr>


                <tr>
                  <td className="px-4 py-3">LD-1027</td>
                  <td className="px-4 py-3">Neha Patel</td>
                  <td className="px-4 py-3">6543210987</td>
                  <td className="px-4 py-3">Home Insurance</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-700">
                      New
                    </span>
                  </td>
                  <td className="px-4 py-3">12 Oct 2023</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round" >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* ===== Modal (Add New Lead) ===== */}
      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}