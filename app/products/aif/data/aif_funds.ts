import {
    Briefcase, TrendingUp, Activity, Building, DollarSign
} from 'lucide-react';

export const aifStrategies = [
    {
        name: "360 ONE Multi-Stage Defense Fund",
        category: "Category II",
        theme: "Defense & Aerospace",
        manager: "Investment Team – 360 ONE Asset Management",
        desc: "Specializing in sector-focused growth capital managed by senior private equity professionals.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "II AIF",
            structure: "Closed-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6 Years",
            targetIRR: "18–22%",
            manager: "360 ONE Alternatives Investment Team",
            managerDescription: "The investment team brings deep experience in private equity and sector-focused capital allocation, with expertise in identifying scalable businesses aligned with India’s long-term structural growth themes.",
            strategyDescription: "The fund focuses on India’s rapidly expanding defense and aerospace ecosystem, investing across manufacturing, technology, and supply chain players benefiting from increasing domestic production and exports.",
            coreFocusAreas: [
                "Defense manufacturing",
                "Aerospace components",
                "Indigenous technology platforms",
                "Government-backed capex cycle"
            ],
            graphs: {
                sectorAllocation: [
                    { name: "Defense Manufacturing", value: 45 },
                    { name: "Aerospace & Components", value: 30 },
                    { name: "Technology & Systems", value: 15 },
                    { name: "Cash / Others", value: 10 }
                ],
                stageAllocation: [
                    { name: "Growth Stage", value: 60 },
                    { name: "Expansion Capital", value: 30 },
                    { name: "Pre-IPO", value: 10 }
                ],
                deployment: 65
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "ABSL Structured Opportunities Fund",
        category: "Category II",
        theme: "Structured Credit",
        manager: "Credit & Alternatives Team – Aditya Birla Sun Life AMC",
        desc: "Experienced structured credit professionals focused on secured debt investments.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "II AIF",
            structure: "Closed-Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–4 Years",
            targetIRR: "12–15% (Yield)",
            manager: "ABSL Credit & Alternatives Team",
            managerDescription: "Managed by the ABSL Credit & Alternatives Team, experienced in structured lending, risk assessment, and collateral-backed strategies.",
            strategyDescription: "A structured credit strategy investing in secured, asset-backed opportunities designed to generate predictable cash flows and downside protection.",
            coreFocusAreas: [
                "Senior secured debt",
                "Mezzanine financing",
                "Real asset-backed lending",
                "Structured corporate credit"
            ],
            graphs: {
                sectorAllocationTitle: "Credit Exposure Split",
                sectorAllocation: [
                    { name: "Senior Secured", value: 60 },
                    { name: "Mezzanine", value: 25 },
                    { name: "Structured Instruments", value: 15 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Real Estate", value: 35 },
                    { name: "Manufacturing", value: 25 },
                    { name: "Infrastructure", value: 20 },
                    { name: "Others", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Axis New Opportunities AIF",
        category: "Category II",
        theme: "Growth Capital",
        manager: "Private Equity Team – Axis AMC",
        desc: "Dedicated PE investment professionals focusing on mid-market growth companies.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "18–22%",
            manager: "Axis Private Equity Investment Team",
            managerDescription: "The team consists of experienced professionals with expertise in private equity investing, financial modeling, sector analysis, and deal execution. The investment committee follows a disciplined due diligence and governance framework.",
            strategyDescription: "Axis New Opportunities AIF focuses on investing in high-growth Indian businesses across sectors with strong scalability, competitive advantages, and long-term structural tailwinds.",
            coreFocusAreas: [
                "Growth-stage private companies",
                "Pre-IPO opportunities",
                "Scalable mid-market leaders",
                "Sector-agnostic approach"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Retail", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Technology", value: 20 },
                    { name: "Manufacturing", value: 15 },
                    { name: "Healthcare", value: 10 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Stage Allocation",
                stageAllocation: [
                    { name: "Growth Stage", value: 60 },
                    { name: "Late Stage / Pre-IPO", value: 30 },
                    { name: "Opportunistic", value: 10 }
                ],
                deployment: 70
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in PPM"
            }
        }
    },

    {
        name: "Nine Rivers Aurum Rising India Fund",
        category: "Category II",
        theme: "All-Cap India Growth",
        manager: "Siddhartha Khemka (CIO – Nine Rivers Capital)",
        desc: "Equity strategist with experience in long-term India growth investing.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "5+ Years",
            targetIRR: "Long-term capital appreciation",
            manager: "Siddhartha Khemka (CIO)",
            managerDescription: "Siddhartha Khemka brings extensive experience in Indian equity markets, focusing on fundamental research, sector rotation strategies, and risk-adjusted return optimization.",
            strategyDescription: "The Aurum Rising India Fund follows a long-only, high-conviction equity strategy focused on identifying scalable Indian businesses benefiting from structural economic growth.",
            coreFocusAreas: [
                "Large & Mid-cap Indian equities",
                "Structural growth sectors",
                "Strong balance sheet companies",
                "Sustainable earnings growth"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 50 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 10 },
                    { name: "Cash", value: 5 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financials", value: 20 },
                    { name: "Consumer", value: 18 },
                    { name: "Technology", value: 15 },
                    { name: "Industrials", value: 15 },
                    { name: "Healthcare", value: 12 },
                    { name: "Others", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Abakkus Four2Eight Opportunities Fund",
        category: "Category II",
        theme: "Emerging Businesses",
        manager: "Sunil Singhania",
        desc: "Veteran equity investor with decades of portfolio management experience.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "5+ Years",
            targetIRR: "Long-term capital appreciation",
            manager: "Sunil Singhania (Founder & CIO)",
            managerDescription: "Sunil Singhania is a veteran equity investor with decades of experience in Indian capital markets.",
            strategyDescription: "Abakkus Four2Eight Opportunities Fund focuses on identifying high-growth Indian businesses with strong scalability, sustainable earnings potential, and attractive long-term valuation comfort.",
            coreFocusAreas: [
                "Emerging mid & small-cap companies",
                "Businesses benefiting from India’s structural growth",
                "Strong promoter alignment",
                "High return on capital businesses"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Mid Cap", value: 45 },
                    { name: "Small Cap", value: 40 },
                    { name: "Large Cap", value: 10 },
                    { name: "Cash", value: 5 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Others", value: 28 },
                    { name: "Financial Services", value: 18 },
                    { name: "Industrials", value: 17 },
                    { name: "Consumer Discretionary", value: 15 },
                    { name: "Healthcare", value: 12 },
                    { name: "IT", value: 10 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "BanyanTree India Growth Capital Fund",
        category: "Category II",
        theme: "Private Equity",
        manager: "BanyanTree Advisors Investment Committee",
        desc: "Senior professionals specializing in mid-market growth capital.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6–7 Years",
            targetIRR: "18–22%",
            manager: "BanyanTree Advisors Investment Committee",
            managerDescription: "The investment committee comprises experienced private equity professionals with expertise in deal sourcing, due diligence, governance oversight, and portfolio value enhancement.",
            strategyDescription: "BanyanTree India Growth Capital Fund focuses on investing in high-quality, scalable mid-market Indian businesses with strong growth potential and experienced management teams.",
            coreFocusAreas: [
                "Mid-market growth companies",
                "Consumer & financial services",
                "Healthcare & manufacturing",
                "Asset-light scalable business models"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Healthcare", value: 15 },
                    { name: "Others", value: 20 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 70 },
                    { name: "Expansion Capital", value: 20 },
                    { name: "Pre-IPO", value: 10 }
                ],
                deployment: 75
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Piramal Investment Opportunities Fund",
        category: "Category II",
        theme: "Special Situations / Credit",
        manager: "Piramal Alternatives Investment Team",
        desc: "Structured credit and special situations specialists.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "12–16% Yield-Oriented",
            manager: "Piramal Alternatives Investment Team",
            managerDescription: "The team comprises experienced professionals in structured finance, private credit, and special situations investing.",
            strategyDescription: "Piramal Investment Opportunities Fund focuses on structured credit, special situations, and opportunistic investments across sectors with strong collateral backing and risk-managed structures.",
            coreFocusAreas: [
                "Structured corporate lending",
                "Special situations financing",
                "Real asset-backed credit",
                "Mezzanine & hybrid structures"
            ],
            graphs: {
                sectorAllocationTitle: "Credit Exposure Split",
                sectorAllocation: [
                    { name: "Senior Secured", value: 55 },
                    { name: "Mezzanine", value: 25 },
                    { name: "Structured Hybrid", value: 15 },
                    { name: "Cash / Others", value: 5 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Real Estate", value: 35 },
                    { name: "Infrastructure", value: 20 },
                    { name: "Manufacturing", value: 15 },
                    { name: "Financial Services", value: 15 },
                    { name: "Others", value: 15 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "TVS Shriram Growth Fund IV",
        category: "Category II",
        theme: "Mid-Market Private Equity",
        manager: "Gopal Srinivasan",
        desc: "Renowned PE investor with focus on scalable mid-market businesses.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6–7 Years",
            targetIRR: "18–22%",
            manager: "Gopal Srinivasan",
            managerDescription: "Gopal Srinivasan brings extensive experience in private equity and mid-market investing.",
            strategyDescription: "TVS Shriram Growth Fund IV focuses on investing in scalable mid-market Indian businesses with strong governance standards, capital efficiency, and long-term growth visibility.",
            coreFocusAreas: [
                "Financial services & NBFCs",
                "Consumer & retail businesses",
                "Healthcare & pharma services",
                "Technology-enabled platforms"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Financial Services", value: 35 },
                    { name: "Consumer & Retail", value: 25 },
                    { name: "Healthcare", value: 15 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 65 },
                    { name: "Expansion", value: 25 },
                    { name: "Pre-IPO", value: 10 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Seafund – Deep Tech Fund",
        category: "Category II",
        theme: "DeepTech / AI / Semiconductor",
        manager: "Rama Iyer – Founder, SEAFUND",
        desc: "Deep technology venture investor focused on hardware and semiconductor innovation.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "7 Years",
            targetIRR: "20%+ (Venture Profile)",
            manager: "Rama Iyer (Founder – SEAFUND)",
            managerDescription: "Rama Iyer is a deep technology venture investor with a focus on semiconductor design, hardware startups, and engineering-led innovation platforms.",
            strategyDescription: "Seafund – Deep Tech Fund focuses on investing in deep technology and engineering-led startups that build intellectual property-driven businesses in India.",
            coreFocusAreas: [
                "Semiconductor & chip design",
                "Artificial Intelligence / ML",
                "Robotics & automation",
                "Aerospace & defense technology",
                "Advanced materials & hardware"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Semiconductor & Electronics", value: 30 },
                    { name: "AI / Machine Learning", value: 25 },
                    { name: "Robotics & Automation", value: 20 },
                    { name: "Aerospace & Defense", value: 15 },
                    { name: "Other DeepTech", value: 10 }
                ],
                stageAllocationTitle: "Stage Allocation",
                stageAllocation: [
                    { name: "Early Stage", value: 40 },
                    { name: "Growth Stage", value: 40 },
                    { name: "Pre-IPO / Late Stage", value: 20 }
                ],
                deployment: 55
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Edelweiss Special Opportunities Fund",
        category: "Category II",
        theme: "Special Situations / Distressed",
        manager: "Edelweiss Alternatives Team",
        desc: "Focus: Stressed assets, turnaround opportunities",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "15–20% (Special Situations)",
            manager: "Edelweiss Alternatives Investment Team",
            managerDescription: "The Edelweiss Alternatives platform is one of India's established players in private credit and distressed investing. The team brings expertise in restructuring, legal resolution processes, asset-backed lending, and corporate turnaround strategies. The investment committee follows a structured evaluation framework including legal, financial, and operational due diligence.",
            strategyDescription: "Edelweiss Special Opportunities Fund focuses on investing in distressed, stressed, and special situation opportunities across sectors with strong turnaround potential. The fund aims to generate attractive risk-adjusted returns by identifying mispriced assets and complex situations where structured capital can unlock value.",
            coreFocusAreas: [
                "Distressed corporate debt",
                "Insolvency & bankruptcy resolution cases",
                "Special situations financing",
                "Asset-backed structured investments",
                "Turnaround equity opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Opportunity Allocation",
                sectorAllocation: [
                    { name: "Distressed Debt", value: 40 },
                    { name: "Insolvency Cases", value: 25 },
                    { name: "Structured Credit", value: 20 },
                    { name: "Special Situations Equity", value: 10 },
                    { name: "Cash / Others", value: 5 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Infrastructure", value: 25 },
                    { name: "Real Estate", value: 20 },
                    { name: "Manufacturing", value: 20 },
                    { name: "Financial Services", value: 15 },
                    { name: "Others", value: 20 }
                ],
                recoveryStrategy: [
                    { name: "Asset Resolution", value: 50 },
                    { name: "Strategic Sale", value: 30 },
                    { name: "Refinancing", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Kotak Special Situations Fund",
        category: "Category II",
        theme: "Distressed & Special Situations",
        manager: "Kotak Investment Advisors",
        desc: "Focus: Corporate restructuring & value unlocking",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "5+ Years",
            targetIRR: "15–20% (Special Situations)",
            manager: "Kotak Investment Advisors – Special Situations Team",
            managerDescription: "Kotak Investment Advisors is one of India's established alternative asset managers with expertise in private credit, restructuring, and special situations investing. The team combines financial restructuring experience, legal expertise, and sector knowledge to evaluate complex opportunities. The investment process includes detailed financial & legal due diligence, asset-level risk assessment, structured deal documentation, and active post-investment monitoring.",
            strategyDescription: "Kotak Special Situations Fund focuses on investing in distressed assets, structured credit, and complex corporate opportunities where capital restructuring and active involvement can unlock value. The fund targets situations where market dislocation, leverage stress, or special events create attractive entry valuations.",
            coreFocusAreas: [
                "Distressed corporate debt",
                "Insolvency & Bankruptcy Code (IBC) opportunities",
                "Structured equity & hybrid instruments",
                "Stressed real estate & infrastructure assets",
                "Event-driven corporate situations"
            ],
            graphs: {
                sectorAllocationTitle: "Opportunity Mix",
                sectorAllocation: [
                    { name: "Distressed Debt", value: 45 },
                    { name: "Structured Credit", value: 25 },
                    { name: "Special Situations Equity", value: 20 },
                    { name: "Opportunistic Financing", value: 10 }
                ],
                stageAllocationTitle: "Sector Exposure",
                stageAllocation: [
                    { name: "Infrastructure", value: 30 },
                    { name: "Real Estate", value: 25 },
                    { name: "Manufacturing", value: 20 },
                    { name: "Financial Services", value: 15 },
                    { name: "Others", value: 10 }
                ],
                recoveryStrategy: [
                    { name: "Asset Resolution & Sale", value: 50 },
                    { name: "Refinancing & Recapitalization", value: 30 },
                    { name: "Strategic Control", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "HDFC Capital Affordable Real Estate Fund",
        category: "Category II",
        theme: "Real Estate / Infrastructure",
        manager: "HDFC Capital Advisors",
        desc: "Focus: Affordable housing projects",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "14–18%",
            manager: "HDFC Capital Advisors Investment Team",
            managerDescription: "HDFC Capital Advisors specializes in real estate private equity and structured real estate investments. The team focuses on disciplined project selection, strong developer partnerships, and risk-managed capital structuring. The fund benefits from deep sector expertise and strong institutional underwriting standards.",
            strategyDescription: "HDFC Capital Affordable Real Estate Fund focuses on investing in affordable and mid-income housing projects across India, aligned with government-led housing initiatives and urbanization trends. The fund aims to generate steady risk-adjusted returns by investing in structured real estate opportunities with strong demand visibility.",
            coreFocusAreas: [
                "Affordable housing developments",
                "Mid-income residential projects",
                "Tier 1 & Tier 2 city expansion",
                "Structured real estate financing",
                "Joint development platforms"
            ],
            graphs: {
                sectorAllocationTitle: "Geographic Allocation",
                sectorAllocation: [
                    { name: "Mumbai Metropolitan Region", value: 30 },
                    { name: "NCR", value: 20 },
                    { name: "Bengaluru", value: 15 },
                    { name: "Pune", value: 15 },
                    { name: "Other Tier 2 Cities", value: 20 }
                ],
                stageAllocationTitle: "Project Stage Allocation",
                stageAllocation: [
                    { name: "Under Construction", value: 50 },
                    { name: "Early Development", value: 30 },
                    { name: "Near Completion", value: 20 }
                ],
                capitalStructure: [
                    { name: "Structured Debt", value: 50 },
                    { name: "Equity / Joint Development", value: 35 },
                    { name: "Mezzanine", value: 15 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "As per fund documentation",
                hurdle: "Defined in fund terms"
            }
        }
    },
    {
        name: "ICICI Venture Advantage Fund",
        category: "Category II",
        theme: "Private Equity Growth",
        manager: "ICICI Venture Team",
        desc: "Focus: Mid-market growth companies",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "18–22%",
            manager: "ICICI Venture Investment Team",
            managerDescription: "ICICI Venture is one of India's established private equity platforms with experience across multiple fund cycles. The investment team follows a rigorous evaluation process including financial due diligence, industry & competitive analysis, governance & promoter alignment review, and active board-level involvement post-investment.",
            strategyDescription: "ICICI Venture Advantage Fund focuses on investing in scalable mid-market and growth-stage Indian companies with strong business fundamentals and long-term value creation potential. The strategy emphasizes disciplined private equity investing, sector expertise, and structured exit planning. The fund aims to build long-term enterprise value through strategic capital deployment and governance oversight.",
            coreFocusAreas: [
                "Consumer & retail businesses",
                "Financial services",
                "Healthcare & pharma",
                "Technology-enabled companies",
                "Manufacturing & industrial growth"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Retail", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Healthcare", value: 15 },
                    { name: "Technology", value: 20 },
                    { name: "Industrials", value: 20 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 60 },
                    { name: "Expansion Capital", value: 25 },
                    { name: "Pre-IPO / Late Stage", value: 15 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Multiples Private Equity Fund",
        category: "Category II",
        theme: "Growth Capital",
        manager: "Renuka Ramnath – Founder & CEO",
        desc: "Focus: Consumer, financial services & healthcare",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6–8 Years",
            targetIRR: "18–22%",
            manager: "Renuka Ramnath (Founder, MD & CEO)",
            managerDescription: "Renuka Ramnath is a seasoned private equity professional with extensive experience in Indian growth capital investing. The firm follows a disciplined investment framework focusing on governance, scalability, and long-term value creation. The investment team conducts rigorous financial, operational, and management due diligence before capital deployment.",
            strategyDescription: "Multiples Private Equity Fund focuses on investing in high-quality Indian growth businesses with strong management teams, scalable models, and sustainable competitive advantages. The strategy emphasizes partnership-led investing, governance standards, and long-term enterprise value creation. The fund typically invests as a minority growth partner, supporting businesses in scaling operations and enhancing profitability.",
            coreFocusAreas: [
                "Financial Services",
                "Consumer & Retail",
                "Healthcare & Pharma",
                "Technology & Digital Platforms",
                "Industrials & Manufacturing"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 25 },
                    { name: "Healthcare", value: 15 },
                    { name: "Technology", value: 20 },
                    { name: "Industrials", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 70 },
                    { name: "Expansion Capital", value: 20 },
                    { name: "Late Stage / Pre-IPO", value: 10 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "True North Fund (India Private Equity)",
        category: "Category II",
        theme: "Private Equity",
        manager: "True North Investment Team",
        desc: "Focus: Scalable Indian businesses",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "18–22%",
            manager: "True North Investment Team",
            managerDescription: "True North is an established private equity platform in India with experience across multiple fund cycles. The investment team focuses on deep sector research, governance standards, structured deal execution, and value creation through operational improvement. The firm emphasizes long-term capital appreciation with disciplined risk management.",
            strategyDescription: "True North Fund focuses on investing in scalable Indian businesses with strong leadership teams and sustainable competitive advantages. The fund follows a disciplined private equity strategy aimed at long-term value creation through strategic partnerships, governance enhancement, and operational improvements. The strategy emphasizes minority and majority growth investments, active board participation, and structured exit planning.",
            coreFocusAreas: [
                "Financial Services",
                "Consumer & Retail",
                "Healthcare",
                "Technology-enabled businesses",
                "Industrial & Services sectors"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Financial Services", value: 28 },
                    { name: "Consumer", value: 22 },
                    { name: "Healthcare", value: 18 },
                    { name: "Technology", value: 17 },
                    { name: "Industrials & Others", value: 15 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 60 },
                    { name: "Expansion Capital", value: 25 },
                    { name: "Buyout / Control Deals", value: 15 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "ChrysCapital Fund",
        category: "Category II",
        theme: "Private Equity",
        manager: "Sanjiv Kaul – Managing Director",
        desc: "Focus: Growth & buyout investments",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "18–22%",
            manager: "ChrysCapital Investment Team",
            managerDescription: "ChrysCapital is one of India's established private equity firms with a track record across multiple fund cycles. The investment team follows a structured process including sector-specific research, financial and operational due diligence, governance enhancement, and strategic exit planning. The firm emphasizes disciplined capital allocation and long-term partnership with portfolio companies.",
            strategyDescription: "ChrysCapital Fund focuses on investing in high-growth, market-leading Indian businesses with strong management teams and scalable business models. The fund follows a disciplined private equity strategy centered on long-term value creation, operational enhancement, and strategic scaling. The strategy combines minority and control investments with active portfolio oversight.",
            coreFocusAreas: [
                "Financial Services",
                "Healthcare & Pharmaceuticals",
                "Consumer & Retail",
                "Technology & Digital Services",
                "Business Services"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Healthcare", value: 20 },
                    { name: "Consumer", value: 20 },
                    { name: "Technology", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 55 },
                    { name: "Expansion Capital", value: 30 },
                    { name: "Buyout / Control", value: 15 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically 20% over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "IIFL Special Opportunities Fund",
        category: "Category II",
        theme: "Structured Credit / Opportunistic",
        manager: "IIFL Alternatives Team",
        desc: "Focus: Credit & hybrid strategies",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "13–18%",
            manager: "IIFL Alternatives Investment Team",
            managerDescription: "IIFL Alternatives is a well-established alternative asset management platform with expertise in private credit and structured investments. The team follows a structured evaluation process including financial due diligence, legal & collateral assessment, risk structuring & covenant design, and ongoing monitoring & exit planning.",
            strategyDescription: "IIFL Special Opportunities Fund focuses on structured credit, opportunistic investments, and event-driven situations across sectors where capital structuring and risk mitigation can enhance returns. The fund seeks to generate attractive risk-adjusted returns through disciplined underwriting and asset-backed exposure. The strategy emphasizes downside protection through security structures and active monitoring.",
            coreFocusAreas: [
                "Structured corporate lending",
                "Distressed & special situation financing",
                "Asset-backed real estate credit",
                "Mezzanine & hybrid instruments",
                "Event-driven corporate restructuring"
            ],
            graphs: {
                sectorAllocationTitle: "Opportunity Allocation",
                sectorAllocation: [
                    { name: "Structured Credit", value: 40 },
                    { name: "Special Situations", value: 30 },
                    { name: "Distressed Opportunities", value: 20 },
                    { name: "Cash / Others", value: 10 }
                ],
                stageAllocationTitle: "Sector Exposure",
                stageAllocation: [
                    { name: "Real Estate", value: 30 },
                    { name: "Infrastructure", value: 20 },
                    { name: "Manufacturing", value: 15 },
                    { name: "Financial Services", value: 20 },
                    { name: "Others", value: 15 }
                ],
                securityStructure: [
                    { name: "Senior Secured", value: 50 },
                    { name: "Mezzanine", value: 30 },
                    { name: "Hybrid / Equity-linked", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically over hurdle",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "ASK Real Estate Special Opportunities Fund",
        category: "Category II",
        theme: "Real Estate Credit",
        manager: "ASK Property Investment Team",
        desc: "Focus: Structured real estate investments",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–5 Years",
            targetIRR: "14–18%",
            manager: "ASK Property Investment Advisors – Real Estate Investment Team",
            managerDescription: "ASK Property Investment Advisors specializes in structured real estate investments and project-level risk assessment. The team focuses on detailed project due diligence, developer background verification, legal & land title review, structured security creation, and active monitoring throughout project lifecycle. The platform emphasizes capital preservation alongside return generation.",
            strategyDescription: "ASK Real Estate Special Opportunities Fund focuses on investing in structured real estate opportunities across residential, commercial, and mixed-use developments in India. The fund seeks to generate attractive risk-adjusted returns through secured, asset-backed real estate investments with defined exit visibility. The strategy emphasizes downside protection via structured entry, project monitoring, and security-backed investments.",
            coreFocusAreas: [
                "Residential real estate projects",
                "Commercial developments",
                "Structured project financing",
                "Stressed / special real estate situations",
                "Tier 1 & Tier 2 city exposure"
            ],
            graphs: {
                sectorAllocationTitle: "Geographic Allocation",
                sectorAllocation: [
                    { name: "Mumbai Metropolitan Region", value: 35 },
                    { name: "NCR", value: 25 },
                    { name: "Bengaluru", value: 15 },
                    { name: "Pune", value: 10 },
                    { name: "Other Cities", value: 15 }
                ],
                stageAllocationTitle: "Project Stage Allocation",
                stageAllocation: [
                    { name: "Under Construction", value: 45 },
                    { name: "Early Development", value: 30 },
                    { name: "Near Completion", value: 25 }
                ],
                capitalStructure: [
                    { name: "Structured Debt", value: 50 },
                    { name: "Mezzanine / Hybrid", value: 30 },
                    { name: "Equity Participation", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "As defined in fund documentation",
                hurdle: "As per fund terms"
            }
        }
    },
    {
        name: "SBI Alternative Equity Fund",
        category: "Category III",
        theme: "Long-Short / Absolute Return",
        manager: "SBI Alternative Asset Team",
        desc: "Focus: Market-linked hedge-style strategy",
        link: "#",
        color: "",
        details: {
            category: "Category III AIF",
            structure: "Open / Close-Ended (as per scheme)",
            minCommitment: "₹1 Crore",
            tenure: "As per scheme",
            targetIRR: "Absolute Return Focus",
            manager: "SBI Alternatives Investment Team",
            managerDescription: "The team specializes in active equity management, derivatives strategies, and market-neutral positioning. The investment approach includes bottom-up stock research, quantitative risk analytics, tactical asset allocation, and strict exposure monitoring. The strategy aims to capture alpha while controlling volatility.",
            strategyDescription: "SBI Alternative Equity Fund follows a long-short equity strategy, aiming to generate absolute returns across market cycles through dynamic portfolio positioning. The fund invests in long positions in high-conviction stocks while taking short exposure in overvalued or weak businesses to manage downside risk. The strategy seeks to deliver consistent risk-adjusted returns with reduced market correlation.",
            coreFocusAreas: [
                "Long exposure to fundamentally strong companies",
                "Short exposure to overvalued or structurally weak stocks",
                "Tactical sector allocation",
                "Active risk management & leverage (within regulatory limits)"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation – Long Book",
                sectorAllocation: [
                    { name: "Financial Services", value: 25 },
                    { name: "IT & Technology", value: 20 },
                    { name: "Consumer", value: 15 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 25 }
                ],
                longShortSplit: [
                    { name: "Long Positions", value: 65 },
                    { name: "Short Positions", value: 35 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically performance-linked",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "India Discovery Fund – II",
        category: "Category I",
        theme: "Venture / Growth Strategy",
        manager: "35North Ventures Pvt Ltd",
        desc: "Identifying high-growth Indian businesses with scalable models and strong long-term value potential.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹25 Lakhs",
            tenure: "7 Years",
            targetIRR: "20%+",
            manager: "35North Ventures Pvt Ltd",
            managerDescription: "35North Ventures focuses on venture and growth-stage investments in India. The team specializes in identifying scalable businesses with strong governance standards and long-term growth visibility.",
            strategyDescription: "The fund follows a structured venture and growth capital approach, focusing on businesses with strong promoter alignment, scalable technology-driven models, clear unit economics, and high-growth market opportunities.",
            coreFocusAreas: [
                "Technology & SaaS",
                "Consumer internet platforms",
                "Fintech & digital infrastructure",
                "Innovation-led emerging sectors"
            ],
            graphs: {
                sectorAllocation: [
                    { name: "Technology", value: 40 },
                    { name: "Fintech", value: 20 },
                    { name: "Consumer Platforms", value: 20 },
                    { name: "Others", value: 20 }
                ],
                stageAllocation: [
                    { name: "Early Stage", value: 35 },
                    { name: "Growth Stage", value: 45 },
                    { name: "Pre-IPO", value: 20 }
                ],

            },
            fees: {
                management: "As per PPM",
                performance: "20% over 8% hurdle",
                hurdle: "8%"
            }
        }
    },
    {
        name: "Aikyam Stressed Assets Fund I",
        category: "Category I",
        theme: "Stressed / Special Situations Strategy",
        manager: "Aikyam Capital Management LLP",
        desc: "Capitalizing on opportunities in stressed asset resolution and corporate restructuring.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6–7 Years",
            targetIRR: "18-22%",
            manager: "Aikyam Capital Management LLP",
            managerDescription: "Aikyam Capital specializes in distressed and stressed asset investing. The team focuses on identifying undervalued opportunities through deep financial analysis, legal structuring expertise, and sector-level research.",
            strategyDescription: "The fund focuses on investing in stressed and distressed assets, primarily targeting opportunities arising from corporate restructuring, insolvency processes, and financial dislocations. It aims to generate superior risk-adjusted returns by acquiring assets at discounted valuations and unlocking value through structured resolution strategies.",
            coreFocusAreas: [
                "Insolvency & Bankruptcy Code (IBC) opportunities",
                "Distressed corporate debt",
                "Turnaround equity situations",
                "Asset-backed stressed investments",
                "Special situation financing"
            ],
            graphs: {
                sectorAllocationTitle: "Opportunity Mix",
                sectorAllocation: [
                    { name: "Distressed Debt", value: 45 },
                    { name: "IBC / Resolution Cases", value: 30 },
                    { name: "Special Situations Equity", value: 15 },
                    { name: "Opportunistic Financing", value: 10 }
                ],
                stageAllocationTitle: "Sector Exposure",
                stageAllocation: [
                    { name: "Infrastructure", value: 30 },
                    { name: "Real Estate", value: 20 },
                    { name: "Manufacturing", value: 20 },
                    { name: "Financial Services", value: 15 },
                    { name: "Others", value: 15 }
                ],
                resolutionStrategy: [
                    { name: "Asset Resolution & Sale", value: 50 },
                    { name: "Recapitalization", value: 30 },
                    { name: "Strategic Sale", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically carry-based",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Venture X Fund I",
        category: "Category I",
        theme: "Venture Capital Strategy",
        manager: "Alpha AIFs",
        desc: "Focusing on early-stage and high-growth Indian companies across emerging sectors driven by innovation and technology.",
        link: "#",
        color: "#4F46E5",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6–7 Years",
            targetIRR: "High Growth / Venture IRR",
            manager: "Alpha AIFs",
            managerDescription: "Alpha AIFs specializes in venture and early-stage investing, focusing on scalable business models with high-growth potential.",
            strategyDescription: "Venture X Fund I focuses on investing in early-stage and high-growth Indian companies across emerging sectors driven by innovation, technology adoption, and evolving consumer trends. The fund aims to generate long-term capital appreciation by identifying scalable business models with strong leadership and sustainable competitive advantages.",
            coreFocusAreas: [
                "Technology & SaaS platforms",
                "Digital consumer businesses",
                "Fintech & embedded finance",
                "Emerging scalable startups",
                "Innovation-led sectors"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Technology", value: 35 },
                    { name: "Fintech", value: 20 },
                    { name: "Consumer Platforms", value: 20 },
                    { name: "Healthcare Innovation", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Stage Allocation",
                stageAllocation: [
                    { name: "Seed / Angel", value: 30 },
                    { name: "Early Stage", value: 40 },
                    { name: "Growth Stage", value: 30 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically carry-based",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Beyondseed Angel Fund I",
        category: "Category I",
        theme: "Angel / Early-Stage Venture Strategy",
        manager: "Beyondseed India Pvt Ltd",
        desc: "Focusing on early-stage startups and emerging businesses with innovative models and scalable growth potential.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹25 Lakhs",
            tenure: "5–7 Years",
            targetIRR: "High Growth / Venture IRR",
            manager: "Beyondseed India Pvt Ltd",
            managerDescription: "Beyondseed India focuses on early-stage venture investments with a hands-on engagement approach. The team supports portfolio companies through strategic mentorship, governance guidance, and scaling advisory.",
            strategyDescription: "Beyondseed Angel Fund I focuses on investing in early-stage startups and emerging businesses with innovative models, strong founding teams, and scalable growth potential. The fund aims to identify disruptive ideas at the seed and pre-Series A stage and support them through capital, strategic guidance, and network access.",
            coreFocusAreas: [
                "Seed & Angel-stage startups",
                "Technology & SaaS ventures",
                "Consumer & digital platforms",
                "Fintech & innovation-led businesses",
                "Asset-light scalable models"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Technology & SaaS", value: 35 },
                    { name: "Consumer Internet", value: 25 },
                    { name: "Fintech", value: 20 },
                    { name: "Healthcare Innovation", value: 10 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Stage Allocation",
                stageAllocation: [
                    { name: "Angel / Seed", value: 50 },
                    { name: "Early Stage", value: 35 },
                    { name: "Pre-Series A", value: 15 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Equentis Angel Fund",
        category: "Category I",
        theme: "Angel Investment Strategy",
        manager: "Equentis Wealth Advisory Services Ltd",
        desc: "Focusing on early-stage startups and emerging growth businesses with scalable models and strong founding teams.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹25 Lakhs",
            tenure: "5–7 Years",
            targetIRR: "High Growth / Venture IRR",
            manager: "Equentis Wealth Advisory Services Ltd",
            managerDescription: "Equentis brings research-driven investment expertise with focus on identifying high-growth opportunities across emerging sectors.",
            strategyDescription: "Equentis Angel Fund focuses on investing in early-stage startups and emerging growth businesses with scalable models and strong founding teams. The fund aims to participate in high-potential companies at the seed and early growth stages, supporting them through capital, structured oversight, and network access.",
            coreFocusAreas: [
                "Early-stage technology startups",
                "Digital & consumer platforms",
                "Fintech & financial innovation",
                "Scalable asset-light businesses",
                "Emerging high-growth sectors"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Technology & SaaS", value: 40 },
                    { name: "Consumer Internet", value: 25 },
                    { name: "Fintech", value: 20 },
                    { name: "Healthcare / Others", value: 15 }
                ],
                stageAllocationTitle: "Stage Allocation",
                stageAllocation: [
                    { name: "Angel / Seed", value: 55 },
                    { name: "Early Stage", value: 30 },
                    { name: "Pre-Series A", value: 15 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Equirus InnovateX Fund",
        category: "Category I",
        theme: "Innovation / Growth Venture Strategy",
        manager: "Equirus",
        desc: "Focusing on innovation-led, high-growth Indian businesses across emerging sectors benefiting from technology disruption.",
        link: "#",
        color: "#4F46E5",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6–7 Years",
            targetIRR: "Growth-Oriented Capital Appreciation",
            manager: "Equirus",
            managerDescription: "The investment committee comprises experienced professionals with expertise in private equity, corporate advisory, and capital markets. The fund leverages Equirus’ broader advisory and capital markets ecosystem.",
            strategyDescription: "Equirus InnovateX Fund focuses on investing in innovation-led, high-growth Indian businesses across emerging sectors benefiting from technology disruption and structural economic shifts. The fund aims to identify scalable companies with strong management, differentiated positioning, and long-term value creation potential.",
            coreFocusAreas: [
                "Technology & SaaS platforms",
                "Digital transformation businesses",
                "Fintech & financial innovation",
                "New-age consumer brands",
                "Innovation-driven industrial sectors"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Technology", value: 35 },
                    { name: "Financial Innovation", value: 20 },
                    { name: "Consumer Brands", value: 20 },
                    { name: "Industrial Innovation", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Stage Allocation",
                stageAllocation: [
                    { name: "Growth Stage", value: 50 },
                    { name: "Early Stage", value: 30 },
                    { name: "Pre-IPO / Late Stage", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Getfive Opportunity Fund I",
        category: "Category I",
        theme: "Growth / Opportunity Strategy",
        manager: "Getfive Assets Advisors Pvt Ltd",
        desc: "Focusing on high-growth Indian businesses across emerging sectors with strong fundamentals and scalable business models.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6–7 Years",
            targetIRR: "Growth-Oriented Capital Appreciation",
            manager: "Getfive Assets Advisors Pvt Ltd",
            managerDescription: "Getfive focuses on identifying scalable Indian businesses with strong growth visibility. The team follows a structured evaluation process including financial analysis, governance review, and sector-level research.",
            strategyDescription: "Getfive Opportunity Fund I focuses on investing in high-growth Indian businesses across emerging sectors with strong fundamentals and scalable business models. The fund aims to generate long-term capital appreciation through disciplined capital allocation and strategic investment execution.",
            coreFocusAreas: [
                "Growth-stage companies",
                "Emerging sector leaders",
                "Asset-light scalable businesses",
                "Strong promoter-driven enterprises",
                "Businesses benefiting from structural economic trends"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Financial Services", value: 25 },
                    { name: "Technology", value: 20 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Stage", value: 60 },
                    { name: "Expansion Capital", value: 25 },
                    { name: "Pre-IPO / Special Situations", value: 15 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Lead Angels Fund",
        category: "Category I",
        theme: "Angel Investment Strategy",
        manager: "Lead Invest",
        desc: "Focusing on early-stage startups and high-growth emerging businesses across technology, consumer, and innovation-led sectors.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹25 Lakhs",
            tenure: "5–7 Years",
            targetIRR: "High Growth / Venture IRR",
            manager: "Lead Invest",
            managerDescription: "Lead Invest focuses on early-stage venture investments and angel funding. The team leverages strong founder networks and structured due diligence processes to identify scalable opportunities.",
            strategyDescription: "Lead Angels Fund focuses on investing in early-stage startups and high-growth emerging businesses across technology, consumer, and innovation-led sectors. The fund aims to support founders at the angel and seed stage, providing capital along with strategic guidance and access to an investor network.",
            coreFocusAreas: [
                "Seed & Angel-stage startups",
                "Technology & SaaS platforms",
                "Consumer internet businesses",
                "Fintech & digital innovation",
                "Asset-light scalable ventures"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Technology & SaaS", value: 40 },
                    { name: "Consumer Internet", value: 25 },
                    { name: "Fintech", value: 20 },
                    { name: "Healthcare / Others", value: 15 }
                ],
                stageAllocationTitle: "Stage Allocation",
                stageAllocation: [
                    { name: "Angel / Seed", value: 60 },
                    { name: "Early Stage", value: 30 },
                    { name: "Pre-Series A", value: 10 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Merisis Opportunities Fund",
        category: "Category I",
        theme: "Growth / Opportunity Strategy",
        manager: "Merisis Venture Partners",
        desc: "Focusing on growth-stage Indian businesses with scalable models, strong governance, and long-term value creation potential.",
        link: "#",
        color: "#4F46E5",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6–7 Years",
            targetIRR: "Growth-Oriented Capital Appreciation",
            manager: "Merisis Venture Partners",
            managerDescription: "Merisis Venture Partners focuses on identifying high-growth businesses through structured due diligence and disciplined capital deployment. The investment process includes sector-level research, financial & operational analysis, and governance assessment.",
            strategyDescription: "Merisis Opportunities Fund focuses on investing in growth-stage Indian businesses with scalable models, strong governance, and long-term value creation potential. The fund targets opportunities across emerging and structurally growing sectors, aiming to generate superior capital appreciation through disciplined investment selection.",
            coreFocusAreas: [
                "Growth-stage enterprises",
                "Technology & digital transformation",
                "Consumer & retail brands",
                "Financial services",
                "Emerging industrial sectors"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Financial Services", value: 25 },
                    { name: "Technology", value: 20 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 55 },
                    { name: "Expansion Capital", value: 30 },
                    { name: "Special Situations", value: 15 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Morphosis Venture Capital Fund I",
        category: "Category I",
        theme: "Venture Capital Strategy",
        manager: "Morphosis Venture Advisors LLP",
        desc: "Partnering with founders to build category-leading companies through disciplined capital allocation and active involvement.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6–7 Years",
            targetIRR: "Growth-Oriented Capital Appreciation",
            manager: "Morphosis Venture Advisors LLP",
            managerDescription: "Morphosis Venture Advisors focuses on identifying scalable businesses across emerging sectors. The investment team follows a structured due diligence process covering financial analysis, promoter assessment, governance review, and risk management.",
            strategyDescription: "Morphosis Venture Capital Fund I focuses on investing in early and growth-stage Indian businesses with strong scalability, governance standards, and long-term value creation potential. The fund aims to partner with founders to build category-leading companies through disciplined capital allocation and active involvement.",
            coreFocusAreas: [
                "Technology-enabled businesses",
                "Digital platforms",
                "Consumer & retail brands",
                "Financial services innovation",
                "Asset-light scalable enterprises"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Technology", value: 35 },
                    { name: "Consumer & Retail", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Digital Platforms", value: 10 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Stage Allocation",
                stageAllocation: [
                    { name: "Early Stage", value: 40 },
                    { name: "Growth Stage", value: 45 },
                    { name: "Pre-IPO / Late Stage", value: 15 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Rockstud Capital Investment Fund II",
        category: "Category I",
        theme: "Growth / Special Situations Strategy",
        manager: "Rockstud Capital LLP",
        desc: "Focusing on growth-stage and opportunistic Indian businesses across sectors with strong structural tailwinds.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6–7 Years",
            targetIRR: "Growth-Oriented Capital Appreciation",
            manager: "Rockstud Capital LLP",
            managerDescription: "Rockstud Capital focuses on identifying high-potential businesses through structured due diligence and disciplined capital allocation. The investment process includes sector-level research, financial & operational analysis, and promoter assessment.",
            strategyDescription: "Rockstud Capital Investment Fund II focuses on investing in growth-stage and opportunistic Indian businesses across sectors with strong structural tailwinds and value unlocking potential. The fund aims to generate long-term capital appreciation through disciplined selection of scalable companies and structured investment execution.",
            coreFocusAreas: [
                "Growth-stage enterprises",
                "Emerging sector leaders",
                "Special situation opportunities",
                "Businesses with operational turnaround potential",
                "Scalable mid-market companies"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Financial Services", value: 25 },
                    { name: "Technology", value: 20 },
                    { name: "Consumer & Retail", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 50 },
                    { name: "Expansion Capital", value: 30 },
                    { name: "Special Situations", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "India SME Growth Fund – Series 2",
        category: "Category I",
        theme: "SME / Growth Capital Strategy",
        manager: "Systematix Shares and Stock (India) Ltd",
        desc: "Focusing on small and medium enterprises (SMEs) with strong growth potential, scalable operations, and sound governance practices.",
        link: "#",
        color: "#4F46E5",
        details: {
            category: "Category I AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "6–7 Years",
            targetIRR: "Growth-Oriented Capital Appreciation",
            manager: "Systematix Shares and Stock (India) Ltd",
            managerDescription: "Systematix brings experience in capital markets, SME advisory, and growth capital investing. The team focuses on identifying fundamentally strong SME businesses with scalable potential and structured governance.",
            strategyDescription: "India SME Growth Fund – Series 2 focuses on investing in small and medium enterprises (SMEs) with strong growth potential, scalable operations, and sound governance practices. The fund aims to provide growth capital to promising SMEs that are positioned to benefit from India’s expanding domestic demand, formalization of businesses, and sectoral growth.",
            coreFocusAreas: [
                "Listed & pre-listed SMEs",
                "Manufacturing & industrial SMEs",
                "Consumer-driven businesses",
                "Financial services & niche segments",
                "Emerging growth sectors"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Manufacturing", value: 30 },
                    { name: "Consumer & Retail", value: 20 },
                    { name: "Financial Services", value: 15 },
                    { name: "Industrial Services", value: 20 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Market Cap Allocation",
                stageAllocation: [
                    { name: "SME Listed", value: 50 },
                    { name: "Pre-IPO / Growth SMEs", value: 30 },
                    { name: "Expansion Capital", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Edelweiss Alpha Fund",
        category: "Category III",
        theme: "Long / Short / Absolute Return Strategy",
        manager: "Edelweiss Asset Management",
        desc: "A hedge fund strategy aimed at generating absolute returns across market cycles through dynamic long-short equity positioning.",
        link: "#",
        color: "#4F46E5",
        details: {
            category: "Category III AIF",
            structure: "Open / Close-Ended (as per scheme)",
            minCommitment: "₹1 Crore",
            tenure: "Periodic Liquidity (Monthly/Quarterly)",
            targetIRR: "Absolute Return Objective",
            manager: "Edelweiss Asset Management – Alternatives Team",
            managerDescription: "Edelweiss Alternatives specializes in active equity and structured strategies. The team combines bottom-up fundamental research with quantitative risk analytics and tactical allocation strategies.",
            strategyDescription: "The fund follows a long-short equity strategy, investing in fundamentally strong companies (long positions) while taking short exposure in overvalued or structurally weak stocks. The objective is to deliver consistent alpha generation with reduced market correlation and active risk management.",
            coreFocusAreas: [
                "Long exposure to high-conviction stocks",
                "Short exposure to overvalued businesses",
                "Tactical sector allocation",
                "Active hedging & risk management",
                "Derivatives usage within regulatory limits"
            ],
            graphs: {
                sectorAllocationTitle: "Long vs Short Allocation",
                sectorAllocation: [
                    { name: "Long Book", value: 65 },
                    { name: "Short Book", value: 35 }
                ],
                stageAllocationTitle: "Exposure Structure",
                stageAllocation: [
                    { name: "Gross Exposure", value: 120 },
                    { name: "Net Exposure", value: 50 },
                    { name: "Short Exposure", value: 45 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Performance-linked carry",
                hurdle: "As defined in PPM"
            }
        }
    },
    {
        name: "Kotak Long-Short Fund",
        category: "Category III",
        theme: "Long / Short Equity Strategy",
        manager: "Kotak Investment Advisors Ltd",
        desc: "Aims to generate risk-adjusted absolute returns by combining long equity exposure with short-selling strategies to manage downside risk and volatility.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open / Close-Ended (as per scheme)",
            minCommitment: "₹1 Crore",
            tenure: "Periodic Liquidity (Monthly/Quarterly)",
            targetIRR: "Absolute Return Objective",
            manager: "Kotak Investment Advisors – Alternatives Team",
            managerDescription: "Kotak Investment Advisors is part of the Kotak Group’s alternative investment platform with experience in structured strategies and active equity management. The investment team focuses on bottom-up stock research, quantitative risk analytics, and dynamic exposure management.",
            strategyDescription: "The fund follows an active long-short equity approach designed to capitalize on market inefficiencies and sector rotations. The objective is to deliver alpha across market cycles while limiting drawdowns.",
            coreFocusAreas: [
                "Long positions in fundamentally strong, growth-oriented companies",
                "Short positions in overvalued or weak businesses",
                "Tactical asset allocation",
                "Use of derivatives for hedging and exposure control",
                "Active risk management framework"
            ],
            graphs: {
                sectorAllocationTitle: "Long vs Short Allocation",
                sectorAllocation: [
                    { name: "Long Book", value: 65 },
                    { name: "Short Book", value: 35 }
                ],
                stageAllocationTitle: "Exposure Structure",
                stageAllocation: [
                    { name: "Gross Exposure", value: 120 },
                    { name: "Net Exposure", value: 50 },
                    { name: "Short Exposure", value: 40 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Performance-linked",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "ICICI Prudential Long Short Fund",
        category: "Category III",
        theme: "Long / Short Equity Strategy",
        manager: "ICICI Prudential Asset Management Company Ltd",
        desc: "Aims to generate absolute returns with controlled volatility by dynamically balancing long and short equity exposures across sectors.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Monthly / Quarterly liquidity (as per scheme)",
            minCommitment: "₹1 Crore",
            tenure: "Periodic Liquidity (Monthly/Quarterly)",
            targetIRR: "Absolute Return Objective",
            manager: "ICICI Prudential Asset Management – Alternatives Division",
            managerDescription: "The investment team combines fundamental equity research expertise with quantitative risk management tools. The approach includes bottom-up research, quantitative risk monitoring, and derivatives-based hedging.",
            strategyDescription: "The fund follows a structured long-short equity approach that seeks to capture upside through high-conviction long positions while hedging downside via short-selling strategies. The objective is to provide steady alpha generation across market cycles.",
            coreFocusAreas: [
                "Capture upside through high-conviction long positions",
                "Hedge downside via short-selling strategies",
                "Maintain disciplined net exposure",
                "Reduce market dependency through active hedging",
                "Active risk management framework"
            ],
            graphs: {
                sectorAllocationTitle: "Long vs Short Split",
                sectorAllocation: [
                    { name: "Long Book", value: 65 },
                    { name: "Short Book", value: 35 }
                ],
                stageAllocationTitle: "Exposure Structure",
                stageAllocation: [
                    { name: "Gross Exposure", value: 115 },
                    { name: "Net Exposure", value: 40 },
                    { name: "Short Exposure", value: 40 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Performance-linked structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "IIFL Long Short Fund",
        category: "Category III",
        theme: "Long / Short Equity Strategy",
        manager: "IIFL Asset Management Ltd (IIFL Alternatives)",
        desc: "Aims to deliver absolute returns with controlled downside risk by dynamically managing long and short equity exposures across sectors.",
        link: "#",
        color: "#4F46E5",
        details: {
            category: "Category III AIF",
            structure: "Monthly / Quarterly liquidity (as per scheme)",
            minCommitment: "₹1 Crore",
            tenure: "Periodic Liquidity (Monthly/Quarterly)",
            targetIRR: "Absolute Return Objective",
            manager: "IIFL Alternatives – Equity Strategy Team",
            managerDescription: "IIFL Alternatives is an established alternative asset management platform with expertise in structured strategies and equity investing. The team focuses on bottom-up fundamental research and quantitative risk analytics.",
            strategyDescription: "The fund follows a long-short equity approach designed to generate alpha while reducing market dependency. The objective is to provide consistent, risk-adjusted performance across different market environments through active net exposure management.",
            coreFocusAreas: [
                "Long exposure to fundamentally strong companies",
                "Short exposure to overvalued or structurally weak stocks",
                "Tactical sector allocation",
                "Active net exposure management",
                "Derivatives usage for hedging"
            ],
            graphs: {
                sectorAllocationTitle: "Long vs Short Allocation",
                sectorAllocation: [
                    { name: "Long Book", value: 65 },
                    { name: "Short Book", value: 35 }
                ],
                stageAllocationTitle: "Exposure Structure",
                stageAllocation: [
                    { name: "Gross Exposure", value: 115 },
                    { name: "Net Exposure", value: 45 },
                    { name: "Short Exposure", value: 40 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Performance-linked structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "ASK Absolute Return Fund",
        category: "Category III",
        theme: "Long / Short Equity – Absolute Return",
        manager: "ASK Investment Managers Ltd",
        desc: "ASK Absolute Return Fund aims to generate consistent risk-adjusted returns across market cycles through active long-short positioning and disciplined exposure management.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open / Close-Ended (as per scheme)",
            minCommitment: "₹1 Crore",
            tenure: "Periodic Liquidity",
            targetIRR: "Absolute Return Objective",
            manager: "ASK Investment Managers – Alternatives Team",
            managerDescription: "The investment team at ASK Investment Managers has extensive experience in equity portfolio management and alternative strategies. The approach focuses on bottom-up fundamental research, quantitative risk analytics, and tactical allocation strategies to capture alpha while emphasizing capital preservation.",
            strategyDescription: "The fund follows a long-short equity strategy designed to capture alpha while limiting downside risk. It invests in fundamentally strong companies (long) while shorting overvalued or structurally weak stocks, dynamically adjusting net exposure to manage volatility and drawdowns.",
            coreFocusAreas: [
                "Long exposure to quality businesses",
                "Short exposure via overvalued stocks",
                "Tactical net exposure adjustment",
                "Use of derivatives for hedging",
                "Strict volatility & drawdown control"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation – Long Book",
                sectorAllocation: [
                    { name: "Financial Services", value: 25 },
                    { name: "IT & Technology", value: 20 },
                    { name: "Consumer", value: 15 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 25 }
                ],
                stageAllocationTitle: "Net vs Gross Exposure",
                stageAllocation: [
                    { name: "Gross Exposure", value: 120 },
                    { name: "Net Exposure", value: 45 },
                    { name: "Short Exposure", value: 45 }
                ],
                longShortSplit: [
                    { name: "Long Book", value: 65 },
                    { name: "Short Book", value: 35 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Performance-linked carry",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Avendus Absolute Return Fund",
        category: "Category III",
        theme: "Long / Short / Market Neutral Strategy",
        manager: "Avendus Capital Public Markets",
        desc: "Avendus Absolute Return Fund aims to generate consistent alpha with lower market correlation through dynamic long-short positioning and disciplined risk management.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open / Close-Ended (as per scheme)",
            minCommitment: "₹1 Crore",
            tenure: "Periodic Liquidity",
            targetIRR: "Absolute Return Objective",
            manager: "Avendus Capital Public Markets",
            managerDescription: "Avendus alternatives focuses on active equity and structured investment strategies. The team combines deep fundamental research, quantitative risk analytics, tactical sector allocation, and dynamic exposure management to balance alpha generation with capital protection.",
            strategyDescription: "The fund follows a structured long-short equity framework with an emphasis on capital preservation and volatility control. It utilizes high-conviction long positions, short exposure to overvalued businesses, and market-neutral positioning during volatile phases.",
            coreFocusAreas: [
                "High-conviction long positions",
                "Short exposure to weak businesses",
                "Tactical net exposure adjustment",
                "Market-neutral during volatility",
                "Use of derivatives for hedging"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation – Long Book",
                sectorAllocation: [
                    { name: "Financial Services", value: 25 },
                    { name: "IT & Technology", value: 20 },
                    { name: "Consumer", value: 15 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 25 }
                ],
                stageAllocationTitle: "Net vs Gross Exposure",
                stageAllocation: [
                    { name: "Gross Exposure", value: 125 },
                    { name: "Net Exposure", value: 40 },
                    { name: "Short Exposure", value: 50 }
                ],
                longShortSplit: [
                    { name: "Long Book", value: 62 },
                    { name: "Short Book", value: 38 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Performance-linked carry",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Edelweiss Market Neutral Fund",
        category: "Category III",
        theme: "Market Neutral / Arbitrage Strategy",
        manager: "Edelweiss Asset Management Ltd",
        desc: "Edelweiss Market Neutral Fund aims to generate stable absolute returns with minimal directional market exposure through structured arbitrage and hedged equity strategies.",
        link: "#",
        color: "#4F46E5",
        details: {
            category: "Category III AIF",
            structure: "Open / Close-Ended (as per scheme)",
            minCommitment: "₹1 Crore",
            tenure: "Periodic Liquidity",
            targetIRR: "Consistent Absolute Returns",
            manager: "Edelweiss Asset Management – Alternatives Division",
            managerDescription: "The alternatives team specializes in structured equity and risk-managed strategies. The investment process includes quantitative screening models, pair-trading frameworks, statistical arbitrage, continuous risk monitoring, and strict exposure controls to prioritize capital preservation and low volatility.",
            strategyDescription: "The fund follows a market-neutral strategy, seeking to eliminate broad market risk by balancing long and short exposures. It objective is to generate returns independent of overall market direction through long positions in undervalued stocks, short positions in overvalued stocks, and arbitrage opportunities.",
            coreFocusAreas: [
                "Undervalued Long positions",
                "Overvalued Short positions",
                "Index hedging (Beta reduction)",
                "Arbitrage (Cash-futures spreads)",
                "Strict volatility control"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Equity Long-Short", value: 60 },
                    { name: "Arbitrage", value: 25 },
                    { name: "Hedging & Tactical", value: 15 }
                ],
                stageAllocationTitle: "Net Exposure Profile",
                stageAllocation: [
                    { name: "Gross Exposure", value: 110 },
                    { name: "Net Exposure", value: 10 },
                    { name: "Short Exposure", value: 50 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Performance-linked",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Axis Long Short Fund",
        category: "Category III",
        theme: "Long / Short Equity Strategy",
        manager: "Axis Asset Management – Alternatives Division",
        desc: "Axis Long Short Fund aims to generate absolute returns with disciplined risk control by combining long equity exposure with strategic short positions to manage downside risk.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open / Close-Ended (as per scheme)",
            minCommitment: "₹1 Crore",
            tenure: "Periodic Liquidity",
            targetIRR: "Absolute Return Objective",
            manager: "Axis Asset Management – Alternatives Team",
            managerDescription: "The alternatives team at Axis combines bottom-up fundamental research, quantitative risk monitoring, tactical exposure adjustments, and strict volatility control mechanisms to emphasize alpha generation with controlled risk.",
            strategyDescription: "The fund follows an actively managed long-short equity approach, designed to capture market inefficiencies and sector rotations. It aims to reduce drawdowns during market corrections while participating in upside opportunities through high-conviction long positions and strategic short positions.",
            coreFocusAreas: [
                "High-conviction long positions",
                "Short positions in weak businesses",
                "Tactical sector rotation",
                "Active net exposure management",
                "Use of derivatives for hedging"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation – Long Portfolio",
                sectorAllocation: [
                    { name: "Financial Services", value: 25 },
                    { name: "IT & Technology", value: 20 },
                    { name: "Consumer", value: 15 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 25 }
                ],
                stageAllocationTitle: "Net vs Gross Exposure",
                stageAllocation: [
                    { name: "Gross Exposure", value: 120 },
                    { name: "Net Exposure", value: 50 },
                    { name: "Short Exposure", value: 40 }
                ],
                longShortSplit: [
                    { name: "Long Book", value: 65 },
                    { name: "Short Book", value: 35 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Performance-linked structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Tata Absolute Return Fund",
        category: "Category III",
        theme: "Long / Short Equity Strategy",
        manager: "Tata Asset Management Ltd – Alternatives Division",
        desc: "Tata Absolute Return Fund aims to deliver consistent risk-adjusted returns across market cycles through disciplined long-short positioning and active exposure management.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open / Close-Ended (as per scheme)",
            minCommitment: "₹1 Crore",
            tenure: "Periodic Liquidity",
            targetIRR: "Absolute Return Objective",
            manager: "Tata Asset Management – Alternatives Team",
            managerDescription: "The alternatives team leverages Tata Asset Management’s equity research platform and structured risk management systems. The investment process includes bottom-up fundamental stock research, quantitative exposure analytics, tactical hedging strategies, and strict drawdown and volatility management.",
            strategyDescription: "The fund follows a structured long-short equity framework, focusing on alpha generation while minimizing directional market risk. It seeks to protect capital during market corrections while capturing upside during growth phases through dynamic net exposure adjustment and use of derivatives.",
            coreFocusAreas: [
                "Long positions in quality stocks",
                "Short exposure in weak stocks",
                "Tactical sector allocation",
                "Dynamic net exposure adjustment",
                "Derivatives for risk control"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation – Long Portfolio",
                sectorAllocation: [
                    { name: "Financial Services", value: 25 },
                    { name: "IT & Technology", value: 20 },
                    { name: "Consumer", value: 15 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 25 }
                ],
                stageAllocationTitle: "Net vs Gross Exposure",
                stageAllocation: [
                    { name: "Gross Exposure", value: 120 },
                    { name: "Net Exposure", value: 45 },
                    { name: "Short Exposure", value: 42 }
                ],
                longShortSplit: [
                    { name: "Long Book", value: 65 },
                    { name: "Short Book", value: 35 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Performance-linked structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
];

export const aifComparisonData = [
    { name: "360 ONE Defense", cat: "II", type: "Sector PE", manager: "360 ONE Team", tenure: "6 yrs", min: "₹1 Cr" },
    { name: "Axis New Opp", cat: "II", type: "Growth PE", manager: "Axis PE Team", tenure: "5–7 yrs", min: "₹1 Cr" },
    { name: "Abakkus 428", cat: "II", type: "Emerging Growth", manager: "Sunil Singhania", tenure: "5+ yrs", min: "₹1 Cr" },
    { name: "India Discovery II", cat: "I", type: "Venture Capital", manager: "35North Ventures", tenure: "7 yrs", min: "₹1 Cr" },
    { name: "Equirus InnovateX", cat: "I", type: "Venture/Growth", manager: "Ajay Garg", tenure: "7 yrs", min: "₹1 Cr" },
    { name: "Getfive Opp Fund", cat: "I", type: "SME Growth", manager: "Getfive Assets", tenure: "5–6 yrs", min: "₹1 Cr" },
    { name: "Edelweiss Alpha", cat: "III", type: "Long/Short", manager: "Edelweiss", tenure: "3-5 yrs", min: "₹1 Cr" },
    { name: "Kotak Long-Short", cat: "III", type: "Long/Short", manager: "Kotak", tenure: "3-5 yrs", min: "₹1 Cr" },
    { name: "ICICI Pru L/S", cat: "III", type: "Market Neutral", manager: "ICICI Pru", tenure: "3-4 yrs", min: "₹1 Cr" },
    { name: "IIFL Long-Short", cat: "III", type: "Long/Short", manager: "IIFL", tenure: "Flexible", min: "₹1 Cr" },
];

export const aifFaqs = [
    { q: "What is an Alternative Investment Fund (AIF)?", a: "An Alternative Investment Fund (AIF) is a SEBI-registered investment vehicle that pools capital from sophisticated investors to invest in strategies beyond traditional mutual funds, such as private equity, structured credit, or special situations. AIFs are offered through private placement and typically require a minimum investment of ₹1 crore." },
    { q: "Who can invest in an AIF?", a: "AIFs are designed for High Net-Worth Individuals (HNIs), family offices, corporate bodies, and institutional investors who meet SEBI eligibility criteria. The minimum investment amount is ₹1 crore per investor." },
    { q: "What is the tax treatment for AIF investments?", a: "Taxation depends on the AIF category. Category I & II AIFs generally enjoy pass-through status, meaning income (other than business income) is taxed directly in the hands of investors. Category III AIFs are taxed at the fund level depending on the investment structure. Investors are advised to consult their tax advisor for personalized guidance." },
    { q: "What is the typical tenure of an AIF?", a: "Most AIFs are close-ended funds with a fixed tenure, typically ranging from 3 to 7 years. Extensions may be allowed subject to investor approval and SEBI regulations." },
    { q: "Is there a lock-in period in AIFs?", a: "Yes. Since most AIFs are close-ended, capital is generally locked in for the tenure of the fund. Early exit options, if available, depend on fund structure and secondary transfer opportunities." },
    { q: "How are AIFs different from PMS?", a: "While PMS offers customized equity portfolios with a ₹50 lakh minimum investment, AIFs pool investor capital into structured strategies such as private equity, credit, or special situations. AIFs typically require a ₹1 crore minimum investment and operate under a defined fund tenure." },
    { q: "How are returns generated in AIFs?", a: "Returns depend on the strategy of the fund and may come from: Capital appreciation, Structured interest income, Dividends, or Exit from private investments. Returns are market-linked and not guaranteed." },
    { q: "What risks are involved in AIF investments?", a: "AIF investments may involve market risk, liquidity risk, concentration risk, and strategy-specific risks. Investors should carefully review the Private Placement Memorandum (PPM) before investing." }
];

export const aifFloatingTags = [
    { label: "PRIVATE EQUITY", icon: Briefcase, pos: "top-[-30px] left-[-50px]", delay: 0, color: "#8b5cf6" },
    { label: "VENTURE CAPITAL", icon: TrendingUp, pos: "bottom-[-30px] left-[-30px]", delay: 0.8, color: "#2076C7" },
    { label: "HEDGE FUNDS", icon: Activity, pos: "bottom-[-30px] right-[-50px]", delay: 0.5, color: "#ef4444" },
    { label: "INFRASTRUCTURE", icon: Building, pos: "top-[-30px] right-[-50px]", delay: 1, color: "#1CADA3" },
    { label: "REAL ESTATE", icon: DollarSign, pos: "top-[50%] -right-[60px]", delay: 1.2, color: "#f59e0b" },
];
