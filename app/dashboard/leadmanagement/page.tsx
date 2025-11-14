"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddLeadModal from "./AddLeadModal";
import LifeInsuranceForm from "./lifeinsuranceform";
import HealthInsuranceForm from "./healthisurancform";
import MotorInsuranceForm from "./motorinsuranceform";
import TravelInsuranceForm from "./TravelInsuranceForm"
import  PropertyInsuranceForm from "./pif";
import  CattleInsuranceForm from "./cattleinsuranceform";
import  MarineInsuranceForm from "./marineinsuranceform";
import  HomeLoanForm from "./homeloanform";
import  PersonalLoanForm from "./personaloanform";
import  BusinessLoanForm from "./businessloanform"
import  MortgageLoanForm from "./mortgageloanform";
import  SMELoanForm from "./semform";
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
  // Tabs list
  const tabs = [
    { id: "insurance", label: "Insurance" },
    { id: "loans", label: "Loans" },
    { id: "unlisted", label: "Unlisted" },
    { id: "investment", label: "Investment" },
    { id: "real_estate", label: "Real Estate" },
  ];

  return (
    <>
      {/* ======= Lead Management Section ======= */}
      <section id="lead-management" className="p-8 bg-gray-50 min-h-screen">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Lead Management
        </h1>
        <p className="text-gray-600 mb-8">
          Efficiently manage your sales pipeline from initial contact to
          conversion. Track all potential clients and their journey.
        </p>

        {/* Header Row */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-700"></h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add New Lead
          </button>
        </div>

        {/* Tabs / Navbar */}
        <div className="flex border-b border-gray-200 mb-6 space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 font-medium ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== Tab Content ===== */}
        <div className="bg-white p-6 rounded-lg shadow">
          {/* === Insurance Tab === */}
          {activeTab === "insurance" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Life Insurance */}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Life Insurance
                  </h2>
                 <p className="text-sm mb-4 leading-relaxed">
                    Life insurance provides financial security to beneficiaries
                    by offering a lump-sum payment upon the policyholder's death.
                  </p>

                  <ul className="list-disc list-inside space-y-2 text-sm mb-4">
                    <li>Term life insurance offers coverage for 10‒30 years.</li>
                    <li>Helps dependents maintain financial stability post-loss.</li>
                  </ul>

                </div>
                <button   onClick={() => setShowLifeInsuranceForm(true)} 
                  className="flex items-center gap-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Click to Add New
                </button>
              </div>

              {/* Health Insurance */}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Health Insurance
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Covers medical, surgical, and prescription expenses incurred
                    by the insured, reimbursing or paying providers directly.
                  </p>
                </div>
                <button onClick={() => setShowHealthInsuranceForm(true)} 
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>

              {/* Motor Insurance */}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Motor Insurance
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Protects vehicles against loss or damage due to accidents,
                    theft, natural disasters, or third-party liabilities.
                  </p>
                </div>
                <button onClick={() => setShowMotorInsuranceForm(true)}
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>
             
               {/* Travel Insurance */}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Travel Insurance
                  </h2>
                  <p className="text-sm leading-relaxed">
                   Travel insurance protects travelers from unexpected costs like medical emergencies or trip cancellations. </p>
                </div>
                <button onClick={() => setShowTravelInsuranceForm(true)}
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>
                {/*Property  Insurance */}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Property Insurance
                  </h2>
                  <p className="text-sm leading-relaxed">
                  Property insurance is a type of coverage that protects physical assets-such as homes, buildings, 
                  and personal belongings-against risks like damage, theft, or loss. It ensures financial 
                  compensation when unforeseen events affect your property.
                                 
                  </p>
                </div>
                <button onClick={() => setShowPropertyInsuranceForm(true)}
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>
              {/* Cattle Insurance */}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                    Cattle Insurance
                  </h2>
                  <p className="text-sm leading-relaxed">
                  Cattle insurance protects farmers from financial loss if their animals die, get sick, or face accidents.  </p>
                </div>
                <button onClick={() => setShowCattleInsuranceForm(true)}
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>

              {/* Marine Insurance */}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-center">
                   Marine Insurance
                  </h2>
                   <p className="text-sm leading-relaxed">
                   Marine insurance protects ships, cargo, and goods against loss or damage during transit by sea. </p>
                </div>
                <button onClick={() => setShowMarineInsuranceForm(true)}
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>
              </div>

            
          )}
           {activeTab ==="loans" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Home Loans */}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                <h2 className="text-xl font-semibold mb-3">Home Loans</h2>
                <p className="text-sm mb-6">
                  A home loan, also known as a mortgage, is a type of loan 
                  specifically designed to help individuals purchase a home. 
                  When you take out a home loan, you borrow money from a lender 
                  (usually a bank or a financial institution) to buy a property.
                </p> 
                </div>
                <button onClick={() => setShowHomeLoanForm(true)}
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>
             {/* Personal Loans*/}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                <h2 className="text-xl font-semibold mb-3">Personal Loans</h2>
                <p className="text-sm mb-6">
                  A personal loan is a type of loan that you can use for almost 
                  any personal expense, such as consolidating debt, paying for 
                  medical bills, home improvements, or even funding a big purchase like a car.
                </p>     
                </div>
                <button onClick={() => setShowPersonalLoanForm(true)} 
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>
             {/* Business Loan*/}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                <h2 className="text-xl font-semibold mb-3">Business Loan</h2>
                <p className="text-sm mb-6">A business loan is a loan specifically 
                  intended to help a business cover various expenses, such as startup costs, 
                  expanding operations, purchasing equipment, or managing cash flow. These loans are 
                  typically provided by banks, credit unions, or alternative lenders and come in different forms 
                  depending on the needs of the business.</p>
                  </div>
                <button onClick={() => setShowBusinessLoanForm(true)} 
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>
             {/*Mortgage Loans*/}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                <h2 className="text-xl font-semibold mb-3">Mortgage Loans</h2>
                <p className="text-sm mb-6">A mortgage loan is a type of home loan that allows you to borrow money 
                  from a lender (usually a bank or mortgage lender) to buy a home or property. The loan is secured by 
                  the property itself, meaning that if you fail to repay the loan, the lender can take possession of the 
                  home through a legal process called foreclosure.</p></div>
                <button onClick={() => setShowMortgageLoanForm(true)}  
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>
              {/* SME*/}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                <h2 className="text-xl font-semibold mb-3">SME</h2>
                <p className="text-sm mb-6">SME stands for Small and Medium-sized Enterprises. 
                  These are businesses that have a relatively small to medium scale of operations, 
                  in terms of employees, revenue, or assets, compared to large corporations. 
                  SMEs are vital to economies worldwide, as they contribute significantly to job creation, 
                  innovation, and economic growth.</p></div>
                <button onClick={() => setShowSMELoanForm(true)}
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>
              {/* Education loan*/}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                <h2 className="text-xl font-semibold mb-3">Education loan</h2>
                <p className="text-sm mb-6">An education loan is a type of loan specifically designed to 
                  help students finance their education. It covers expenses such as tuition fees, books, 
                  living expenses, and sometimes other education-related costs like equipment or transportation. 
                  Education loans are commonly offered by banks, financial institutions, and government schemes</p></div>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>
              {/* Balance Transfer*/}
              <div className="bg-white text-black rounded-lg shadow p-6 justify-between">
                <div>
                <h2 className="text-xl font-semibold mb-3">Balance transfer</h2>
                <p className="text-sm mb-6">A Balance Transfer allows you to move your existing debt 
                  (usually from a credit card or a loan) to another lender offering better terms, typically with a 
                  lower interest rate. Top -up loan A Top-up Loan is an additional loan taken on an existing loan,
                   typically a home loan, to borrow more money over and above the original loan amount.</p></div>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>
              
            {/* Vehicle Loan*/}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <h2 className="text-xl font-semibold mb-3">Vehicle Loan</h2>
                <p className="text-sm mb-6">A vehicle loan is a type of loan specifically designed to help individuals or 
                  businesses purchase a vehicle, such as a car, motorcycle, truck, or commercial vehicle. 
                  The loan is typically offered by banks, financial institutions, or auto dealerships, and the vehicle 
                  itself acts as collateral for the loan.</p>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>
            {/* loan against securities / MF*/}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <h2 className="text-xl font-semibold mb-3">loan against securities / MF</h2>
                <p className="text-sm mb-6">A loan against securities is a type of secured loan where you pledge your 
                  financial assets, such as stocks, bonds, mutual funds, or other securities, as collateral to secure the loan. 
                  The lender offers you a loan based on the value of the securities you pledge.</p>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>
             {/* Debt Capital Market (DCM)*/}
              <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col justify-between">
                <h2 className="text-xl font-semibold mb-3">Debt Capital Market (DCM)</h2>
                <p className="text-sm mb-6">The Debt Capital Market refers to the market where companies, governments, 
                  and other entities issue debt securities to raise capital. These debt instruments are typically bonds, 
                  notes, or debentures. Loan syndication is the process in which a group of lenders 
                  (often banks or other financial institutions) come together to provide a large loan to a borrower.</p>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>
               </div>
          )}

          {activeTab === "unlisted" && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* unlisted */}
              <div className="bg-white text-black rounded-lg shadow p-6 ">
                <h2 className="text-xl font-semibold mb-3">Unlisted</h2>
                <p className="text-sm mb-6"></p>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>
            </div>
              
          )}

          {activeTab === "investment" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Mutual Fund */}
              <div className="bg-[white] text-black p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-3">Mutual Fund</h2>
                <p className="text-sm mb-6">
                  A mutual fund is a type of investment vehicle that pools money
                  from many investors to purchase a diversified portfolio of
                  stocks, bonds, or other securities.
                </p>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>

              {/* Wealth Management */}
              <div className="bg-[white] text-black p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-3">Wealth Management</h2>
                <p className="text-sm mb-6">
                  Wealth management helps individuals manage and grow their
                  wealth with personalized strategies.
                </p>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>

              {/* PMS / AIF */}
              <div className="bg-[white] text-black p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-3">PMS / AIF</h2>
                <p className="text-sm mb-6">
                  PMS offers personalized investment services. AIFs invest in
                  assets like private equity, hedge funds, and real estate.
                </p>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>

              {/* Fixed Deposit */}
              <div className="bg-[white] text-black p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-3">Fixed Deposit</h2>
                <p className="text-sm mb-6">
                  A Fixed Deposit (FD) offers a fixed return over a set period —
                  ideal for low-risk investors.
                </p>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>

              {/* Bonds */}
              <div className="bg-[white] text-black p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-3">Bonds</h2>
                <p className="text-sm mb-6">
                  Bonds are fixed-income instruments providing regular interest
                  and principal return at maturity.
                </p>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>

              {/* Real Estate Investment */}
              <div className="bg-[white] text-black p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-3">
                  Real Estate Investment
                </h2>
                <p className="text-sm mb-6">
                  Real estate investment involves buying or renting property to
                  generate income or profit.
                </p>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">
                  Click to Add New
                </button>
              </div>
            </div>
          )}

          {activeTab === "real_estate" && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* */}
              <div className="bg-white text-black rounded-lg shadow p-6 ">
                <h2 className="text-xl font-semibold mb-3"></h2>
                <p className="text-sm mb-6"></p>
                <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded hover:bg-[#16948d] transition">Click to Add New</button>
                </div>

              </div>
          )}
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
