"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddLeadModal from "./AddLeadModal";
import ProductCard from "./components/ProductCard";
import { productCards as initialProductCards } from "./data/productData";
import { TabCounts } from "./types";
// Import all form components
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
import MutualFundForm from "./MutualFundForm";
import WealthManagementForm from "./WealthManagementForm";
import PMSAIFForm from "./PMSAIFForm";
import BondsForm from "./bondsfrom";
import FixedDepositForm from "./fineddf";
import RealEstateForm from "./realestate";
import NrpLoanForm from "./nrploanform";
import LeadTable from "./components/LeadTable";

export default function LeadManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof TabCounts>("insurance");
  const [tabCounts, setTabCounts] = useState<TabCounts>({
    loans: 0,
    insurance: 0,
    mutual_fund: 0,
    investment: 0,
    real_estate: 0,
    unlisted: 0
  });

  // Form visibility states
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
  const [showEducationLoanForm, setShowEducationLoanForm] = useState(false);
  const [showVehicleLoanForm, setShowVehicleLoanForm] = useState(false);
  const [showLoanAgainstSecuritiesForm, setShowLoanAgainstSecuritiesForm] = useState(false);
  const [showMutualFundForm, setShowMutualFundForm] = useState(false);
  const [showWealthManagementForm, setShowWealthManagementForm] = useState(false);
  const [showPMSAIFForm, setShowPMSAIFForm] = useState(false);
  const [showFixedDepositForm, setShowFixedDepositForm] = useState(false);
  const [showBondsForm, setShowBondsForm] = useState(false);
  const [showRealEstateForm, setShowRealEstateForm] = useState(false);
  const [showNrpLoanForm, setShowNrpLoanForm] = useState(false);

  // Form handlers object for cleaner conditional rendering
  const formHandlers = {
    showLifeInsuranceForm,
    showHealthInsuranceForm,
    showMotorInsuranceForm,
    showTravelInsuranceForm,
    showPropertyInsuranceForm,
    showCattleInsuranceForm,
    showMarineInsuranceForm,
    showHomeLoanForm,
    showPersonalLoanForm,
    showBusinessLoanForm,
    showMortgageLoanForm,
    showSMELoanForm,
    showEducationLoanForm,
    showVehicleLoanForm,
    showLoanAgainstSecuritiesForm,
    showMutualFundForm,
    showWealthManagementForm,
    showPMSAIFForm,
    showFixedDepositForm,
    showBondsForm,
    showRealEstateForm,
    showNrpLoanForm
  };

  // Enhanced product cards with actual click handlers
  const productCards = {
    loans: initialProductCards.loans.map(product => ({
      ...product,
      onClick: getClickHandler(product.title)
    })),
    insurance: initialProductCards.insurance.map(product => ({
      ...product,
      onClick: getClickHandler(product.title)
    })),
    mutual_fund: initialProductCards.mutual_fund.map(product => ({
      ...product,
      onClick: getClickHandler(product.title)
    })),
    investment: initialProductCards.investment.map(product => ({
      ...product,
      onClick: getClickHandler(product.title)
    })),
    real_estate: initialProductCards.real_estate.map(product => ({
      ...product,
      onClick: getClickHandler(product.title)
    })),
    unlisted: initialProductCards.unlisted.map(product => ({
      ...product,
      onClick: getClickHandler(product.title)
    }))
  };

  // Helper function to map product titles to click handlers
  function getClickHandler(title: string): () => void {
    const handlerMap: { [key: string]: () => void } = {
      // Loans
      "Home Loans": () => setShowHomeLoanForm(true),
      "Personal Loans": () => setShowPersonalLoanForm(true),
      "Business Loan": () => setShowBusinessLoanForm(true),
      "Mortgage Loans": () => setShowMortgageLoanForm(true),
      "SME": () => setShowSMELoanForm(true),
      "Education Loan": () => setShowEducationLoanForm(true),
      "NRP Loan": () => setShowNrpLoanForm(true),
      "Vehicle Loan": () => setShowVehicleLoanForm(true),
      "Loan Against Securities / MF": () => setShowLoanAgainstSecuritiesForm(true),

      // Insurance
      "Life Insurance": () => setShowLifeInsuranceForm(true),
      "Health Insurance": () => setShowHealthInsuranceForm(true),
      "Motor Insurance": () => setShowMotorInsuranceForm(true),
      "Travel Insurance": () => setShowTravelInsuranceForm(true),
      "Property Insurance": () => setShowPropertyInsuranceForm(true),
      "Cattle Insurance": () => setShowCattleInsuranceForm(true),
      "Marine Insurance": () => setShowMarineInsuranceForm(true),

      // Mutual Fund
      "Mutual Fund": () => setShowMutualFundForm(true),

      // Investment
      "Wealth Management": () => setShowWealthManagementForm(true),
      "PMS / AIF": () => setShowPMSAIFForm(true),
      "Fixed Deposit": () => setShowFixedDepositForm(true),
      "Bonds": () => setShowBondsForm(true),

      // Real Estate
      "Real Estate": () => setShowRealEstateForm(true),

      // Unlisted
      "Unlisted": () => console.log("Unlisted form clicked")
    };

    return handlerMap[title] || (() => console.log(`No handler for ${title}`));
  }

  // Return forms if any are open
  if (Object.values(formHandlers).some(Boolean)) {
    if (showLifeInsuranceForm) return <LifeInsuranceForm onClose={() => setShowLifeInsuranceForm(false)} />;
    if (showHealthInsuranceForm) return <HealthInsuranceForm onClose={() => setShowHealthInsuranceForm(false)} />;
    if (showMotorInsuranceForm) return <MotorInsuranceForm onClose={() => setShowMotorInsuranceForm(false)} />;
    if (showTravelInsuranceForm) return <TravelInsuranceForm onClose={() => setShowTravelInsuranceForm(false)} />;
    if (showPropertyInsuranceForm) return <PropertyInsuranceForm onClose={() => setShowPropertyInsuranceForm(false)} />;
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
    if (showFixedDepositForm) return <FixedDepositForm onClose={() => setShowFixedDepositForm(false)} />;
    if (showBondsForm) return <BondsForm onClose={() => setShowBondsForm(false)} />;
    if (showRealEstateForm) return <RealEstateForm onClose={() => setShowRealEstateForm(false)} />;
    if (showNrpLoanForm) return <NrpLoanForm onClose={() => setShowNrpLoanForm(false)} />;
  }

  // Tabs list with counts
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
      <section id="lead-management" className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 lg:mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700">Lead Management</h1>
            <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg max-w-3xl">
              Efficiently manage your sales pipeline from initial contact to conversion.
              Track all potential clients and their journey.
            </p>
          </div>

          <div className="flex flex-col items-start">
          <div className="flex flex-col items-center gap-2 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-auto min-w-40"
            >
              <Plus className="w-4 h-4" />
              Add New Lead
            </button>
            <p className="text-xs text-slate-500">Only referral lead</p>
          </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 rounded-full font-medium text-sm flex items-center border transition-colors ${activeTab === tab.id
                  ? 'bg-[#2076C7] text-white border-[#2076C7]'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          {Object.entries(productCards).map(([tabId, products]) => (
            activeTab === tabId && (
              <div
                key={tabId}
                className={`custom-product-grid grid gap-4 sm:gap-6 ${tabId === 'investment'
                  ? 'grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4'
                  }`}
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

        {/* All Leads Table */}
        <LeadTable
          onEdit={(lead) => {
            console.log('Edit lead:', lead);
            // Add your edit logic here
          }}
          onDelete={(lead) => {
            console.log('Delete lead:', lead);
            // Add your delete logic here
          }}
        />
      </section>

      {/* Add CSS for hiding scrollbar */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .custom-product-grid {
          grid-template-columns: repeat(1, 1fr);
        }
  
        @media (min-width: 560px) and (max-width:767){
          .custom-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* 800px to 1023px - 2 columns */
        @media (min-width: 820px) {
          .custom-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
  
        /* 1024px and up - use Tailwind classes */
        @media (min-width: 1160px) {
          .custom-product-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (min-width: 1360px) {
          .custom-product-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>

      {/* Modal */}
      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}