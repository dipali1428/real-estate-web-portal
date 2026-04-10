import { Bond } from "../data/bondsData";

export interface BondInsight {
    productOverview: string;
    benefits: string[];
    riskProfile: string;
}

export function getBondInsight(bond: Bond): BondInsight {
    const company = bond.company.toLowerCase();
    
    const insight: BondInsight = {
        productOverview: `Issuance by ${bond.company}, offering a structured fixed-income opportunity with a focus on stable continuous returns.`,
        benefits: [],
        riskProfile: "Moderate"
    };

    // --- ISSUER SPECIFIC OVERVIEWS ---
    if (company.includes("punjab national") || company.includes("canara") || company.includes("sbi")) {
        insight.productOverview = `${bond.company} is one of India's premier public sector banks, deeply integrated into the national economy. These financial sector bonds are designed to bolster core capital, presenting a robust opportunity for high-yield seekers to earn institutional-grade interest rates from a systemic Indian bank.`;
    } else if (company.includes("rec limited") || company.includes("pfc") || company.includes("power finance")) {
        insight.productOverview = `${bond.company} is a highly strategic Maharatna Central Public Sector Enterprise (CPSE) under the Ministry of Power. This bond directly participates in financing India's massive power and infrastructure framework, providing unparalleled stability backed by Government initiatives.`;
    } else if (company.includes("nhai")) {
        insight.productOverview = `The National Highways Authority of India (NHAI) is the nodal agency for India's highway development. Bonds issued by NHAI are considered pseudo-sovereign, carrying the highest AAA rating and offering total capital protection while you fuel the nation's infrastructural backbone.`;
    } else if (company.includes("irfc")) {
        insight.productOverview = `Indian Railway Finance Corporation (IRFC) is the dedicated funding arm of Indian Railways. It is a Schedule ‘A’ Miniratna Public Sector Enterprise. IRFC bonds are celebrated for their rock-solid safety profile and zero default history.`;
    } else if (company.includes("sgb") || company.includes("sovereign gold")) {
        insight.productOverview = `Sovereign Gold Bonds (SGBs) are government securities denominated in grams of gold, issued directly by the Reserve Bank of India (RBI) on behalf of the Government of India. They present a superior alternative to holding physical gold—eliminating storage costs and making risks while providing an additional fixed interest payout.`;
    } else if (company.includes("muthoot") || company.includes("manappuram") || company.includes("indel") || company.includes("aye finance")) {
        insight.productOverview = `${bond.company} stands as a prominent titan in the Indian NBFC landscape. These corporate bonds reflect the company's massively collateralized loan book and deep financial liquidity, delivering a strong yield premium over standard banking deposits for yield-focused investors.`;
    } else if (company.includes("state sdl") || company.includes("uttar pradesh power") || company.includes("rajasthan rajya") || company.includes("kerala infrastructure") || company.includes("state beverages")) {
        insight.productOverview = `State-Guaranteed bonds or State Development Loans (SDLs) are securities issued by Indian state entities to fund high-priority developmental projects. They carry an explicit or implicit sovereign guarantee, meaning they rival Central Government bonds in absolute safety while frequently offering slightly better yield spreads.`;
    } else if (company.includes("hdfc") || company.includes("tata capital") || company.includes("aditya birla") || company.includes("bajaj") || company.includes("l&t") || company.includes("shriram") || company.includes("mahindra")) {
        insight.productOverview = `${bond.company} represents the highest echelon of India's private financial sector conglomerates. With fortress-like balance sheets and impeccable management, these corporate bonds are favored by conservative investors seeking the ultimate blend of safety and private-sector efficiency.`;
    } else if (company.includes("hudco")) {
        insight.productOverview = `Housing and Urban Development Corporation (HUDCO) is a premier techno-financing public sector enterprise. By investing in HUDCO bonds, you are securing top-tier public asset safety while contributing to national housing and urban infrastructure paradigms.`;
    } else if (company.includes("ntpc") || company.includes("nhpc")) {
        insight.productOverview = `${bond.company} is a leading Government of India enterprise dominating the national energy sector. As a Navratna/Maharatna utility company, its cash flows are highly predictive, making its debt issuances incredibly safe and reliable long-term havens.`;
    } else if (company.includes("nabard") || company.includes("sidbi")) {
        insight.productOverview = `${bond.company} is an apex regulatory body and developmental financial institution in India. Purchasing their bonds securely channels funds towards critical socio-economic sectors like agriculture or MSMEs while assuring you absolute sovereign-grade principal safety.`;
    }

    // --- CATEGORY & TYPE SPECIFIC BENEFITS ---
    if (bond.category === "SGB") {
        insight.benefits.push("100% Sovereign Guarantee evaluated safely by the Government of India via RBI.");
        insight.benefits.push("Total Capital Gains Tax Exemption upon maturity, unlike physical gold.");
        insight.benefits.push(`Fixed ${bond.coupon} annual interest payout over and above the asset appreciation.`);
        insight.benefits.push("Eliminates making charges, storage costs, locker rentals, and purity risks of physical gold.");
        insight.riskProfile = "Zero Default Risk (Sovereign)";
    } 
    else if (bond.category === "TaxFree" || bond.type === "Tax-Free") {
        insight.benefits.push("Absolute Tax Exemption: Interest earned is completely tax-free under Section 10(15)(iv)(h) of the IT Act.");
        insight.benefits.push("No TDS (Tax Deducted at Source) applicable on the interest payouts ever.");
        insight.benefits.push("Highest Credit Safety: Typically issued by top-tier Public Sector Undertakings (PSUs).");
        insight.benefits.push("Highly liquid due to tradability on the secondary market.");
        insight.riskProfile = "Virtually Risk-Free (AAA / Government Backed)";
    } 
    else if (bond.category === "PSU") {
        insight.benefits.push("Vast Implicit Government Backing ensuring immense capital safety.");
        insight.benefits.push("Consistent, predictable, and heavily regulated timely interest payouts.");
        insight.benefits.push(`Excellent long-term harbor for conservative wealth preservation.`);
        insight.riskProfile = "Very Low Risk (PSU Default is highly improbable)";
    }
    else if (bond.category === "StateGuaranteed") {
        insight.benefits.push("Direct State Government backing completely guarantees principal and interest payouts.");
        insight.benefits.push("Offers a lucrative yield spread (generally 0.25%-0.50% higher) compared strictly to Central G-Secs.");
        insight.benefits.push("Transparently helps finance crucial state-level socio-economic and infrastructural development.");
        insight.riskProfile = "Sovereign Equivalent (Very Low Risk)";
    }
    else if (bond.category === "Private") {
        insight.benefits.push(`Maximizes portfolio returns with a highly competitive yield of ${bond.yield}.`);
        insight.benefits.push("Superior yield generation combating long-term inflation effects much better than traditional FDs.");
        insight.benefits.push("Rigorously rated by agencies like CRISIL/ICRA to mandate strict financial transparency.");
        if (bond.type === "Secured") {
            insight.benefits.push("Secured inherently by specific physical or financial assets of the company, firmly protecting your principal.");
        } else {
            insight.benefits.push("Senior unsecured status often ranks higher than equity shareholders in the event of liquidations.");
        }
        insight.riskProfile = bond.rating.includes("AAA") ? "Low Risk (Premium Corporate Credit)" : "Moderate Risk (Standard Corporate Credit)";
    }

    // Add generic ones if empty
    if (insight.benefits.length === 0) {
        if (bond.type === "Secured") insight.benefits.push("Secured by company assets protecting principal investment.");
        insight.benefits.push("Regular cash-flow generation through scheduled coupon payments.");
        insight.benefits.push("Excellent diversification tool to hedge heavily against equity market volatility.");
        insight.riskProfile = bond.rating || "Moderate Risk";
    }

    return insight;
}
