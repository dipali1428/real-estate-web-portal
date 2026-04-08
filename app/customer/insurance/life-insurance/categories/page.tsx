"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  Grid
} from "lucide-react";
import LifeProductGrid from "../../../../products/life-insurance/components/LifeProductGrid";
import LifeInsuranceHeader from "../components/LifeInsuranceHeader";


export default function LifeInsuranceCategoriesPage() {
  const router = useRouter();

  return (
    <div className="flex-1 p-4 md:p-10 bg-[#FAFAFA] font-sans min-h-screen">
      
      {/* Header */}
      <LifeInsuranceHeader />


      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-4 md:p-6 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="rounded-[2rem] overflow-hidden">
             <LifeProductGrid />
          </div>
        </div>
      </div>

    </div>
  );
}
