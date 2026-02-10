'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
    const router = useRouter();
    const pathname = usePathname();

    // Hide only on home page
    if (pathname === '/') {
        return null;
    }

    const handleBack = () => {
        // If on property details page, navigate to live projects section
        if (pathname.startsWith('/properties/')) {
            // We can't easily scroll to hash on a different page in Next.js without a valid link
            // router.push('/#live') works but it's a navigation
            router.push('#live');
        } else {
            // Checking history length is tricky in Next.js App Router (server components mainly), 
            // but client components have access to window.
            if (typeof window !== 'undefined' && window.history.length > 1) {
                router.back();
            } else {
                router.push('/#live');
            }
        }
    };

    return (
        <button
            className="fixed bottom-6 left-6 z-[900] flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all duration-300 font-semibold text-sm group"
            onClick={handleBack}
            aria-label="Go back"
        >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
        </button>
    );
};

export default BackButton;
