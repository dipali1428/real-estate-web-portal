"use client";
import { useState } from "react";
import { Plus, ArrowLeft, UserPlus } from "lucide-react";
import AddLeadModal from "./components/AddLeadModal";
import ProductCard from "./components/ProductCard";
import { productCards as initialProductCards } from "./data/productData";
import { TabCounts } from "./types";

// Import all form components
import LifeInsuranceForm from "./forms/lifeinsuranceform";
import HealthInsuranceForm from "./forms/healthisurancform";
import MotorInsuranceForm from "./forms/motorinsuranceform";
import TravelInsuranceForm from "./forms/TravelInsuranceForm";
import FireInsuranceForm from "./forms/fireinsuranceform";
import CattleInsuranceForm from "./forms/cattleinsuranceform";
import MarineInsuranceForm from "./forms/marineinsuranceform";
import HomeLoanForm from "./forms/homeloanform";
import PersonalLoanForm from "./forms/personaloanform";
import BusinessLoanForm from "./forms/businessloanform";
import MortgageLoanForm from "./forms/mortgageloanform";
import SMELoanForm from "./forms/smeloanform";
import EducationLoanForm from "./forms/educationloanform";
import VehicleLoanForm from "./forms/vahicleloanform";
import LoanAgainstSecuritiesForm from "./forms/loanagainstsecuritiesform";
import MutualFundForm from "./forms/MutualFundForm";
import WealthManagementForm from "./forms/WealthManagementForm";
import PMSAIFForm from "./forms/PMSAIFForm";
import AIFForm from "./forms/aifform";
import BondsForm from "./forms/bondsfrom";
import FixedDepositForm from "./forms/fineddf";
import RealEstateForm from "./forms/realestate";
import NrpLoanForm from "./forms/nrploanform";
import LeadTable from "./components/LeadTable";
import CorporateInsuranceForm from "./forms/corporateinsuranceform";
import LoanProtectorForm from "./forms/loanprotectorform";
import UnlistedSharesForm from "./forms/unlistedsharesform";
import { toast } from "react-hot-toast";

export default function LeadManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [activeTab, setActiveTab] = useState<keyof TabCounts>("loans");

  // Form visibility states
  const [showLifeInsuranceForm, setShowLifeInsuranceForm] = useState(false);
  const [showHealthInsuranceForm, setShowHealthInsuranceForm] = useState(false);
  const [showMotorInsuranceForm, setShowMotorInsuranceForm] = useState(false);
  const [showTravelInsuranceForm, setShowTravelInsuranceForm] = useState(false);
  const [showFireInsuranceForm, setShowFireInsuranceForm] = useState(false);
  const [showCattleInsuranceForm, setShowCattleInsuranceForm] = useState(false);
  const [showMarineInsuranceForm, setShowMarineInsuranceForm] = useState(false);
  const [showHomeLoanForm, setShowHomeLoanForm] = useState(false);
  const [showPersonalLoanForm, setShowPersonalLoanForm] = useState(false);
  const [showBusinessLoanForm, setShowBusinessLoanForm] = useState(false);
  const [showMortgageLoanForm, setShowMortgageLoanForm] = useState(false);
  const [showSMELoanForm, setShowSMELoanForm] = useState(false);
  const [showEducationLoanForm, setShowEducationLoanForm] = useState(false);
  const [showVehicleLoanForm, setShowVehicleLoanForm] = useState(false);
  const [showLoanAgainstSecuritiesForm, setShowLoanAgainstSecuritiesForm] = useState(false);
  const [showMutualFundForm, setShowMutualFundForm] = useState(false);
  const [showWealthManagementForm, setShowWealthManagementForm] = useState(false);
  const [showPMSAIFForm, setShowPMSAIFForm] = useState(false);
  const [showAIFForm, setShowAIFForm] = useState(false);
  const [showFixedDepositForm, setShowFixedDepositForm] = useState(false);
  const [showBondsForm, setShowBondsForm] = useState(false);
  const [showRealEstateForm, setShowRealEstateForm] = useState(false);
  const [showNrpLoanForm, setShowNrpLoanForm] = useState(false);
  const [showCorporateInsuranceForm, setShowCorporateInsuranceForm] = useState(false);
  const [showLoanProtectorForm, setShowLoanProtectorForm] = useState(false);
  const [showUnlistedSharesForm, setShowUnlistedSharesForm] = useState(false);

  function getClickHandler(title: string): () => void {
    const handlerMap: { [key: string]: () => void } = {
      "Home Loans": () => setShowHomeLoanForm(true),
      "Personal Loans": () => setShowPersonalLoanForm(true),
      "Business Loan": () => setShowBusinessLoanForm(true),
      "Mortgage Loans": () => setShowMortgageLoanForm(true),
      "SME": () => setShowSMELoanForm(true),
      "Education Loan": () => setShowEducationLoanForm(true),
      "NRP Loan": () => setShowNrpLoanForm(true),
      "Vehicle Loan": () => setShowVehicleLoanForm(true),
      "Loan Against Securities / MF": () => setShowLoanAgainstSecuritiesForm(true),
      "Life Insurance": () => setShowLifeInsuranceForm(true),
      "Health Insurance": () => setShowHealthInsuranceForm(true),
      "Motor Insurance": () => setShowMotorInsuranceForm(true),
      "Travel Insurance": () => setShowTravelInsuranceForm(true),
      "Fire Insurance": () => setShowFireInsuranceForm(true),
      "Cattle Insurance": () => setShowCattleInsuranceForm(true),
      "Marine Insurance": () => setShowMarineInsuranceForm(true),
      "Corporate Insurance": () => setShowCorporateInsuranceForm(true),
      "Loan Protector": () => setShowLoanProtectorForm(true),
      "Mutual Fund": () => setShowMutualFundForm(true),
      "Wealth Management": () => setShowWealthManagementForm(true),
      "PMS": () => setShowPMSAIFForm(true),
      "AIF": () => setShowAIFForm(true),
      "Fixed Deposit": () => setShowFixedDepositForm(true),
      "Bonds": () => setShowBondsForm(true),
      "Real Estate": () => setShowRealEstateForm(true),
      "Unlisted Shares": () => setShowUnlistedSharesForm(true),
    };
    return handlerMap[title] || (() => toast.error(`No handler for ${title}`));
  }

  const productCards = {
    loans: initialProductCards.loans.map(product => ({ ...product, onClick: getClickHandler(product.title) })),
    insurance: initialProductCards.insurance.map(product => ({ ...product, onClick: getClickHandler(product.title) })),
    mutual_fund: initialProductCards.mutual_fund.map(product => ({ ...product, onClick: getClickHandler(product.title) })),
    investment: initialProductCards.investment.map(product => ({ ...product, onClick: getClickHandler(product.title) })),
    real_estate: initialProductCards.real_estate.map(product => ({ ...product, onClick: getClickHandler(product.title) })),
    unlisted: initialProductCards.unlisted.map(product => ({ ...product, onClick: getClickHandler(product.title) }))
  };

  if (showLifeInsuranceForm) return <LifeInsuranceForm onClose={() => setShowLifeInsuranceForm(false)} />;
  if (showHealthInsuranceForm) return <HealthInsuranceForm onClose={() => setShowHealthInsuranceForm(false)} />;
  if (showMotorInsuranceForm) return <MotorInsuranceForm onClose={() => setShowMotorInsuranceForm(false)} />;
  if (showTravelInsuranceForm) return <TravelInsuranceForm onClose={() => setShowTravelInsuranceForm(false)} />;
  if (showFireInsuranceForm) return <FireInsuranceForm onClose={() => setShowFireInsuranceForm(false)} />;
  if (showCattleInsuranceForm) return <CattleInsuranceForm onClose={() => setShowCattleInsuranceForm(false)} />;
  if (showMarineInsuranceForm) return <MarineInsuranceForm onClose={() => setShowMarineInsuranceForm(false)} />;
  if (showHomeLoanForm) return <HomeLoanForm onClose={() => setShowHomeLoanForm(false)} />;
  if (showPersonalLoanForm) return <PersonalLoanForm onClose={() => setShowPersonalLoanForm(false)} />;
  if (showBusinessLoanForm) return <BusinessLoanForm onClose={() => setShowBusinessLoanForm(false)} />;
  if (showMortgageLoanForm) return <MortgageLoanForm onClose={() => setShowMortgageLoanForm(false)} />;
  if (showSMELoanForm) return <SMELoanForm onClose={() => setShowSMELoanForm(false)} />;
  if (showEducationLoanForm) return <EducationLoanForm onClose={() => setShowEducationLoanForm(false)} />;
  if (showVehicleLoanForm) return <VehicleLoanForm onClose={() => setShowVehicleLoanForm(false)} />;
  if (showLoanAgainstSecuritiesForm) return <LoanAgainstSecuritiesForm onClose={() => setShowLoanAgainstSecuritiesForm(false)} />;
  if (showMutualFundForm) return <MutualFundForm onClose={() => setShowMutualFundForm(false)} />;
  if (showWealthManagementForm) return <WealthManagementForm onClose={() => setShowWealthManagementForm(false)} />;
  if (showPMSAIFForm) return <PMSAIFForm onClose={() => setShowPMSAIFForm(false)} />;
  if (showAIFForm) return <AIFForm onClose={() => setShowAIFForm(false)} />;
  if (showFixedDepositForm) return <FixedDepositForm onClose={() => setShowFixedDepositForm(false)} />;
  if (showBondsForm) return <BondsForm onClose={() => setShowBondsForm(false)} />;
  if (showRealEstateForm) return <RealEstateForm onClose={() => setShowRealEstateForm(false)} />;
  if (showNrpLoanForm) return <NrpLoanForm onClose={() => setShowNrpLoanForm(false)} />;
  if (showCorporateInsuranceForm) return <CorporateInsuranceForm onClose={() => setShowCorporateInsuranceForm(false)} />;
  if (showLoanProtectorForm) return <LoanProtectorForm onClose={() => setShowLoanProtectorForm(false)} />;
  if (showUnlistedSharesForm) return <UnlistedSharesForm onClose={() => setShowUnlistedSharesForm(false)} />;

  const tabs = [
    { id: 'loans' as const, name: 'Loans' },
    { id: 'insurance' as const, name: 'Insurance' },
    { id: 'mutual_fund' as const, name: 'Mutual Fund' },
    { id: 'investment' as const, name: 'Investments' },
    { id: 'real_estate' as const, name: 'Real Estate' },
    { id: 'unlisted' as const, name: 'Unlisted' },
  ];

  return (
    <>
      <section id="lead-management" className="min-h-screen bg-slate-50 p-4 sm:p-6">
        <div className="max-w-full mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-2 gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700">Lead Management</h1>
              <p className="text-slate-600 mt-1 text-sm sm:text-base lg:text-lg max-w-3xl">
                Efficiently manage your sales pipeline from initial contact to conversion.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              {viewMode === 'table' ? (
                <>
                  <div className="flex flex-col items-center w-full sm:w-auto">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center justify-center gap-2 bg-white border border-[#2076C7] text-[#2076C7] px-4 py-2 rounded-md hover:bg-blue-50 transition-all font-semibold shadow-sm w-full sm:w-auto min-w-[180px]"
                    >
                      <UserPlus className="w-4 h-4" />
                      Referal Lead
                    </button>
                  </div>

                  <div className="flex flex-col items-center w-full sm:w-auto">
                    <button
                      onClick={() => setViewMode('cards')}
                      className="flex items-center justify-center gap-2 bg-gradient-to-t from-[#2076C7] to-[#1CADA3] text-white px-4 py-2.5 rounded-md hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto min-w-[180px]"
                    >
                      <Plus className="w-4 h-4" />
                      Add Detailed Lead
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setViewMode('table')}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 px-6 py-2.5 rounded-md hover:bg-slate-50 transition-all shadow-sm w-full sm:w-auto font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Leads
                </button>
              )}
            </div>
          </div>

          {/* Body Content */}
          <LeadTable
            onEdit={(lead) => {
              toast(`Opening ${lead.clientName}`, {
              });
            }}
            onDelete={(lead) => {
              toast.success(`${lead.clientName} deleted successfully`);
            }}
          />
          ) : (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="mb-6 flex flex-wrap gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-5 rounded-full font-medium text-sm border transition-all ${activeTab === tab.id
                      ? 'bg-[#2076C7] text-white border-[#2076C7] shadow-md'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                      }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                {Object.entries(productCards).map(([tabId, products]) => (
                  activeTab === tabId && (
                    <div
                      key={tabId}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                    >
                      {products.map((product, index) => (
                        <ProductCard
                          key={index}
                          title={product.title}
                          description={product.description}
                          onClick={product.onClick}
                          activeLeads={product.activeLeads}
                          converted={product.converted}
                        />
                      ))}
                    </div>
                  )
                ))}
              </div>
            </div>
          )
        </div>
      </section>

      <AddLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}