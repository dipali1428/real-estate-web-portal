'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    IconBuildingStore, 
    IconShieldCheck, 
    IconInfoCircle 
} from '@tabler/icons-react';
import CattleInsuranceSection from './components/CattleInsuranceSection';

export default function CattleInsuranceDashboard() {
    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
            <CattleInsuranceSection isDashboard={true} />
        </div>
    );
}
