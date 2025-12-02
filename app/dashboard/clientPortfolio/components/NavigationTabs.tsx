"use client"
import React from 'react';
import { ActiveTab } from '../types';

interface NavigationTabsProps {
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
    tabCounts: {
        clients: number;
        leads: number;
        applications: number;
        documents: number;
        earnings: number;
    };
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
    activeTab,
    setActiveTab,
    tabCounts
}) => {
    const tabs: { id: ActiveTab; name: string }[] = [
        { id: 'clients', name: 'Clients' },
        { id: 'leads', name: 'Leads' },
        { id: 'applications', name: 'Applications' },
        { id: 'documents', name: 'Documents' },
        { id: 'earnings', name: 'Earnings' }
    ];

    return (
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
                        <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${activeTab === tab.id ? 'bg-white text-[#2076C7]' : 'bg-slate-100 text-slate-700'
                            }`}>
                            {tabCounts[tab.id]}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NavigationTabs;