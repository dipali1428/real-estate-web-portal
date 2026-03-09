'use client';
import React from 'react';

const GroupOfCompaniesPage = () => {
  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-t border-b border-[#1CADA3]/20 py-16">

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
              Group Of Companies
            </h2>

            <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>

            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Official corporate and regulatory registrations of the Infinity Arthvishva group.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-3">

            {/* ADVISORY CARD */}
            <div className="group p-[1px] rounded-2xl bg-linear-to-br from-[#2076C7]/20 to-[#1CADA3]/20 hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="bg-white rounded-[15px] p-10 h-full flex flex-col">

                <h5 className="text-[16px] font-sans font-semibold text-gray-700 mb-8 leading-relaxed tracking-wider min-h-[60px]">
                  INFINITY&nbsp;&nbsp;ARTHVISHVA <span className="text-[#2076C7]">ADVISORY</span>
                  <br />
                  PRIVATE&nbsp;&nbsp;LIMITED
                </h5>

                <div className="space-y-4 mt-auto">
                  <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-4 py-3 rounded-lg font-semibold shadow-sm text-center">
                    <div>
                      <div className="font-semibold">CIN (Corporate ID)</div>
                      <div className="font-mono text-xs mt-1">U66190PN2025PTC238981</div>
                    </div>
                  </div>

                  <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-4 py-3 rounded-lg font-semibold shadow-sm text-center">
                    <div>
                      <div className="font-semibold">GST Number</div>
                      <div className="font-mono text-xs mt-1">27AAICI0723K1ZJ</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* INSURANCE CARD */}
            <div className="group p-[1px] rounded-2xl bg-linear-to-br from-[#2076C7]/20 to-[#1CADA3]/20 hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="bg-white rounded-[15px] p-10 h-full flex flex-col">

                <h5 className="text-[16px] font-sans font-semibold text-gray-700 mb-8 leading-relaxed tracking-wider min-h-[60px]">
                  INFINITY&nbsp;&nbsp;ARTHVISHVA <span className="text-[#2076C7]">INSURANCE</span>
                  <br />
                  BROKER&nbsp;&nbsp;PRIVATE&nbsp;&nbsp;LIMITED
                </h5>

                <div className="space-y-4 mt-auto">
                  <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-4 py-3 rounded-lg font-semibold shadow-sm text-center">
                    <div>
                      <div className="font-semibold">CIN (Corporate ID)</div>
                      <div className="font-mono text-xs mt-1">U65110PN2025PTC241213</div>
                    </div>
                  </div>

                  <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-4 py-3 rounded-lg font-semibold shadow-sm text-center">
                    <div>
                      <div className="font-semibold">GST Number</div>
                      <div className="font-mono text-xs mt-1">Under Process</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* MUTUAL FUND CARD */}
            <div className="group p-[1px] rounded-2xl bg-linear-to-br from-[#2076C7]/20 to-[#1CADA3]/20 hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="bg-white rounded-[15px] p-10 h-full flex flex-col">

                <h5 className="text-[16px] font-sans font-semibold text-gray-700 mb-8 leading-relaxed tracking-wider min-h-[60px]">
                  INFINITY&nbsp;&nbsp;ARTHVISHVA <span className="text-[#2076C7]">MUTUAL&nbsp;&nbsp;FUND</span>
                  <br />
                  DISTRIBUTOR&nbsp;&nbsp;LLP
                </h5>

                <div className="space-y-4 mt-auto">

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-4 py-3 rounded-lg font-semibold shadow-sm text-center">
                      <div>
                        <div className="font-semibold">LLPIN</div>
                        <div className="font-mono text-xs mt-1">ACP-0126</div>
                      </div>
                    </div>

                    <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-4 py-3 rounded-lg font-semibold shadow-sm text-center">
                      <div>
                        <div className="font-semibold">ARN</div>
                        <div className="font-mono text-xs mt-1">347839</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-4 py-3 rounded-lg font-semibold shadow-sm text-center">
                    <div>
                      <div className="font-semibold">GST Number</div>
                      <div className="font-mono text-xs mt-1">27AALFI4941B1ZH</div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default GroupOfCompaniesPage;