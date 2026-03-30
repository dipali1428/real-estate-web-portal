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
                    { name: "Structured Credit", value: 45 },
                    { name: "Real Estate Credit", value: 25 },
                    { name: "Special Situations", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Sector Exposure",
                stageAllocation: [
                    { name: "Real Estate", value: 35 },
                    { name: "Infrastructure", value: 25 },
                    { name: "Manufacturing", value: 20 },
                    { name: "Others", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Typically over hurdle",
                hurdle: "As per PPM"
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
    {
        name: "Kotak Life Sciences Fund (KLSF I)",
        category: "Category II",
        theme: "Life Sciences / Healthcare Private Equity",
        manager: "Kotak Alternate Asset Managers",
        desc: "Sector-focused private equity targeting high-growth healthcare and life sciences businesses in India.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "~6–7 Years",
            targetIRR: "Growth-Oriented Capital Appreciation",
            manager: "Kotak Alternate Asset Managers",
            managerDescription: "Kotak’s alternatives platform has strong expertise in private equity, real estate, and structured investments. The investment team focuses on deep sector research (healthcare & pharma), regulatory and compliance evaluation, financial & operational due diligence, promoter alignment, and active portfolio management. The fund benefits from Kotak Group’s institutional investment ecosystem.",
            strategyDescription: "The fund follows a sector-focused private equity strategy, targeting companies benefiting from structural growth in healthcare, pharmaceuticals, and life sciences. The strategy emphasizes scalable businesses, regulatory strength, and export potential.",
            coreFocusAreas: [
                "Pharmaceuticals & API manufacturers",
                "Hospitals & healthcare services",
                "Diagnostics & medical devices",
                "Contract research & manufacturing (CRAMS/CDMO)",
                "Specialty healthcare platforms"
            ],
            graphs: {
                sectorAllocationTitle: "Sub-Sector Allocation",
                sectorAllocation: [
                    { name: "Pharmaceuticals", value: 30 },
                    { name: "Healthcare Services", value: 25 },
                    { name: "CDMO / CRAMS", value: 20 },
                    { name: "Diagnostics", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 50 },
                    { name: "Expansion Capital", value: 30 },
                    { name: "Late Stage / Pre-IPO", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based (typically ~20%)",
                hurdle: "As defined in fund documents"
            }
        }
    },
    {
        name: "Veer Growth Fund",
        category: "Category II",
        theme: "Growth Capital / Private Equity",
        manager: "Mangal Keshav Financial Services LLP",
        desc: "Growth capital strategy aiming to generate long-term capital appreciation by investing in high-growth Indian businesses with scalable models.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "~5–7 Years",
            targetIRR: "Growth-Oriented Capital Appreciation",
            manager: "Mangal Keshav Financial Services LLP",
            managerDescription: "Mangal Keshav brings experience in capital markets and investment advisory, focusing on identifying scalable businesses with strong financial performance. The investment approach includes fundamental financial analysis, sector research, promoter and governance evaluation, risk-managed portfolio construction, and active monitoring & exit planning.",
            strategyDescription: "The fund follows a growth capital strategy, focusing on companies that are beyond early-stage but still have significant expansion potential. The strategy emphasizes strong fundamentals, promoter quality, and scalability.",
            coreFocusAreas: [
                "Mid-market growth companies",
                "Consumer-driven businesses",
                "Financial services",
                "Industrial & manufacturing sectors",
                "Emerging sector leaders"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Financial Services", value: 25 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 20 }
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
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Mavenark Credit and Growth Fund (MCG) – Series I",
        category: "Category II",
        theme: "Structured Credit + Growth Capital",
        manager: "Mavenark Asset Managers Pvt Ltd",
        desc: "Hybrid strategy combining structured credit investments with selective growth equity exposure to generate stable returns with downside protection.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "~4–6 Years",
            targetIRR: "Yield + Capital Appreciation",
            manager: "Mavenark Asset Managers Pvt Ltd",
            managerDescription: "Mavenark focuses on structured credit and opportunistic investments, with expertise in identifying risk-adjusted opportunities across debt and equity markets. The investment process includes credit risk assessment & structuring, collateral and security evaluation, cash flow analysis, sector-level research, and active monitoring & recovery strategy.",
            strategyDescription: "The fund follows a hybrid strategy, investing across both credit instruments and growth opportunities to balance risk and return. The strategy focuses on capital protection first, then return generation.",
            coreFocusAreas: [
                "Structured credit investments (secured / mezzanine)",
                "Growth capital in scalable businesses",
                "Special situation opportunities",
                "Asset-backed investments",
                "Yield + capital appreciation approach"
            ],
            graphs: {
                sectorAllocationTitle: "Allocation Split",
                sectorAllocation: [
                    { name: "Credit Investments", value: 60 },
                    { name: "Growth Equity", value: 25 },
                    { name: "Special Situations", value: 15 }
                ],
                stageAllocationTitle: "Credit Structure",
                stageAllocation: [
                    { name: "Secured Debt", value: 50 },
                    { name: "Mezzanine Financing", value: 30 },
                    { name: "Structured Instruments", value: 20 }
                ],
                portfolioConcentration: [
                    { name: "Portfolio Size", value: 12 },
                    { name: "Avg Yield Target", value: 15 },
                    { name: "Avg Holding Period (Yrs)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documents"
            }
        }
    },
    {
        name: "Meenakshi Real Assets Fund",
        category: "Category II",
        theme: "Real Assets / Real Estate Investments",
        manager: "Meenakshi Alternates Advisors LLP",
        desc: "Aims to generate stable income and capital appreciation by investing in real estate-backed opportunities and income-generating assets.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "~5–7 Years",
            targetIRR: "Income + Capital Appreciation",
            manager: "Meenakshi Alternates Advisors LLP",
            managerDescription: "Meenakshi Alternates focuses on real estate and asset-backed investments with a structured and risk-managed approach. The investment process includes asset-level due diligence, developer and promoter evaluation, legal and regulatory checks, cash flow and collateral analysis, and active monitoring of project execution. The fund prioritizes capital protection and income stability.",
            strategyDescription: "The fund focuses on real asset investments, primarily in real estate projects and asset-backed opportunities with strong cash flow visibility. The strategy emphasizes secured investments, asset backing, and predictable returns.",
            coreFocusAreas: [
                "Commercial real estate (office / retail)",
                "Residential real estate projects",
                "Asset-backed lending opportunities",
                "Income-generating real estate assets",
                "Structured real estate financing"
            ],
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Commercial Real Estate", value: 40 },
                    { name: "Residential Projects", value: 25 },
                    { name: "Structured Lending", value: 20 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "Debt / Structured Credit", value: 50 },
                    { name: "Equity / JV Investments", value: 30 },
                    { name: "Mezzanine Funding", value: 20 }
                ],
                portfolioConcentration: [
                    { name: "Portfolio Assets", value: 10 },
                    { name: "Avg Yield Profile", value: 14 },
                    { name: "Avg Holding Period (Yrs)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Nandan Growth Fund",
        category: "Category II",
        theme: "Growth Capital / Private Equity",
        manager: "Nandan Advisors LLP",
        desc: "Aims to generate long-term capital appreciation by investing in scalable Indian businesses with strong growth potential and sustainable competitive advantages.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "~5–7 Years",
            targetIRR: "Growth-Oriented Capital Appreciation",
            manager: "Nandan Advisors LLP",
            managerDescription: "Nandan Advisors focuses on identifying high-growth businesses through structured research and disciplined capital allocation. The investment process includes fundamental financial analysis, sector and market research, promoter and governance evaluation, risk-managed portfolio construction, and active monitoring and exit planning.",
            strategyDescription: "The fund follows a growth-focused private equity approach, targeting companies in their expansion phase with strong fundamentals and market positioning. The strategy emphasizes business scalability, earnings visibility, and promoter quality.",
            coreFocusAreas: [
                "Mid-market growth companies",
                "Consumer & retail businesses",
                "Financial services",
                "Industrial & manufacturing sectors",
                "Emerging high-growth sectors"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Retail", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 20 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 55 },
                    { name: "Expansion Capital", value: 30 },
                    { name: "Pre-IPO / Late Stage", value: 15 }
                ],
                portfolioConcentration: [
                    { name: "Portfolio Companies", value: 12 },
                    { name: "Avg Holding Period (Yrs)", value: 5 },
                    { name: "Follow-on Investments", value: 100 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "NAVBharat Investment Opportunities Fund",
        category: "Category II",
        theme: "Growth / Multi-Sector Opportunities Strategy",
        manager: "NAV Investment Consultants LLP",
        desc: "Aims to generate long-term capital appreciation by investing in high-growth Indian companies across sectors benefiting from India’s structural economic expansion.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "~5–7 Years",
            targetIRR: "Growth-Oriented Capital Appreciation",
            manager: "NAV Investment Consultants LLP",
            managerDescription: "NAV Investment Consultants focuses on identifying high-potential opportunities across sectors through structured research and disciplined capital allocation. The investment approach includes bottom-up stock selection, sector and macro trend analysis, promoter and governance evaluation, risk-adjusted portfolio construction, and active monitoring & exit execution.",
            strategyDescription: "The fund follows a diversified growth strategy, targeting companies with strong fundamentals, scalable business models, and long-term growth visibility. The strategy focuses on India-centric themes such as formalization, consumption growth, and industrial expansion.",
            coreFocusAreas: [
                "Consumer-driven businesses",
                "Financial services",
                "Industrial & infrastructure-linked companies",
                "Emerging sectors benefiting from India growth story",
                "Mid-market growth opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Retail", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Infrastructure", value: 15 },
                    { name: "Others", value: 20 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 60 },
                    { name: "Expansion Capital", value: 25 },
                    { name: "Pre-IPO / Late Stage", value: 15 }
                ],
                portfolioConcentration: [
                    { name: "Portfolio Companies", value: 12 },
                    { name: "Avg Holding Period (Yrs)", value: 5 },
                    { name: "Follow-on Investments", value: 100 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Neo Secondaries Fund",
        category: "Category II",
        theme: "Private Equity Secondaries Strategy",
        manager: "Neo Asset Management Pvt Ltd",
        desc: "Aims to generate accelerated returns with reduced risk by investing in existing private equity portfolios and late-stage opportunities.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "~2–4 Years",
            targetIRR: "Accelerated Capital Appreciation",
            manager: "Neo Asset Management Pvt Ltd",
            managerDescription: "Neo Asset Management focuses on alternative investments including private equity, credit, and structured strategies. The approach includes detailed portfolio evaluation, entry at discounted valuations, liquidity visibility assessment, risk-adjusted capital allocation, and active exit monitoring.",
            strategyDescription: "The fund follows a secondary market private equity strategy, acquiring stakes in already established and partially matured investments. This helps reduce risk and shorten the investment cycle compared to traditional PE funds.",
            coreFocusAreas: [
                "Buying stakes in existing PE funds or portfolios",
                "Investing in late-stage / near-exit companies",
                "Discounted entry valuations",
                "Reduced blind-pool risk",
                "Faster capital deployment & exits"
            ],
            graphs: {
                sectorAllocationTitle: "Investment Type Allocation",
                sectorAllocation: [
                    { name: "Secondary PE Deals", value: 60 },
                    { name: "Late-Stage Direct Investments", value: 25 },
                    { name: "Special Situations", value: 15 }
                ],
                stageAllocationTitle: "Portfolio Maturity",
                stageAllocation: [
                    { name: "Mature Assets", value: 50 },
                    { name: "Growth Stage", value: 30 },
                    { name: "Pre-Exit / Liquidity", value: 20 }
                ],
                portfolioConcentration: [
                    { name: "Portfolio Size", value: 15 },
                    { name: "Avg Holding Period (Yrs)", value: 3 },
                    { name: "Deployment Speed", value: 90 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Neo Special Credit Opportunities Fund II",
        category: "Category II",
        theme: "Structured Credit / Special Situations Strategy",
        manager: "Neo Asset Management Pvt Ltd",
        desc: "Aims to generate stable income with downside protection by investing in structured credit opportunities across sectors.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "~3–5 Years",
            targetIRR: "Stable Yield + Limited Upside",
            manager: "Neo Asset Management Pvt Ltd",
            managerDescription: "Neo Asset Management has expertise in structured credit, private equity, and alternative investments. The investment approach includes detailed credit risk assessment, collateral and security evaluation, cash flow analysis, structuring downside protection mechanisms, and active monitoring and recovery strategies.",
            strategyDescription: "The fund follows a credit-focused strategy, targeting opportunities with strong cash flows, collateral backing, and structured risk mitigation. The strategy focuses on capital preservation, predictable yield, and controlled risk exposure.",
            coreFocusAreas: [
                "Structured debt investments (secured lending)",
                "Special situation financing",
                "Mezzanine and hybrid instruments",
                "Asset-backed credit opportunities",
                "Opportunistic credit deals"
            ],
            graphs: {
                sectorAllocationTitle: "Credit Allocation",
                sectorAllocation: [
                    { name: "Secured Debt", value: 50 },
                    { name: "Mezzanine / Hybrid", value: 30 },
                    { name: "Special Situations", value: 20 }
                ],
                stageAllocationTitle: "Sector Exposure",
                stageAllocation: [
                    { name: "Real Estate", value: 30 },
                    { name: "Financial Services", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Others", value: 30 }
                ],
                portfolioConcentration: [
                    { name: "Avg Holding Period (Yrs)", value: 3 },
                    { name: "Portfolio Size", value: 12 },
                    { name: "Target Yield", value: 14 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Nippon India Credit Opportunities AIF – Scheme 2 (NICO 2)",
        category: "Category II",
        theme: "Structured Credit / Income Strategy",
        manager: "Nippon Life India AIF Management Ltd",
        desc: "Aims to generate stable income with downside protection by investing in structured credit opportunities across sectors.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "~3–5 Years",
            targetIRR: "Stable Yield + Limited Upside",
            manager: "Nippon Life India AIF Management Ltd",
            managerDescription: "Nippon Life India’s alternatives platform brings strong expertise in credit investing, capital markets, and structured finance. The approach includes detailed credit risk analysis, collateral and security evaluation, cash flow assessment, structuring downside protection, and active monitoring & recovery strategy.",
            strategyDescription: "The fund follows a credit-focused strategy, targeting opportunities with strong collateral backing, predictable cash flows, and structured downside protection. The strategy prioritizes capital preservation, yield generation, and controlled risk exposure.",
            coreFocusAreas: [
                "Secured debt investments",
                "Structured lending transactions",
                "Mezzanine and hybrid instruments",
                "Asset-backed financing",
                "Special situation credit opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Credit Allocation",
                sectorAllocation: [
                    { name: "Secured Debt", value: 55 },
                    { name: "Mezzanine / Hybrid", value: 25 },
                    { name: "Special Situations", value: 20 }
                ],
                stageAllocationTitle: "Sector Exposure",
                stageAllocation: [
                    { name: "Real Estate", value: 30 },
                    { name: "Financial Services", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Others", value: 30 }
                ],
                portfolioConcentration: [
                    { name: "Avg Holding Period (Yrs)", value: 3 },
                    { name: "Portfolio Size", value: 12 },
                    { name: "Target Yield", value: 14 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Nippon India Digital Innovation AIF – Scheme 2A",
        category: "Category II",
        theme: "Digital / Technology Growth",
        manager: "Nippon Life India AIF Management Ltd",
        desc: "Aims to generate long-term capital appreciation by investing in high-growth digital and technology-driven businesses benefiting from India’s rapid digital transformation.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "~5–7 Years",
            targetIRR: "High Growth Capital Appreciation",
            manager: "Nippon Life India AIF Management Ltd",
            managerDescription: "Nippon Life India’s alternatives platform leverages deep capital markets experience and sector research capabilities. The investment approach includes technology sector deep-dive research, business model scalability analysis, founder and management evaluation, financial and operational due diligence, and active portfolio monitoring. The fund focuses on identifying future digital leaders.",
            strategyDescription: "The fund follows a technology-focused growth strategy, targeting businesses that are driving innovation and digital adoption across sectors. The strategy emphasizes scalability, innovation, and long-term digital trends.",
            coreFocusAreas: [
                "SaaS & enterprise technology platforms",
                "Fintech & digital financial services",
                "E-commerce & digital consumer platforms",
                "AI, data analytics & emerging technologies",
                "Tech-enabled services"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "SaaS / Enterprise Tech", value: 30 },
                    { name: "Fintech", value: 25 },
                    { name: "Digital Consumer", value: 20 },
                    { name: "AI / Data Tech", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Stage", value: 50 },
                    { name: "Early Growth", value: 30 },
                    { name: "Pre-IPO / Late Stage", value: 20 }
                ],
                portfolioConcentration: [
                    { name: "Portfolio Companies", value: 14 },
                    { name: "Avg Holding Period (Yrs)", value: 5 },
                    { name: "Follow-on Investments", value: 100 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Novac Emerging Credit Fund – I",
        category: "Category II",
        theme: "Emerging Credit / Structured Debt",
        manager: "Novanttum Alternatives Pvt Ltd",
        desc: "The fund aims to generate stable income with capital protection by investing in emerging credit opportunities across high-growth sectors in India.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 years",
            targetIRR: "Stable Yield + Limited Upside",
            manager: "Novanttum Alternatives Pvt Ltd",
            managerDescription: "Novanttum Alternatives focuses on structured credit and alternative investment strategies with a strong emphasis on risk-adjusted returns.",
            strategyDescription: "The fund follows a credit-focused investment strategy, targeting mid-market businesses and structured lending opportunities with strong risk-return profiles.",
            coreFocusAreas: [
                "Structured debt investments",
                "Secured lending to mid-market companies",
                "Mezzanine and hybrid instruments",
                "Asset-backed credit opportunities",
                "Special situation financing"
            ],
            suitableFor: [
                "Investors seeking stable income opportunities",
                "High Net-Worth Individuals",
                "Investors preferring credit strategies over equity",
                "Family Offices",
                "Medium-term capital allocators"
            ],
            liquidity: "Close-ended structure. Capital locked for fund tenure (~3–5 years). No interim redemption. Returns distributed through income and exits.",
            graphs: {
                sectorAllocationTitle: "Credit Allocation",
                sectorAllocation: [
                    { name: "Secured Debt", value: 60 },
                    { name: "Mezzanine / Hybrid", value: 25 },
                    { name: "Special Situations", value: 15 }
                ],
                stageAllocationTitle: "Sector Exposure",
                stageAllocation: [
                    { name: "Financial Services", value: 25 },
                    { name: "Industrials", value: 25 },
                    { name: "Real Estate", value: 20 },
                    { name: "Consumer", value: 15 },
                    { name: "Others", value: 15 }
                ],
                yieldProfileTitle: "Yield Profile",
                yieldProfile: [
                    { name: "Target Yield", value: 40 },
                    { name: "Avg Holding Period", value: 35 },
                    { name: "Portfolio Size", value: 25 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "NovumLake Property Fund",
        category: "Category II",
        theme: "Real Estate / Property Investments",
        manager: "NovumLake Partners Pvt Ltd",
        desc: "NovumLake Property Fund focuses on generating stable income and capital appreciation by investing in high-quality real estate assets and structured property opportunities.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 years",
            targetIRR: "Income + Capital Appreciation",
            manager: "NovumLake Partners Pvt Ltd",
            managerDescription: "NovumLake focuses on real estate investments and structured opportunities with a disciplined investment approach.",
            strategyDescription: "The fund follows a real estate-focused strategy, targeting income-generating assets and value-accretive property investments.",
            coreFocusAreas: [
                "Commercial office spaces",
                "Premium residential developments",
                "Asset-backed real estate lending",
                "Pre-leased / income-generating properties",
                "Opportunistic real estate investments"
            ],
            suitableFor: [
                "Investors seeking real estate exposure",
                "High Net-Worth Individuals",
                "Investors preferring asset-backed investments",
                "Family Offices",
                "Medium to long-term investors"
            ],
            liquidity: "Close-ended structure. Capital locked for fund tenure (~5–7 years). No interim redemption. Returns generated via rental yield + exits.",
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Commercial Office", value: 45 },
                    { name: "Residential Projects", value: 25 },
                    { name: "Structured Lending", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "Income Yield Assets", value: 50 },
                    { name: "Development Projects", value: 30 },
                    { name: "Structured Credit", value: 20 }
                ],
                yieldProfileTitle: "Portfolio Metrics",
                yieldProfile: [
                    { name: "Portfolio Assets", value: 10 },
                    { name: "Avg Holding Period (Yrs)", value: 5 },
                    { name: "Yield Focus", value: 100 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Nuvama Crossover Opportunities Fund – Series 4A",
        category: "Category II",
        theme: "Pre-IPO / Crossover Equity",
        manager: "Nuvama Asset Management Ltd",
        desc: "The fund aims to generate high capital appreciation by investing in late-stage private companies and pre-IPO opportunities with strong listing potential.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 years",
            targetIRR: "High Growth Capital Appreciation",
            manager: "Nuvama Asset Management Ltd",
            managerDescription: "Nuvama’s alternatives platform focuses on identifying late-stage high-growth companies with strong IPO pipelines.",
            strategyDescription: "The fund follows a crossover strategy, investing in companies transitioning from private markets to public markets.",
            coreFocusAreas: [
                "Pre-IPO investments",
                "Late-stage private equity deals",
                "High-growth companies nearing listing",
                "Opportunities in IPO-bound businesses",
                "Select listed opportunities post IPO"
            ],
            suitableFor: [
                "Investors seeking pre-IPO exposure",
                "High Net-Worth Individuals",
                "Investors targeting high-growth opportunities",
                "Family Offices",
                "Investors comfortable with moderate-to-high risk"
            ],
            liquidity: "Close-ended structure. Capital locked for fund tenure (~3–5 years). No interim redemption. Returns generated via IPO and exits.",
            graphs: {
                sectorAllocationTitle: "Investment Allocation",
                sectorAllocation: [
                    { name: "Pre-IPO Investments", value: 60 },
                    { name: "Late-Stage Private Equity", value: 25 },
                    { name: "Listed Opportunities", value: 15 }
                ],
                stageAllocationTitle: "Sector Exposure",
                stageAllocation: [
                    { name: "Technology / Digital", value: 30 },
                    { name: "Consumer / Internet", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 10 }
                ],
                yieldProfileTitle: "Exit Timeline",
                yieldProfile: [
                    { name: "Avg Holding Period (Yrs)", value: 3 },
                    { name: "IPO Exit Potential", value: 70 },
                    { name: "Secondary Exit Opps", value: 40 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "Prime Offices Fund (PRIME)",
        category: "Category II",
        theme: "Commercial Office Real Estate",
        manager: "Nuvama Asset Management & Cushman & Wakefield",
        desc: "PRIME Fund focuses on generating stable rental income and long-term capital appreciation through investments in high-quality commercial office assets.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 years",
            targetIRR: "Rental Yield + Capital Appreciation",
            manager: "Nuvama Asset Management & Cushman & Wakefield",
            managerDescription: "Cushman & Wakefield brings global expertise in real estate advisory, leasing, and asset management, while Nuvama provides investment structuring and capital management expertise.",
            strategyDescription: "The fund follows a core real estate strategy, investing in Grade A office properties with strong tenants and long-term lease agreements.",
            coreFocusAreas: [
                "Grade A commercial office buildings",
                "Pre-leased / income-generating assets",
                "Business parks & IT parks",
                "Institutional-quality real estate",
                "Tier-1 city office assets"
            ],
            suitableFor: [
                "Investors seeking stable rental income",
                "High Net-Worth Individuals",
                "Investors looking for real estate exposure",
                "Family Offices",
                "Low-to-moderate risk investors"
            ],
            liquidity: "Close-ended structure. Capital locked for fund tenure (~5–7 years). No interim redemption. Returns generated via rental income + exit.",
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Grade A Offices", value: 70 },
                    { name: "Business Parks", value: 20 },
                    { name: "Opportunistic Assets", value: 10 }
                ],
                stageAllocationTitle: "Tenant Profile",
                stageAllocation: [
                    { name: "MNC Tenants", value: 50 },
                    { name: "IT / Tech Companies", value: 30 },
                    { name: "Domestic Corporates", value: 20 }
                ],
                yieldProfileTitle: "Yield Profile",
                yieldProfile: [
                    { name: "Rental Yield", value: 80 },
                    { name: "Occupancy Rate", value: 95 },
                    { name: "Avg Lease Tenure", value: 70 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry-based structure",
                hurdle: "As defined in fund documentation"
            }
        }
    },
    {
        name: "NV Capital Scheme 1",
        category: "Category II",
        theme: "Growth / Private Equity",
        manager: "N V Associates LLP",
        desc: "Category II AIF focused on growth-stage investments across high-potential Indian businesses.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "Capital Appreciation",
            manager: "N V Associates LLP",
            managerDescription: "The fund follows a research-driven investment approach involving bottom-up stock selection, sector & macro analysis, promoter due diligence, and risk-managed allocation with an active exit strategy.",
            strategyDescription: "NV Capital Scheme 1 is a Category II AIF focused on growth-stage investments. The fund aims to deliver long-term capital appreciation by backing companies with strong fundamentals, scalable models, and sector tailwinds. It follows a multi-sector growth strategy, investing in businesses that are in expansion or late-growth phases.",
            coreFocusAreas: [
                "Mid-market scalable companies",
                "Consumer & retail growth stories",
                "Financial services",
                "Industrials & manufacturing",
                "Emerging India sectors"
            ],
            suitableFor: [
                "HNI / Ultra HNI",
                "Family Offices",
                "Long-term investors",
                "Growth-focused investors"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 20 }
                ],
                stageAllocationTitle: "Investment Stage Allocation",
                stageAllocation: [
                    { name: "Growth Capital", value: 55 },
                    { name: "Expansion Capital", value: 30 },
                    { name: "Pre-IPO", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 15 },
                    { name: "Holding Period (Years)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry model",
                hurdle: "Applicable"
            }
        }
    },
    {
        name: "ABSL Money Manager Fund",
        slug: "absl-money-manager",
        category: "Category II",
        theme: "Credit / Income",
        manager: "Aditya Birla Sun Life AMC Limited",
        desc: "Focus: Credit-oriented strategy designed to deliver stable income with controlled risk.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "2–4 Years",
            targetIRR: "Regular Income",
            manager: "Aditya Birla Sun Life AMC Limited",
            managerDescription: "ABSL AMC is known for its strong capabilities in fixed income management, credit risk assessment, and institutional investing. The investment approach emphasizes high-quality credit selection, diversified exposure, and active duration management.",
            strategyDescription: "ABSL Money Manager Fund is a credit-oriented Category II AIF designed to deliver stable income with controlled risk. The fund focuses on short-to-medium duration debt opportunities, aiming to provide regular cash flows and capital preservation through a yield-focused credit strategy.",
            coreFocusAreas: [
                "Corporate Debt Instruments",
                "Structured Credit",
                "Short Duration Opportunities",
                "High-yield Fixed Income"
            ],
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Conservative investors",
                "Fixed-income alternative seekers"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Corporate Credit", value: 40 },
                    { name: "NBFC / Financials", value: 25 },
                    { name: "Structured Debt", value: 20 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Instrument Allocation",
                stageAllocation: [
                    { name: "Debt Instruments", value: 60 },
                    { name: "Structured Credit", value: 25 },
                    { name: "Cash / Liquid", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 25 },
                    { name: "Holding Period (Years)", value: 3 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            liquidity: "Close-ended fund with a lock-in of ~2–4 years. Limited liquidity; exit via maturity or periodic payouts."
        }
    },
    {
        name: "A.K Emerging Credit Opportunities Fund III",
        slug: "ak-emerging-credit",
        category: "Category II",
        theme: "Opportunistic Credit",
        manager: "A.K. Alternative Asset Managers Pvt. Ltd.",
        desc: "Focus: Capture high-yield opportunities across emerging credit markets.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "High Yield",
            manager: "A.K. Alternative Asset Managers Pvt. Ltd.",
            managerDescription: "Specialists in credit investing, special situations, and structured finance. The investment approach involves deep credit analysis, opportunistic deal sourcing, strong collateral structures, and active risk monitoring.",
            strategyDescription: "A.K Emerging Credit Opportunities Fund III is a credit-focused AIF designed to capture high-yield opportunities across emerging credit markets. The fund aims to generate superior risk-adjusted returns by investing in undervalued and special situation credit opportunities through an opportunistic credit strategy.",
            coreFocusAreas: [
                "Emerging Corporate Credit",
                "Special Situations / Distressed Assets",
                "Structured Credit Deals",
                "Mid-market Lending Opportunities"
            ],
            suitableFor: [
                "HNI / Ultra HNI",
                "Yield-seeking investors",
                "Risk-tolerant investors",
                "Alternative credit investors"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Corporate Credit", value: 35 },
                    { name: "Special Situations", value: 25 },
                    { name: "Structured Deals", value: 25 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "High-Yield Debt", value: 45 },
                    { name: "Structured Credit", value: 30 },
                    { name: "Distressed / Special", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 20 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via refinancing or structured payouts."
        }
    },
    {
        name: "Arnya Real Estate Fund – Debt",
        slug: "arnya-real-estate-debt",
        category: "Category II",
        theme: "Real Estate Credit",
        manager: "Arnya RealEstates Fund Advisors Pvt. Ltd.",
        desc: "Focus: Real estate-focused credit AIF designed to generate stable income through secured lending.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Regular Yield",
            manager: "Arnya RealEstates Fund Advisors Pvt. Ltd.",
            managerDescription: "Expertise in real estate financing, structured credit deals, and project-level risk evaluation. The investment approach focuses on asset-backed lending, developer due diligence, conservative leverage, and active monitoring.",
            strategyDescription: "Arnya Real Estate Fund – Debt is a real estate-focused credit AIF designed to generate stable income through secured lending opportunities. The fund invests in real estate backed debt instruments, aiming for consistent yield with asset-backed safety and strong collateral coverage.",
            coreFocusAreas: [
                "Residential Real Estate Projects",
                "Commercial Real Estate Financing",
                "Structured Real Estate Debt",
                "Developer Funding"
            ],
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Real estate exposure seekers",
                "Conservative alternative investors"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Residential Projects", value: 50 },
                    { name: "Commercial Real Estate", value: 30 },
                    { name: "Mixed Use / Others", value: 20 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "Secured Debt", value: 65 },
                    { name: "Structured Credit", value: 25 },
                    { name: "Mezzanine", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Projects", value: 12 },
                    { name: "Holding Period (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via repayment or refinancing."
        }
    },
    {
        name: "Axis Structured Credit AIF – III",
        category: "Category II",
        theme: "Structured Credit",
        manager: "Axis Asset Management Company Ltd.",
        desc: "Private credit-focused fund targeting high-yield structured lending opportunities in India’s mid-market segment.",
        link: "/products/aif/axis-structured-credit-iii",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–5 Years",
            targetIRR: "Stable Income (Yield)",
            manager: "Axis Asset Management Company Ltd.",
            managerDescription: "Axis AMC is a leading asset manager with a strong presence in private credit, fixed income, and alternative investments. The team follows detailed credit underwriting and diversified portfolio construction.",
            strategyDescription: "Axis Structured Credit AIF – III targets high-yield structured lending opportunities in India’s underserved mid-market segment, aiming for stable income with downside protection through secured transactions.",
            coreFocusAreas: [
                "Mid-market corporate lending",
                "Structured debt transactions",
                "Real estate & infrastructure financing",
                "Special situation credit",
                "Collateral-backed lending",
                "Predictable cash flows"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Corporate Credit", value: 40 },
                    { name: "Real Estate / Infra", value: 30 },
                    { name: "Structured Deals", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "Secured Debt", value: 60 },
                    { name: "Structured Credit", value: 25 },
                    { name: "Special Situations", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 15 },
                    { name: "Holding Period (Years)", value: 4.5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Alternative credit investors",
                "Portfolio diversifiers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–5 years. No early redemption; exit via repayment or refinancing."
        }
    },
    {
        name: "ElementOne Credit Opportunities Fund (EOCOF)",
        category: "Category II",
        theme: "Credit Fund of Funds",
        manager: "ElementOne Alternatives",
        desc: "Credit-focused Fund of Funds (FoF) designed to provide diversified exposure to top private credit opportunities.",
        link: "/products/aif/elementone-credit-opportunities",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–6 Years",
            targetIRR: "14% – 15.5% (Accrual)",
            manager: "ElementOne Alternatives",
            managerDescription: "Specialized alternative investment platform with experience in structured credit and private markets, utilizing an institutional-grade due diligence framework.",
            strategyDescription: "ElementOne Credit Opportunities Fund follows a multi-manager private credit strategy, allocating across multiple institutional-grade credit funds to enhance diversification and reduce risk.",
            coreFocusAreas: [
                "Private Credit Funds (India & Global)",
                "Structured Credit Strategies",
                "Performing Credit Opportunities",
                "Diversified Credit Portfolios",
                "Risk Optimization",
                "Institutional Access"
            ],
            graphs: {
                sectorAllocationTitle: "Allocation by Strategy",
                sectorAllocation: [
                    { name: "Structured Credit Funds", value: 40 },
                    { name: "Performing Credit", value: 30 },
                    { name: "Special Situations", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "Fund of Funds (Credit)", value: 70 },
                    { name: "Direct Credit Exposure", value: 20 },
                    { name: "Cash / Liquid", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Underlying Funds", value: 7.5 },
                    { name: "Holding Period (Years)", value: 4.5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Investors seeking diversified credit exposure",
                "Income-focused investors",
                "Risk-conscious alternative investors"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–6 years. No early redemption; exit via underlying fund distributions."
        }
    },
    {
        name: "Equanimity Ventures Trust III",
        category: "Category II",
        theme: "Venture / Growth",
        manager: "Equanimity Management Services LLP",
        desc: "Venture-focused Category II AIF that invests in high-growth, early-to-growth stage startups in India.",
        link: "/products/aif/equanimity-ventures-iii",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "High Growth Capital Appreciation",
            manager: "Equanimity Management Services LLP",
            managerDescription: "Venture-focused investment platform known for startup investing expertise, a founder-centric approach, and strong deal sourcing. They provide active portfolio support to scalable businesses.",
            strategyDescription: "Equanimity Ventures Trust III follows a venture / growth investing strategy, backing scalable businesses with strong growth potential across technology-driven and emerging sectors.",
            coreFocusAreas: [
                "Early-stage startups",
                "Growth-stage companies",
                "Technology-driven businesses",
                "Emerging sectors",
                "Scalable business models",
                "Founder-centric support"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Technology", value: 40 },
                    { name: "Consumer / D2C", value: 25 },
                    { name: "Fintech", value: 20 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Early Stage", value: 50 },
                    { name: "Growth Stage", value: 35 },
                    { name: "Pre-IPO", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 15 },
                    { name: "Holding Period (Years)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Long-term investors",
                "Venture capital seekers",
                "High-risk, high-return investors"
            ],
            liquidity: "Close-ended fund with a lock-in of ~5–7 years. No early redemption; exit via IPO or strategic sale."
        }
    },
    {
        name: "Franklin India Credit AIF – Scheme I",
        category: "Category II",
        theme: "Credit / Fixed Income",
        manager: "Franklin Templeton Alternative Investments (India) Pvt. Ltd.",
        desc: "Credit-focused AIF designed to generate stable income through diversified debt opportunities and high-quality credit instruments.",
        link: "/products/aif/franklin-india-credit-i",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Stable Accrual Income",
            manager: "Franklin Templeton Alternative Investments (India) Pvt. Ltd.",
            managerDescription: "Globally recognized asset manager with strong expertise in fixed income investing, credit risk analysis, and institutional portfolio management. They follow a research-driven, risk-adjusted allocation approach.",
            strategyDescription: "Franklin India Credit AIF – Scheme I follows a fixed income / credit strategy, aiming for consistent accrual-based returns through corporate credit instruments and structured lending.",
            coreFocusAreas: [
                "Corporate Credit Instruments",
                "Structured Debt Opportunities",
                "Performing Credit",
                "Mid-market lending",
                "Income Generation",
                "Capital Preservation"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Corporate Credit", value: 45 },
                    { name: "Financial Services / NBFC", value: 25 },
                    { name: "Structured Credit", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Instrument Allocation",
                stageAllocation: [
                    { name: "Debt Instruments", value: 60 },
                    { name: "Structured Credit", value: 25 },
                    { name: "Cash / Liquid", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 16 },
                    { name: "Holding Period (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Conservative alternative investors",
                "Fixed-income diversification seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via maturity or repayments."
        }
    },
    {
        name: "Growthcap Ventures Fund I",
        category: "Category II",
        theme: "Growth / Private Equity",
        manager: "Growthcap Ventures AIF Trust",
        desc: "Growth-oriented Category II AIF focused on investing in scalable Indian businesses with strong expansion potential.",
        link: "/products/aif/growthcap-ventures-i",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "Growthcap Ventures AIF Trust",
            managerDescription: "Focused on growth investing and mid-market expansion stories, the team follows a bottom-up company selection process and provides active portfolio management.",
            strategyDescription: "Growthcap Ventures Fund I follows a growth / private equity strategy, backing companies in their growth and expansion phases across consumer and technology-driven sectors.",
            coreFocusAreas: [
                "Mid-market growth companies",
                "Emerging sector leaders",
                "Consumer & technology-driven businesses",
                "Expansion-stage investments",
                "High-growth fundamentals",
                "Scalable business identification"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Retail", value: 30 },
                    { name: "Technology", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Capital", value: 60 },
                    { name: "Expansion Stage", value: 30 },
                    { name: "Pre-IPO", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 14 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Long-term investors",
                "Private equity exposure seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–6 years. No early redemption; exit via IPO or strategic sale."
        }
    },
    {
        name: "ICICI Prudential Corporate Credit Opportunities Fund – AIF III",
        category: "Category II",
        theme: "Corporate Credit",
        manager: "ICICI Prudential Asset Management Company Ltd.",
        desc: "Credit-focused AIF aimed at generating stable income through high-quality corporate lending and structured debt opportunities.",
        link: "/products/aif/icici-prudential-corporate-credit-iii",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Stable Accrual Income",
            manager: "ICICI Prudential Asset Management Company Ltd.",
            managerDescription: "A leading AMC with strong capabilities in fixed income investing, credit risk analysis, and institutional portfolio management. They follow a rigorous credit evaluation and risk-managed allocation approach.",
            strategyDescription: "ICICI Prudential Corporate Credit Opportunities Fund – AIF III targets high-quality borrowers and predictable cash flows through corporate debt instruments and structured credit.",
            coreFocusAreas: [
                "Corporate debt instruments",
                "Structured credit opportunities",
                "Mid-market lending",
                "Performing credit",
                "High-quality borrowers",
                "Predictable cash flows"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Corporate Credit", value: 50 },
                    { name: "Financials / NBFC", value: 25 },
                    { name: "Structured Deals", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Instrument Allocation",
                stageAllocation: [
                    { name: "Debt Instruments", value: 65 },
                    { name: "Structured Credit", value: 25 },
                    { name: "Cash / Liquid", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 17 },
                    { name: "Holding Period (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Conservative alternative investors",
                "Fixed income diversification seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via repayments or refinancing."
        }
    },
    {
        name: "ICICI Prudential Office Yield Optimiser Fund – AIF II",
        category: "Category II",
        theme: "Real Estate Credit",
        manager: "ICICI Prudential Asset Management Company Ltd.",
        desc: "Real estate-focused credit fund that targets stable income through Grade A commercial office assets and lease-backed structures.",
        link: "/products/aif/icici-prudential-office-yield-ii",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Regular Rental Yield",
            manager: "ICICI Prudential Asset Management Company Ltd.",
            managerDescription: "One of India’s leading AMCs with expertise in real estate investing and alternative strategies. They focus on leased office assets with strong tenant quality and conservative LTV.",
            strategyDescription: "ICICI Prudential Office Yield Optimiser Fund – AIF II is designed to generate regular yield with strong downside protection, backed by income-generating commercial office properties.",
            coreFocusAreas: [
                "Grade A office assets",
                "Income-generating commercial properties",
                "Lease-backed structures",
                "Structured real estate financing",
                "Stable rental yield",
                "Asset-backed security"
            ],
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Office Assets", value: 70 },
                    { name: "Commercial Real Estate", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "Lease-backed Debt", value: 50 },
                    { name: "Structured Credit", value: 30 },
                    { name: "Mezzanine", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Properties", value: 10 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Real estate exposure seekers",
                "Low-volatility alternative investors"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–6 years. No early redemption; exit via lease income or asset sale."
        }
    },
    {
        name: "InCred Credit Opportunities Fund III",
        category: "Category II",
        theme: "Credit / Structured",
        manager: "InCred Alternative Investments Pvt. Ltd.",
        desc: "Credit-focused AIF designed to generate stable income with attractive risk-adjusted returns through diversified credit opportunities.",
        link: "/products/aif/incred-credit-opportunities-iii",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Stable Income / Yield",
            manager: "InCred Alternative Investments Pvt. Ltd.",
            managerDescription: "A leading alternative investment platform with strong expertise in credit and structured finance. They follow a rigorous credit underwriting process and focus on collateral-backed investments.",
            strategyDescription: "InCred Credit Opportunities Fund III focuses on secured lending, strong cash flow visibility, and downside protection through corporate credit and structured debt.",
            coreFocusAreas: [
                "Corporate credit investments",
                "Structured debt transactions",
                "Mid-market lending opportunities",
                "Special situation credit",
                "Secured lending",
                "Capital preservation"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Corporate Credit", value: 45 },
                    { name: "Financial Services / NBFC", value: 25 },
                    { name: "Structured Deals", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Instrument Allocation",
                stageAllocation: [
                    { name: "Secured Debt", value: 60 },
                    { name: "Structured Credit", value: 25 },
                    { name: "Special Situations", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 16 },
                    { name: "Holding Period (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Alternative credit investors",
                "Portfolio diversifiers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via repayments or refinancing."
        }
    },
    {
        name: "InCred Growth Partners Fund II",
        category: "Category II",
        theme: "Growth / Private Equity",
        manager: "InCred Alternative Investments Pvt. Ltd.",
        desc: "Growth-oriented private equity AIF focused on investing in scalable mid-market companies with strong expansion potential.",
        link: "/products/aif/incred-growth-partners-ii",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "InCred Alternative Investments Pvt. Ltd.",
            managerDescription: "Expertise in private equity and institutional portfolio management. They use a bottom-up stock selection and sector-focused analysis with active portfolio involvement.",
            strategyDescription: "InCred Growth Partners Fund II backs high-quality businesses with scalable models and strong management teams across consumer, financial services, and technology.",
            coreFocusAreas: [
                "Mid-market growth companies",
                "Consumer & financial services",
                "Technology-driven businesses",
                "Sector-agnostic opportunities",
                "Scalable models",
                "Strong management teams"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Retail", value: 30 },
                    { name: "Financial Services", value: 25 },
                    { name: "Technology", value: 20 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Capital", value: 60 },
                    { name: "Expansion Stage", value: 30 },
                    { name: "Pre-IPO", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 14 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Long-term investors",
                "Private equity exposure seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–6 years. No early redemption; exit via IPO or acquisitions."
        }
    },
    {
        name: "InCred Special Opportunities Fund I",
        category: "Category II",
        theme: "Special Situations",
        manager: "InCred Alternative Investments Pvt. Ltd.",
        desc: "Opportunistic AIF focused on capturing unique and special situation opportunities across credit and equity markets.",
        link: "/products/aif/incred-special-opportunities-i",
        color: "#EF4444",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "High Return / Opportunistic",
            manager: "InCred Alternative Investments Pvt. Ltd.",
            managerDescription: "Expertise in special situations and opportunistic deal sourcing. They identify market dislocations through deep due diligence and structured deal execution.",
            strategyDescription: "InCred Special Opportunities Fund I aims to generate enhanced returns by investing in mispriced, complex, or transitional opportunities like distressed assets and turnaround situations.",
            coreFocusAreas: [
                "Distressed & stressed assets",
                "Structured credit opportunities",
                "Turnaround situations",
                "Event-driven investments",
                "Market inefficiencies",
                "High-return opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Opportunity Allocation",
                sectorAllocation: [
                    { name: "Special Situations", value: 40 },
                    { name: "Structured Credit", value: 30 },
                    { name: "Distressed Assets", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "Opportunistic Credit", value: 50 },
                    { name: "Equity / Hybrid", value: 30 },
                    { name: "Structured Deals", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 11 },
                    { name: "Holding Period (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "High-risk, high-return investors",
                "Opportunistic investors",
                "Alternative strategy seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via event-based realizations."
        }
    },
    {
        name: "Invicta Continuum Fund I",
        category: "Category II",
        theme: "Growth / Private Equity",
        manager: "Invicta Capserv Private Limited",
        desc: "Growth-focused private equity AIF aimed at investing in scalable Indian businesses across high-growth sectors.",
        link: "/products/aif/invicta-continuum-i",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "Invicta Capserv Private Limited",
            managerDescription: "Focused on growth equity investments and private equity strategies in mid-market opportunities with a bottom-up company selection approach.",
            strategyDescription: "Partnering with companies in their growth and expansion phases, focusing on consumer, technology, and financial services with strong management teams.",
            coreFocusAreas: [
                "Mid-market companies",
                "Consumer & technology sectors",
                "Financial services",
                "Emerging business opportunities",
                "Strong management teams",
                "Scalable business models"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Retail", value: 30 },
                    { name: "Technology", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Capital", value: 60 },
                    { name: "Expansion Stage", value: 30 },
                    { name: "Pre-IPO", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 13 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Long-term investors",
                "Private equity exposure seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–6 years. No early redemption; exit via IPO or acquisitions."
        }
    },
    {
        name: "Irris Whiteboard Yield Fund",
        category: "Category II",
        theme: "Yield / Credit",
        manager: "Irris Whiteboard Private Limited",
        desc: "Credit-focused AIF designed to generate stable and predictable income through secured lending and structured credit opportunities.",
        link: "/products/aif/irris-whiteboard-yield",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Stable and Predictable Income",
            manager: "Irris Whiteboard Private Limited",
            managerDescription: "Focused on credit investments and yield-oriented strategies with a disciplined credit underwriting and risk-managed allocation approach.",
            strategyDescription: "Targets secured lending and structured credit opportunities, aiming for consistent accrual-based returns with capital preservation focus.",
            coreFocusAreas: [
                "Corporate debt opportunities",
                "Structured credit transactions",
                "Mid-market lending",
                "High-yield fixed income",
                "Income generation",
                "Capital preservation"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Corporate Credit", value: 45 },
                    { name: "Financial Services / NBFC", value: 25 },
                    { name: "Structured Deals", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Instrument Allocation",
                stageAllocation: [
                    { name: "Debt Instruments", value: 60 },
                    { name: "Structured Credit", value: 25 },
                    { name: "Cash / Liquid", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 16 },
                    { name: "Holding Period (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Conservative alternative investors",
                "Fixed-income diversification seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via repayments or structured payouts."
        }
    },
    {
        name: "ITI Growth Opportunities Fund II",
        category: "Category II",
        theme: "Growth / Private Equity",
        manager: "ITI Growth Opportunities LLP",
        desc: "Growth-focused private equity AIF that invests in scalable Indian businesses across emerging sectors with strong growth potential.",
        link: "/products/aif/iti-growth-opportunities-ii",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "ITI Growth Opportunities LLP",
            managerDescription: "Focused on growth equity investments and private equity strategies with sectoral research and active portfolio involvement.",
            strategyDescription: "Backing companies with strong growth potential and market positioning across consumer, financial services, and technology-driven businesses.",
            coreFocusAreas: [
                "Mid-market companies",
                "Consumer & retail",
                "Financial services",
                "Technology-driven businesses",
                "High-growth companies",
                "Strong fundamentals"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Retail", value: 30 },
                    { name: "Financial Services", value: 25 },
                    { name: "Technology", value: 20 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Capital", value: 60 },
                    { name: "Expansion Stage", value: 30 },
                    { name: "Pre-IPO", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 14 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Long-term investors",
                "Private equity exposure seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–6 years. No early redemption; exit via IPO or acquisitions."
        }
    },
    {
        name: "Novanttum Emerging Credit Fund – I",
        category: "Category II",
        theme: "Emerging Credit",
        manager: "Novanttum Alternatives LLP",
        desc: "Credit-focused AIF targeting high-yield opportunities in emerging and underserved credit segments with strong risk controls.",
        link: "/products/aif/novanttum-emerging-credit-i",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "High Yield / Enhanced Returns",
            manager: "Novanttum Alternatives LLP",
            managerDescription: "Focused on credit & structured finance, emerging market opportunities, and yield-driven strategies with deep credit evaluation.",
            strategyDescription: "Investing in mid-market and structured credit opportunities with strong collateral backing, aiming for consistent high-yield returns.",
            coreFocusAreas: [
                "Mid-market corporate lending",
                "Structured credit transactions",
                "Emerging credit opportunities",
                "Special situation debt",
                "High-yield investments",
                "Strong collateral backing"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Corporate Credit", value: 40 },
                    { name: "Financial Services / NBFC", value: 25 },
                    { name: "Structured Deals", value: 20 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Instrument Allocation",
                stageAllocation: [
                    { name: "High-Yield Debt", value: 50 },
                    { name: "Structured Credit", value: 30 },
                    { name: "Special Situations", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 14 },
                    { name: "Holding Period (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Yield-seeking investors",
                "Risk-tolerant investors",
                "Alternative credit investors"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via repayments or structured payouts."
        }
    },
    {
        name: "Quest4Value S.C.A.L.E. Fund II",
        category: "Category II",
        theme: "Growth / Public Equity",
        manager: "Quest4Value Investment Managers LLP",
        desc: "Growth-oriented AIF focused on investing in listed and pre-IPO companies with strong earnings growth potential.",
        link: "/products/aif/quest4value-scale-ii",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "Quest4Value Investment Managers LLP",
            managerDescription: "Boutique investment firm focused on public equity investing, growth-oriented strategies, and high-conviction portfolios.",
            strategyDescription: "Identifying high-quality businesses with sustainable competitive advantages, focusing on listed small & mid-cap companies and pre-IPO opportunities.",
            coreFocusAreas: [
                "Listed small & mid-cap companies",
                "Pre-IPO opportunities",
                "Emerging sector leaders",
                "High growth businesses",
                "Quality + scalability",
                "Earnings visibility"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Industrials", value: 25 },
                    { name: "Consumer", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Market Cap Allocation",
                stageAllocation: [
                    { name: "Small Cap", value: 50 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Pre-IPO / Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 16 },
                    { name: "Holding Period (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Equity-focused investors",
                "Long-term growth investors",
                "Market-linked return seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via market liquidity or IPO."
        }
    },
    {
        name: "Quest4Value Tristar Fund",
        category: "Category II",
        theme: "Growth / Public Equity",
        manager: "Quest4Value Investment Managers LLP",
        desc: "Growth-oriented AIF focused on investing in high-quality listed and pre-IPO companies with strong earnings growth visibility.",
        link: "/products/aif/quest4value-tristar",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "Quest4Value Investment Managers LLP",
            managerDescription: "Known for public equity expertise, high-conviction investing, and strong research capabilities for long-term wealth creation.",
            strategyDescription: "Identifying businesses with strong earnings growth and sustainable competitive advantages through bottom-up stock selection.",
            coreFocusAreas: [
                "Listed small & mid-cap companies",
                "Pre-IPO opportunities",
                "High-growth sectors",
                "Emerging business leaders",
                "Scalable businesses",
                "Growth visibility"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Industrials", value: 25 },
                    { name: "Consumer", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Market Cap Allocation",
                stageAllocation: [
                    { name: "Small Cap", value: 50 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Pre-IPO / Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 16 },
                    { name: "Holding Period (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Equity-focused investors",
                "Long-term investors",
                "Market-linked return seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via market liquidity or IPO."
        }
    },
    {
        name: "RMS Growth Fund – Scheme 1",
        category: "Category II",
        theme: "Growth / Private Equity",
        manager: "RMS Growth LLP",
        desc: "Growth-oriented private equity AIF focused on investing in scalable Indian businesses across emerging sectors with strong fundamentals.",
        link: "/products/aif/rms-growth-scheme-1",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "RMS Growth LLP",
            managerDescription: "Focused on growth equity investments and private equity strategies with sector-focused research and active portfolio involvement.",
            strategyDescription: "Backing companies with strong fundamentals and expansion potential across consumer, financial services, and technology-driven businesses.",
            coreFocusAreas: [
                "Mid-market companies",
                "Consumer & retail sectors",
                "Financial services",
                "Technology-driven businesses",
                "High-growth businesses",
                "Strong management teams"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Retail", value: 30 },
                    { name: "Financial Services", value: 25 },
                    { name: "Technology", value: 20 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Capital", value: 60 },
                    { name: "Expansion Stage", value: 30 },
                    { name: "Pre-IPO", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 14 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Long-term investors",
                "Private equity exposure seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–6 years. No early redemption; exit via IPO or acquisitions."
        }
    },
    {
        name: "Bharath Transformation Fund – Fund I",
        category: "Category II",
        theme: "Thematic / Growth",
        manager: "Sincere Syndication and Corporate Services LLP",
        desc: "Thematic growth AIF focused on capturing opportunities arising from India's structural transformation and economic expansion.",
        link: "/products/aif/bharath-transformation-fund-i",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "Sincere Syndication and Corporate Services LLP",
            managerDescription: "Focused on thematic investing and growth opportunities with theme-based selection and macro + sector analysis.",
            strategyDescription: "Investing in sectors benefiting from India's structural growth story and policy tailwinds, including manufacturing and infrastructure.",
            coreFocusAreas: [
                "Manufacturing & industrial growth",
                "Infrastructure & capital goods",
                "Financial services",
                "Consumption-driven sectors",
                "India growth story themes",
                "Emerging opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Industrials & Manufacturing", value: 30 },
                    { name: "Financial Services", value: 25 },
                    { name: "Infrastructure", value: 20 },
                    { name: "Consumer", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Capital", value: 55 },
                    { name: "Expansion Stage", value: 30 },
                    { name: "Pre-IPO", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 14 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "India growth story investors",
                "Thematic investors",
                "Long-term wealth creators"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–6 years. No early redemption; exit via IPO or market sale."
        }
    },
    {
        name: "Singularity Fund of Funds II",
        category: "Category II",
        theme: "Fund of Funds / Venture",
        manager: "Singularity AMC LLP",
        desc: "Fund of Funds (FoF) AIF designed to provide diversified exposure to multiple top-performing venture and growth funds.",
        link: "/products/aif/singularity-fof-ii",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "Singularity AMC LLP",
            managerDescription: "Specialized alternative investment platform focused on venture & innovation-led investing, fund selection, and portfolio construction.",
            strategyDescription: "Generating long-term capital appreciation by investing across top-performing AIFs and venture capital funds with a focus on innovation-led businesses.",
            coreFocusAreas: [
                "Venture capital funds",
                "Growth equity funds",
                "Technology-driven sectors",
                "Innovation-led businesses",
                "Diversification",
                "Top-tier fund managers"
            ],
            graphs: {
                sectorAllocationTitle: "Allocation by Fund Type",
                sectorAllocation: [
                    { name: "Venture Capital Funds", value: 50 },
                    { name: "Growth Equity Funds", value: 30 },
                    { name: "Thematic / Sector Funds", value: 20 }
                ],
                stageAllocationTitle: "Investment Layer",
                stageAllocation: [
                    { name: "Fund Investments", value: 80 },
                    { name: "Direct Co-investments", value: 10 },
                    { name: "Cash / Liquid", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Underlying Funds", value: 9 },
                    { name: "Holding Period (Years)", value: 6 }
                ]
            },
            fees: {
                manager: "Singularity AMC LLP",
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Investors seeking diversification",
                "Venture capital exposure seekers",
                "Long-term investors"
            ],
            liquidity: "Close-ended fund with a lock-in of ~5–7 years. No early redemption; exit via underlying fund distributions."
        }
    },
    {
        name: "Steptrade Chanakya Opportunities Fund II",
        category: "Category II",
        theme: "Growth / Opportunistic",
        manager: "Steptrade Capital",
        desc: "Opportunistic growth AIF focused on investing in high-potential Indian companies across sectors by identifying unique investment opportunities.",
        link: "/products/aif/steptrade-chanakya-ii",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "Steptrade Capital",
            managerDescription: "Focused on growth equity investing and opportunistic strategies by identifying unique investment opportunities and market inefficiencies.",
            strategyDescription: "Identifying high-conviction ideas with strong upside potential across mid-market growth companies and special situation opportunities.",
            coreFocusAreas: [
                "Mid-market growth companies",
                "Special situation opportunities",
                "Emerging sectors",
                "Pre-IPO investments",
                "High-conviction ideas",
                "Market inefficiency capture"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Industrials", value: 25 },
                    { name: "Consumer", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "Growth Equity", value: 50 },
                    { name: "Opportunistic Deals", value: 30 },
                    { name: "Pre-IPO", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 14 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Opportunistic investors",
                "Long-term capital seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–6 years. No early redemption; exit via IPO or acquisitions."
        }
    },
    {
        name: "Sundaram Performing Credit Opportunities Fund (PCOF) – Sr I",
        category: "Category II",
        theme: "Performing Credit",
        manager: "Sundaram Alternate Assets Limited",
        desc: "Credit-focused AIF investing in performing corporate credit opportunities aiming to generate stable and predictable income.",
        link: "/products/aif/sundaram-pcof-sr-i",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Income / Yield",
            manager: "Sundaram Alternate Assets Limited",
            managerDescription: "Well-established investment platform with expertise in fixed income and credit strategies and alternative investments.",
            strategyDescription: "Focusing on high-quality borrowers with strong repayment capacity to ensure consistent accrual returns with capital preservation.",
            coreFocusAreas: [
                "Performing corporate credit",
                "Structured credit opportunities",
                "Mid-market lending",
                "Income-generating debt instruments",
                "Steady yield focus",
                "Capital preservation"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Corporate Credit", value: 50 },
                    { name: "Financial Services / NBFC", value: 25 },
                    { name: "Structured Deals", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Instrument Allocation",
                stageAllocation: [
                    { name: "Performing Debt", value: 65 },
                    { name: "Structured Credit", value: 25 },
                    { name: "Cash / Liquid", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 16 },
                    { name: "Holding Period (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Conservative alternative investors",
                "Fixed-income diversification seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via repayments or structured payouts."
        }
    },
    {
        name: "Sundaram Real Estate Credit Income Generator Fund – Series 5",
        category: "Category II",
        theme: "Real Estate Credit",
        manager: "Sundaram Alternate Assets Limited",
        desc: "Real estate-focused credit AIF designed to generate stable income through asset-backed lending and financing opportunities.",
        link: "/products/aif/sundaram-re-credit-series-5",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Income Yield",
            manager: "Sundaram Alternate Assets Limited",
            managerDescription: "Reputed alternative investment platform with expertise in real estate financing, credit strategies, and institutional investing.",
            strategyDescription: "Providing regular yield with strong downside protection by focusing on secured lending with real estate collateral and developer due diligence.",
            coreFocusAreas: [
                "Residential real estate financing",
                "Commercial real estate lending",
                "Structured real estate credit",
                "Developer funding",
                "Asset-backed investments",
                "Secured lending focus"
            ],
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Residential Projects", value: 50 },
                    { name: "Commercial Real Estate", value: 30 },
                    { name: "Mixed Use / Others", value: 20 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "Secured Debt", value: 65 },
                    { name: "Structured Credit", value: 25 },
                    { name: "Mezzanine", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Projects", value: 12 },
                    { name: "Holding Period (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Real estate exposure seekers",
                "Conservative alternative investors"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years. No early redemption; exit via repayments or asset monetization."
        }
    },
    {
        name: "UTI Real Estate Opportunities Fund I (ROF I)",
        category: "Category II",
        theme: "Real Estate",
        manager: "UTI Alternatives Private Limited",
        desc: "Real estate-focused AIF aimed at generating long-term returns through property assets and development projects across residential and commercial segments.",
        link: "/products/aif/uti-re-opportunities-i",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Capital Appr. + Income",
            manager: "UTI Alternatives Private Limited",
            managerDescription: "Well-established investment platform with expertise in real estate investing, alternatives, and institutional portfolio management.",
            strategyDescription: "Targeting both capital appreciation and income generation by investing in high-quality assets with strong developers and value creation potential.",
            coreFocusAreas: [
                "Residential real estate projects",
                "Commercial office assets",
                "Mixed-use developments",
                "Structured real estate investments",
                "High-quality assets",
                "Value creation focus"
            ],
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Residential Projects", value: 50 },
                    { name: "Commercial Real Estate", value: 30 },
                    { name: "Mixed Use / Others", value: 20 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "Equity Investments", value: 40 },
                    { name: "Structured Debt", value: 35 },
                    { name: "Mezzanine", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Projects", value: 10 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Real estate-focused investors",
                "Long-term capital appreciation seekers",
                "Portfolio diversifiers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–6 years. No early redemption; exit via asset monetization or project completion."
        }
    },
    {
        name: "Bharat Bhoomi Fund (BVF–5)",
        category: "Category II",
        theme: "Real Estate",
        manager: "Wealth Company Asset Management Pvt. Ltd.",
        desc: "Real estate-focused AIF designed to generate long-term value through property and development opportunities across India.",
        link: "/products/aif/bharat-bhoomi-bvf-5",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Capital Appreciation + Income",
            manager: "Wealth Company Asset Management Pvt. Ltd.",
            managerDescription: "Specialized investment platform focused on real estate investments, alternative asset strategies, and structured deal execution.",
            strategyDescription: "Focusing on location advantage, developer strength, and value creation by investing in residential, commercial, and land-backed opportunities.",
            coreFocusAreas: [
                "Residential real estate projects",
                "Commercial developments",
                "Land & asset-backed opportunities",
                "Structured real estate investments",
                "Location advantage focus",
                "Developer strength selection"
            ],
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Residential Projects", value: 55 },
                    { name: "Commercial Real Estate", value: 25 },
                    { name: "Land / Others", value: 20 }
                ],
                stageAllocationTitle: "Investment Type",
                stageAllocation: [
                    { name: "Equity Investments", value: 45 },
                    { name: "Structured Debt", value: 35 },
                    { name: "Mezzanine", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Projects", value: 10 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Real estate investors",
                "Long-term capital appreciation seekers",
                "Portfolio diversifiers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–6 years. No early redemption; exit via asset monetization."
        }
    },
    {
        name: "Bharat Value Fund – Series IV",
        category: "Category II",
        theme: "Value / Private Equity",
        manager: "Wealth Company Asset Management Pvt. Ltd.",
        desc: "Value-oriented private equity AIF focused on identifying undervalued businesses with strong turnaround or growth potential.",
        link: "/products/aif/bharat-value-series-iv",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "Wealth Company Asset Management Pvt. Ltd.",
            managerDescription: "Focused alternative investment platform with expertise in value investing, private equity strategies, and special situations.",
            strategyDescription: "Identifying mispriced opportunities across sectors with deep valuation analysis and active value-unlocking strategies.",
            coreFocusAreas: [
                "Undervalued mid-market companies",
                "Turnaround opportunities",
                "Special situations",
                "Sector-agnostic investments",
                "Deep valuation analysis",
                "Active value unlocking"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Industrials", value: 30 },
                    { name: "Financial Services", value: 25 },
                    { name: "Consumer", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Style",
                stageAllocation: [
                    { name: "Value Investments", value: 60 },
                    { name: "Special Situations", value: 25 },
                    { name: "Growth Opportunities", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 12 },
                    { name: "Holding Period (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Value investors",
                "Long-term investors",
                "Opportunistic strategy seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~4–6 years. No early redemption; exit via IPO or strategic acquisitions."
        }
    },
    {
        name: "White Whale Secondaries Fund",
        category: "Category II",
        theme: "PE Secondaries",
        manager: "White Whale Advisors LLP",
        desc: "Private equity secondaries AIF focused on acquiring existing stakes in mature portfolio companies and funds for attractive risk-adjusted returns.",
        link: "/products/aif/white-whale-secondaries",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "2–4 Years",
            targetIRR: "Capital Appreciation",
            manager: "White Whale Advisors LLP",
            managerDescription: "Specialized alternative investment firm with expertise in private equity secondaries and structured deal execution.",
            strategyDescription: "Generating attractive risk-adjusted returns by investing in seasoned assets with shorter holding periods and better visibility through secondary transactions.",
            coreFocusAreas: [
                "Secondary transactions in PE funds",
                "Existing stakes in portfolio companies",
                "Late-stage private equity investments",
                "Pre-IPO opportunities",
                "Discounted entry focus",
                "Faster liquidity strategies"
            ],
            graphs: {
                sectorAllocationTitle: "Allocation by Investment Type",
                sectorAllocation: [
                    { name: "Fund Secondaries", value: 50 },
                    { name: "Direct Secondaries", value: 30 },
                    { name: "Pre-IPO Deals", value: 20 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Late Stage", value: 60 },
                    { name: "Pre-IPO", value: 25 },
                    { name: "Growth Stage", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 12 },
                    { name: "Holding Period (Years)", value: 3 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Investors seeking shorter duration AIFs",
                "Private equity exposure seekers",
                "Risk-adjusted return investors"
            ],
            liquidity: "Close-ended fund with a lock-in of ~2–4 years. No early redemption; exit via secondary sales or IPO."
        }
    },
    {
        name: "Finavenue Growth Fund",
        category: "Category III",
        theme: "Long-Short / Absolute Return",
        manager: "Investment Team – A9 Finsight Private Limited",
        desc: "Category III hedge-style AIF focused on generating absolute returns using long-short strategies.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "A9 Finsight Private Limited",
            managerDescription: "A9 Finsight specializes in quantitative & discretionary strategies, active portfolio management, and risk-managed hedge investing. The investment approach is data-driven with dynamic long-short allocation and continuous risk monitoring.",
            strategyDescription: "Finavenue Growth Fund follows a long-short / absolute return strategy focused on alpha generation + volatility control. The fund aims to deliver consistent performance across market cycles with reduced downside risk compared to traditional long-only equity investing.",
            coreFocusAreas: [
                "Long positions in high-conviction stocks",
                "Short positions in overvalued or weak stocks",
                "Market-neutral trades",
                "Tactical & event-driven opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 60 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 40 },
                    { name: "Hedged", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioSnapshotTitle: "Portfolio Snapshot",
                portfolioSnapshot: [
                    { name: "Positions", value: 30 },
                    { name: "Holding Period (Days)", value: 90 },
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Investors seeking non-market-linked returns",
                "Hedged equity exposure seekers",
                "Active strategy investors"
            ],
            liquidity: "Open-ended structure with periodic subscription and redemption windows as per fund terms."
        }
    },
    {
        name: "AARTH AIF Growth Fund",
        category: "Category III",
        theme: "Long-Short / Growth",
        manager: "Investment Team – AARTH Asset Management",
        desc: "Category III AIF designed to generate absolute returns through actively managed equity strategies combining growth and hedging.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "AARTH Asset Management",
            managerDescription: "Focused on active equity strategies, hedge fund-style investing, and risk-managed portfolio construction using fundamental and tactical analysis.",
            strategyDescription: "AARTH AIF Growth Fund follows a long-short growth strategy, aiming to capture upside in high-growth companies while limiting downside risk through short positions and tactical allocation.",
            coreFocusAreas: [
                "Long positions in high-growth companies",
                "Short positions in weak/overvalued stocks",
                "Tactical sector allocation",
                "Market-neutral opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 65 },
                    { name: "Short Equity", value: 20 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long Exposure", value: 45 },
                    { name: "Hedged Exposure", value: 35 },
                    { name: "Market Neutral", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 30 },
                    { name: "Holding Period (Days)", value: 60 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Investors seeking absolute returns",
                "Hedged equity exposure seekers",
                "Active strategy investors"
            ],
            liquidity: "Open-ended fund with periodic subscription/redemption windows and liquidity as per fund terms."
        }
    },
    {
        name: "Abakkus Flexi Edge Fund I",
        category: "Category III",
        theme: "Flexi-Cap Long-Short",
        manager: "Abakkus Asset Manager LLP",
        desc: "Category III AIF focused on generating absolute returns through a flexible equity strategy across market caps, combining growth investing with hedging.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Abakkus Asset Manager LLP",
            managerDescription: "Well-known investment house specializing in equity investing, multi-cap strategies, and active portfolio management with a bottom-up stock selection approach.",
            strategyDescription: "Abakkus Flexi Edge Fund I follows a flexi-cap long-short strategy, providing flexibility across large, mid, and small-caps while utilizing dynamic hedging for risk management.",
            coreFocusAreas: [
                "Multi-cap equity investing",
                "High-quality growth companies",
                "Short positions for hedging",
                "Tactical sector allocation"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 40 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 25 }
                ],
                stageAllocationTitle: "Strategy Allocation",
                stageAllocation: [
                    { name: "Long Equity", value: 65 },
                    { name: "Short Equity", value: 20 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 35 },
                    { name: "Holding Period (Days)", value: 75 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Investors seeking flexible equity exposure",
                "Absolute return seekers",
                "Active strategy investors"
            ],
            liquidity: "Open-ended fund with periodic subscription and redemption options as per fund terms."
        }
    },
    {
        name: "ABSL Money Manager",
        category: "Category II",
        theme: "Credit / Income",
        manager: "ABSL AMC",
        desc: "Category II AIF focused on generating stable income and capital appreciation through investments in structured credit and fixed income instruments.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close Ended",
            minCommitment: "₹1 Crore",
            tenure: "2-4 years",
            targetIRR: "10-12% p.a.",
            manager: "ABSL AMC",
            managerDescription: "ABSL AMC is a leading asset manager with extensive experience in managing fixed income and credit strategies, focusing on robust credit analysis and risk management.",
            strategyDescription: "The fund invests in a diversified portfolio of high-quality, structured credit instruments, including corporate bonds, securitized debt, and other fixed-income assets, aiming for consistent income generation and capital preservation.",
            coreFocusAreas: [
                "Structured credit instruments",
                "Corporate bonds",
                "Securitized debt",
                "High-yield debt with strong covenants",
                "Diversified fixed income portfolio"
            ],
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Corporate Bonds", value: 40 },
                    { name: "Securitized Debt", value: 30 },
                    { name: "Other Fixed Income", value: 30 }
                ],
                stageAllocationTitle: "Credit Rating Profile",
                stageAllocation: [
                    { name: "AAA/AA", value: 60 },
                    { name: "A/BBB", value: 30 },
                    { name: "Below BBB", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Issuers", value: 25 },
                    { name: "Average Maturity (Years)", value: 2.5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Investors seeking stable income",
                "Fixed income exposure seekers",
                "Diversification from equity"
            ],
            liquidity: "Close-ended fund with limited liquidity options; exit typically at maturity or through secondary market opportunities."
        }
    },
    {
        name: "Accuracap AlphaGen Next Fund",
        category: "Category III",
        theme: "Quant Long-Short",
        manager: "Accuracap Investment Advisors LLP",
        desc: "Category III AIF focused on generating alpha-driven returns using quantitative and long-short strategies through data-driven models.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Accuracap Investment Advisors LLP",
            managerDescription: "Specializes in quantitative investing, algorithmic strategies, and systematic portfolio construction with a model-driven approach.",
            strategyDescription: "Accuracap AlphaGen Next Fund follows a quantitative long-short strategy, aiming for data-driven alpha generation through systematic stock selection and factor-based models.",
            coreFocusAreas: [
                "Systematic stock selection models",
                "Long positions in high-alpha stocks",
                "Short positions for hedging and alpha",
                "Market-neutral and factor-based strategies"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Quant Long", value: 55 },
                    { name: "Quant Short", value: 25 },
                    { name: "Arbitrage / Others", value: 20 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Market Neutral", value: 40 },
                    { name: "Hedged", value: 35 },
                    { name: "Net Long", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 45 },
                    { name: "Holding Period (Days)", value: 45 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Quant strategy investors",
                "Absolute return seekers",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic liquidity windows as per fund terms."
        }
    },
    {
        name: "ABSL India Special Opportunities Fund",
        category: "Category III",
        theme: "Special Situations / Long-Short",
        manager: "Aditya Birla Sun Life AMC Limited",
        desc: "Category III AIF designed to capture unique market opportunities through a long-short strategy, targeting absolute returns from event-driven and mispriced opportunities.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Aditya Birla Sun Life AMC Limited",
            managerDescription: "One of India's leading asset managers with expertise in equity, hybrid strategies, alternative investments, and institutional portfolio management.",
            strategyDescription: "ABSL India Special Opportunities Fund follows a special situations long-short strategy, targeting event-driven, mispriced, and high-conviction opportunities across Indian markets through dynamic allocation.",
            coreFocusAreas: [
                "Event-driven opportunities (mergers, restructuring)",
                "Special situations & mispriced assets",
                "Long positions in high-conviction ideas",
                "Short positions for hedging and alpha"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Special Situations", value: 45 },
                    { name: "Long Equity", value: 35 },
                    { name: "Short / Hedge", value: 20 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Hedged", value: 40 },
                    { name: "Net Long", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 30 },
                    { name: "Holding Period (Months)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Opportunistic investors",
                "Absolute return seekers",
                "Advanced market participants"
            ],
            liquidity: "Open-ended fund with periodic liquidity windows; subscription & redemption as per fund terms."
        }
    },
    {
        name: "India Equity Opportunities Fund (ABSL)",
        category: "Category III",
        theme: "Long-Only / Flexible Equity",
        manager: "Aditya Birla Sun Life AMC Limited",
        desc: "Category III AIF focused on capturing growth opportunities in Indian equity markets through quality multi-cap investments with active risk management.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Aditya Birla Sun Life AMC Limited",
            managerDescription: "A leading asset manager with strong capabilities in equity investing, multi-cap strategies, and institutional portfolio management.",
            strategyDescription: "India Equity Opportunities Fund follows a long-only flexible equity strategy, investing in high-quality growth businesses across market caps with bottom-up stock selection and dynamic portfolio allocation.",
            coreFocusAreas: [
                "High-quality growth companies",
                "Multi-cap equity opportunities",
                "Sector leaders & emerging businesses",
                "Tactical allocation based on market conditions"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 30 },
                    { name: "Avg Holding (Months)", value: 18 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Equity-focused investors",
                "Long-term wealth creators",
                "Market-linked return seekers"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption windows as per fund terms."
        }
    },
    {
        name: "Aequitas Equity Scheme I",
        category: "Category III",
        theme: "Long-Short Equity",
        manager: "Aequitas Investment Consultancy Pvt. Ltd.",
        desc: "Category III AIF focused on generating absolute returns through active long-short equity investing with multi-cap exposure and tactical sector allocation.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Aequitas Investment Consultancy Pvt. Ltd.",
            managerDescription: "Focused on equity investing, hedge fund strategies, and active portfolio management through fundamental research, tactical allocation, and dynamic hedging.",
            strategyDescription: "Aequitas Equity Scheme I follows a long-short equity strategy, combining long positions in fundamentally strong companies with short positions for hedging and alpha generation across multi-cap opportunities.",
            coreFocusAreas: [
                "Long positions in fundamentally strong companies",
                "Short positions for hedging and alpha",
                "Multi-cap equity exposure",
                "Tactical sector allocation"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 65 },
                    { name: "Short Equity", value: 20 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 45 },
                    { name: "Hedged", value: 35 },
                    { name: "Market Neutral", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 30 },
                    { name: "Holding Period (Months)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Absolute return seekers",
                "Hedged equity investors",
                "Active strategy investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Alchemy Leaders of Tomorrow Fund",
        category: "Category III",
        theme: "Long-Only / Growth",
        manager: "Alchemy Capital Management Pvt. Ltd.",
        desc: "Category III AIF focused on identifying future market leaders in mid and small-cap segments with long-term capital appreciation through high-growth businesses.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Alchemy Capital Management Pvt. Ltd.",
            managerDescription: "A reputed investment firm known for mid & small-cap expertise, growth investing strategies, and long-term wealth creation with high-conviction portfolio construction.",
            strategyDescription: "Alchemy Leaders of Tomorrow Fund follows a long-only growth strategy, identifying scalable businesses early through bottom-up stock selection with a long-term investment horizon focused on tomorrow's market leaders.",
            coreFocusAreas: [
                "Mid-cap and small-cap companies",
                "Emerging sector leaders",
                "High-growth businesses",
                "Sector-agnostic opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Small Cap", value: 50 },
                    { name: "Mid Cap", value: 40 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Industrials", value: 30 },
                    { name: "Consumer", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Months)", value: 24 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Mid & small-cap investors",
                "Growth-focused investors",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "AAA India Equity Fund – Scheme 1",
        category: "Category III",
        theme: "Long-Only Equity",
        manager: "AAA Investment Managers LLP",
        desc: "Category III AIF focused on generating long-term wealth through high-quality multi-cap equity investments across sectors with fundamental-driven stock selection.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "AAA Investment Managers LLP",
            managerDescription: "Focused on equity investing, multi-cap strategies, and active portfolio management through bottom-up research, high-conviction stock selection, and risk-managed allocation.",
            strategyDescription: "AAA India Equity Fund follows a long-only equity strategy, investing in quality businesses across sectors and market caps with fundamental-driven stock selection and a medium-to-long-term horizon.",
            coreFocusAreas: [
                "Multi-cap equity investments",
                "Sector leaders & high-growth companies",
                "Emerging business opportunities",
                "Fundamental-driven stock selection"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 30 },
                    { name: "Avg Holding (Months)", value: 18 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Equity-focused investors",
                "Long-term wealth creators",
                "Market-linked return seekers"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Alpha Alternatives Multi Strategy Fund",
        category: "Category III",
        theme: "Multi-Strategy / Absolute Return",
        manager: "Alpha Alternatives Fund Advisors LLP",
        desc: "Category III AIF generating consistent absolute returns using a diversified set of strategies including long-short equity, arbitrage, and event-driven opportunities.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Alpha Alternatives Fund Advisors LLP",
            managerDescription: "A leading alternative investment firm with expertise in multi-strategy hedge funds, quantitative and discretionary investing, and risk-managed portfolio construction.",
            strategyDescription: "Alpha Alternatives Multi Strategy Fund allocates capital across long-short equity, arbitrage, event-driven, and tactical strategies for diversified alpha generation and reduced risk across market cycles.",
            coreFocusAreas: [
                "Long-short equity strategies",
                "Arbitrage & market-neutral trades",
                "Event-driven opportunities",
                "Tactical & quantitative strategies"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long-Short Equity", value: 40 },
                    { name: "Arbitrage / Market Neutral", value: 30 },
                    { name: "Event-Driven", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Hedged Exposure", value: 45 },
                    { name: "Market Neutral", value: 30 },
                    { name: "Net Long", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 45 },
                    { name: "Holding Period (Months)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Investors seeking diversified strategies",
                "Absolute return seekers",
                "Risk-conscious alternative investors"
            ],
            liquidity: "Open-ended fund with periodic liquidity windows as per fund terms."
        }
    },
    {
        name: "AlphaGrep Index Plus Fund",
        category: "Category III",
        theme: "Quant / Market Neutral",
        manager: "AlphaGrep Investment Management LLP",
        desc: "Quantitative Category III AIF generating consistent alpha over benchmark indices using systematic, algorithmic, and market-neutral strategies.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "AlphaGrep Investment Management LLP",
            managerDescription: "A leading quantitative investment firm with expertise in algorithmic trading, quantitative research, and market-neutral strategies using data-driven models and statistical analysis.",
            strategyDescription: "AlphaGrep Index Plus Fund uses index-based strategies with alpha overlay, statistical arbitrage, and systematic long-short trades to deliver stable market-neutral returns with low correlation to traditional equity markets.",
            coreFocusAreas: [
                "Index-based strategies with alpha overlay",
                "Statistical arbitrage",
                "Factor-based investing",
                "Systematic long-short trades"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Quant Long-Short", value: 50 },
                    { name: "Arbitrage / Stat Arb", value: 30 },
                    { name: "Index Overlay", value: 20 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Market Neutral", value: 50 },
                    { name: "Hedged Exposure", value: 35 },
                    { name: "Net Long", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 75 },
                    { name: "Holding Period (Days)", value: 30 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Quant strategy investors",
                "Low-volatility return seekers",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with frequent liquidity windows as per fund terms."
        }
    },
    {
        name: "AlphaMine Absolute Return Fund",
        category: "Category III",
        theme: "Long-Short / Absolute Return",
        manager: "AlphaMine Investment Advisors LLP",
        desc: "Category III AIF delivering consistent absolute returns across market conditions through long-short equity strategies and tactical allocation with controlled risk.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "AlphaMine Investment Advisors LLP",
            managerDescription: "Focused on hedge fund strategies, active equity investing, and risk-managed portfolio construction using fundamental and tactical analysis with dynamic positioning.",
            strategyDescription: "AlphaMine Absolute Return Fund uses a long-short equity strategy with tactical allocation, combining high-conviction long positions with targeted short exposure to deliver alpha with strong downside protection.",
            coreFocusAreas: [
                "Long positions in high-conviction stocks",
                "Short positions for hedging and alpha",
                "Market-neutral opportunities",
                "Tactical allocation strategies"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 60 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 40 },
                    { name: "Hedged", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 30 },
                    { name: "Holding Period (Months)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Absolute return seekers",
                "Hedged equity investors",
                "Active strategy investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Ajanta India Fund I",
        category: "Category III",
        theme: "Long-Only Equity",
        manager: "Ajanta Investment Managers LLP",
        desc: "Category III AIF focused on generating long-term capital appreciation through equity investments in Indian markets with a high-conviction portfolio of fundamentally strong businesses.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Ajanta Investment Managers LLP",
            managerDescription: "Focused on equity investing, long-term portfolio construction, and high-conviction strategies using bottom-up stock selection, scalable business identification, and a concentrated portfolio approach with a long-term investment horizon.",
            strategyDescription: "Ajanta India Fund I follows a long-only equity strategy, building a high-conviction portfolio of fundamentally strong businesses with sustainable growth potential across market caps and sectors.",
            coreFocusAreas: [
                "Multi-cap equity investments",
                "High-quality growth companies",
                "Sector leaders and emerging businesses",
                "Fundamental-driven stock selection"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Months)", value: 24 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Equity-focused investors",
                "Long-term wealth creators",
                "High-conviction portfolio seekers"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Altacura AI Absolute Return Fund",
        category: "Category III",
        theme: "AI Quant / Absolute Return",
        manager: "Altacura Investment Advisors LLP",
        desc: "Category III AIF that leverages artificial intelligence and quantitative models to generate consistent absolute returns with low volatility and risk-adjusted performance.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Altacura Investment Advisors LLP",
            managerDescription: "Focused on AI-driven investing, quantitative strategies, and algorithmic trading using machine learning models, big data analytics, continuous model optimization, and risk-controlled execution.",
            strategyDescription: "Altacura AI Absolute Return Fund leverages artificial intelligence and quantitative models to generate consistent absolute returns by combining AI-driven insights with systematic trading strategies for low-volatility, risk-adjusted performance.",
            coreFocusAreas: [
                "Machine learning-based stock selection",
                "Systematic long-short strategies",
                "Statistical arbitrage opportunities",
                "Market-neutral positioning"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "AI Long-Short", value: 55 },
                    { name: "Statistical Arbitrage", value: 25 },
                    { name: "Market Neutral", value: 20 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Market Neutral", value: 45 },
                    { name: "Hedged", value: 35 },
                    { name: "Net Long", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 60 },
                    { name: "Holding Period (Days)", value: 30 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Quant & AI strategy investors",
                "Low-correlation return seekers",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Alta Cura AI Maximus Fund",
        category: "Category III",
        theme: "AI Quant / Enhanced Absolute Return",
        manager: "Altacura Investment Advisors LLP",
        desc: "Category III AIF leveraging advanced AI and quantitative models to generate enhanced absolute returns with high-conviction, data-driven strategies and strict risk controls.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Altacura Investment Advisors LLP",
            managerDescription: "Specializes in AI-driven investing, quantitative trading, and algorithmic strategies using advanced machine learning models, big data analysis, continuous optimization, and risk-controlled execution.",
            strategyDescription: "Alta Cura AI Maximus Fund leverages advanced AI and quantitative models to generate enhanced absolute returns, focusing on maximizing alpha through high-conviction, data-driven strategies with strict risk management and disciplined execution.",
            coreFocusAreas: [
                "Machine learning-based investment models",
                "High-frequency & systematic trading",
                "Long-short equity strategies",
                "Market-neutral opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "AI Long-Short", value: 60 },
                    { name: "Statistical Arbitrage", value: 25 },
                    { name: "Market Neutral", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Market Neutral", value: 40 },
                    { name: "Hedged", value: 35 },
                    { name: "Net Long", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 75 },
                    { name: "Holding Period (Days)", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "AI & quant strategy investors",
                "High-alpha seekers",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic liquidity windows and subscription & redemption as per fund terms."
        }
    },
    {
        name: "Ambit Pricing Prowess Fund",
        category: "Category III",
        theme: "Long-Only Flexi-Cap / Pricing Power",
        manager: "Ambit Asset Management",
        desc: "Category III AIF investing in high-quality businesses with strong pricing power, enabling sustainable earnings growth and margin stability for long-term absolute returns.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Ambit Asset Management",
            managerDescription: "A reputed investment firm known for deep fundamental research, proprietary investment frameworks, and long-term wealth creation strategies through bottom-up stock selection and a focus on quality, moat, and pricing ability.",
            strategyDescription: "Ambit Pricing Prowess Fund follows a long-only flexi-cap strategy based on Ambit's proprietary Pricing Power Framework, investing in companies that can pass on costs without losing market share, enabling sustainable earnings growth and consistent compounding.",
            coreFocusAreas: [
                "Companies with strong pricing power",
                "High-quality businesses with durable moats",
                "Multi-cap equity opportunities",
                "Businesses with consistent compounding potential"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 40 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 25 }
                ],
                stageAllocationTitle: "Strategy Focus",
                stageAllocation: [
                    { name: "Pricing Power Leaders", value: 60 },
                    { name: "Emerging Leaders", value: 25 },
                    { name: "Opportunistic Ideas", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 25 },
                    { name: "Avg Holding (Months)", value: 36 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Long-term equity investors",
                "Quality-focused investors",
                "Core portfolio builders"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Ampersand Growth Opportunities Fund",
        category: "Category III",
        theme: "Growth / Long-Short",
        manager: "Ampersand Investment Management",
        desc: "Category III AIF focused on generating absolute returns through growth-oriented equity strategies, combining long-term growth investing with tactical hedging across market cycles.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Ampersand Investment Management",
            managerDescription: "Focused on growth investing, hedge fund strategies, and active portfolio management using fundamental & growth analysis, dynamic long-short allocation, tactical sector positioning, and continuous risk monitoring.",
            strategyDescription: "Ampersand Growth Opportunities Fund combines long-term growth investing with tactical hedging, using a growth + long-short strategy to capture alpha from high-growth companies across sectors while managing downside through active short positions.",
            coreFocusAreas: [
                "High-growth companies across sectors",
                "Multi-cap equity opportunities",
                "Long positions in scalable businesses",
                "Short positions for hedging and alpha"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 40 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 25 }
                ],
                stageAllocationTitle: "Strategy Allocation",
                stageAllocation: [
                    { name: "Long Equity", value: 65 },
                    { name: "Short Equity", value: 20 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 30 },
                    { name: "Avg Holding (Months)", value: 8 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Absolute return seekers",
                "Active strategy investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Ashika India Select Fund",
        category: "Category III",
        theme: "Long-Only Equity / High Conviction",
        manager: "Ashika Investment Managers Pvt. Ltd.",
        desc: "Category III AIF building a high-conviction equity portfolio of select high-quality Indian companies, targeting long-term capital appreciation through concentrated, fundamentally-driven investing.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Ashika Investment Managers Pvt. Ltd.",
            managerDescription: "Focused on equity investing, concentrated portfolios, and long-term wealth creation through bottom-up stock selection, scalable business identification, and high-conviction portfolio construction with a long-term investment horizon.",
            strategyDescription: "Ashika India Select Fund follows a long-only select equity strategy, building a concentrated portfolio of high-quality Indian businesses with strong fundamentals and growth visibility for long-term capital appreciation.",
            coreFocusAreas: [
                "Concentrated portfolio of high-conviction ideas",
                "Multi-cap equity opportunities",
                "Sector leaders and emerging businesses",
                "Fundamental-driven investing"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 20 },
                    { name: "Avg Holding (Months)", value: 24 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "High-conviction equity investors",
                "Long-term wealth creators",
                "Concentrated portfolio seekers"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Ashmore India Equity Fund",
        category: "Category III",
        theme: "Long-Only / Emerging Markets Equity",
        manager: "Ashmore Investment Management India LLP",
        desc: "Category III AIF leveraging Ashmore's global emerging markets expertise to deliver long-term capital appreciation by investing in high-quality Indian equities with strong macro and sector tailwinds.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Ashmore Investment Management India LLP",
            managerDescription: "Part of Ashmore Group, a global specialist in emerging markets investing. Known for institutional-grade research, global EM framework, local expertise, bottom-up stock selection, and a focus on macro and sector trends with a long-term investment horizon.",
            strategyDescription: "Ashmore India Equity Fund follows a long-only emerging markets equity strategy, leveraging Ashmore's global EM investment framework to identify high-quality growth opportunities in India across market caps and sectors.",
            coreFocusAreas: [
                "High-quality Indian companies",
                "Emerging sector leaders",
                "Multi-cap opportunities",
                "Strong macro and sector tailwinds"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 50 },
                    { name: "Mid Cap", value: 30 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Months)", value: 24 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "India growth story investors",
                "Emerging markets investors",
                "Long-term equity investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Astratinvest Quant Long Short Fund",
        category: "Category III",
        theme: "Quant Long-Short / Absolute Return",
        manager: "Astratinvest Asset Management LLP",
        desc: "Category III AIF generating consistent absolute returns using quantitative models and long-short strategies with low correlation to traditional equity markets.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Astratinvest Asset Management LLP",
            managerDescription: "Focused on quantitative investing, algorithmic strategies, and systematic portfolio construction through data-driven decision making, factor-based models, continuous optimization, and risk-managed allocation.",
            strategyDescription: "Astratinvest Quant Long Short Fund uses algorithm-driven stock selection and long-short positioning to generate systematic alpha across market cycles, maintaining low correlation with traditional equity markets through disciplined risk controls.",
            coreFocusAreas: [
                "Algorithm-driven stock selection",
                "Long positions in high-alpha stocks",
                "Short positions for hedging and alpha",
                "Market-neutral & factor-based investing"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Quant Long", value: 55 },
                    { name: "Quant Short", value: 25 },
                    { name: "Arbitrage / Others", value: 20 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Market Neutral", value: 45 },
                    { name: "Hedged Exposure", value: 35 },
                    { name: "Net Long", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 60 },
                    { name: "Holding Period (Days)", value: 30 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Quant strategy investors",
                "Low-correlation return seekers",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Azurean India Equity Fund",
        category: "Category III",
        theme: "Long-Only Equity",
        manager: "Azurean Investment Management LLP",
        desc: "Category III AIF focused on generating long-term capital appreciation through a high-quality, diversified portfolio of Indian equity companies with strong growth potential and sustainable competitive advantages.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Azurean Investment Management LLP",
            managerDescription: "Focused on equity investing, growth strategies, and long-term wealth creation through bottom-up research, a focus on scalable businesses, long-term investment horizon, and risk-managed allocation.",
            strategyDescription: "Azurean India Equity Fund follows a long-only equity strategy, building a high-quality, diversified portfolio of multi-cap Indian companies with strong growth potential, using fundamental research and disciplined stock selection for long-term compounding.",
            coreFocusAreas: [
                "Multi-cap equity investments",
                "High-growth and quality businesses",
                "Sector leaders and emerging companies",
                "Fundamental-driven stock selection"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Months)", value: 24 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Equity-focused investors",
                "Long-term wealth creators",
                "Growth-oriented investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Bonanza Opportunity Fund",
        category: "Category III",
        theme: "Opportunistic Long-Short",
        manager: "Bonanza Portfolio Limited",
        desc: "Category III AIF capturing opportunistic market trends through active long-short strategies to generate absolute returns across market cycles by leveraging short-term inefficiencies.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Bonanza Portfolio Limited",
            managerDescription: "Focused on active trading strategies, opportunistic investing, and market timing through tactical market analysis, dynamic portfolio adjustments, sector rotation strategies, and risk-controlled execution.",
            strategyDescription: "Bonanza Opportunity Fund uses an opportunistic long-short strategy, combining tactical long positions in high-potential stocks with short positions in weak or overvalued sectors and event-driven opportunities to generate alpha across market cycles.",
            coreFocusAreas: [
                "Tactical long positions in high-potential stocks",
                "Short positions in weak/overvalued sectors",
                "Event-driven opportunities",
                "Sector rotation strategies"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 55 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 20 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Hedged", value: 40 },
                    { name: "Net Long", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 38 },
                    { name: "Avg Holding (Months)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Tactical investors",
                "Absolute return seekers",
                "Active strategy investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Brighter Mind Inevitable Fortune Fund",
        category: "Category III",
        theme: "Long-Short / Absolute Return",
        manager: "Brighter Mind Asset Management",
        desc: "Category III AIF generating consistent absolute returns through actively managed equity strategies, capitalizing on market inefficiencies with disciplined risk management.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Brighter Mind Asset Management",
            managerDescription: "Focused on active equity strategies, hedge fund-style investing, and risk-managed portfolio construction through fundamental and tactical analysis, dynamic allocation, continuous risk monitoring, and active portfolio adjustments.",
            strategyDescription: "Brighter Mind Inevitable Fortune Fund employs a long-short absolute return strategy, combining long positions in fundamentally strong companies with short positions for hedging and alpha generation, maintaining multi-cap equity exposure with robust downside protection.",
            coreFocusAreas: [
                "Long positions in fundamentally strong companies",
                "Short positions for hedging and alpha generation",
                "Tactical market opportunities",
                "Multi-cap equity exposure"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 60 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 40 },
                    { name: "Hedged", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 30 },
                    { name: "Avg Holding (Months)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Absolute return seekers",
                "Hedged equity investors",
                "Active strategy investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Buoyant Opportunities Strategy",
        category: "Category III",
        theme: "Opportunistic Long-Short",
        manager: "Buoyant Capital",
        desc: "Category III AIF generating absolute returns by capturing market opportunities across cycles through tactical allocation, sector rotation, and long-short strategies.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Buoyant Capital",
            managerDescription: "Focused on tactical investing, opportunistic strategies, and active portfolio management through dynamic asset allocation, sector rotation strategies, active risk management, and continuous market monitoring.",
            strategyDescription: "Buoyant Opportunities Strategy uses a flexible long-short approach, combining long positions in high-conviction opportunities with short positions in weak or overvalued stocks and event-driven trades to generate alpha across rising and falling markets.",
            coreFocusAreas: [
                "Long positions in high-conviction opportunities",
                "Short positions in weak or overvalued stocks",
                "Sector rotation based on market trends",
                "Event-driven and tactical opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 55 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 20 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Hedged", value: 40 },
                    { name: "Net Long", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 38 },
                    { name: "Avg Holding (Months)", value: 7 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Tactical investors",
                "Absolute return seekers",
                "Active strategy investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Carnelian Bharat Amritkaal Fund",
        category: "Category III",
        theme: "Thematic / Long-Only Equity",
        manager: "Carnelian Asset Management & Advisors LLP",
        desc: "Category III AIF built around India's 'Amritkaal' growth phase, investing in businesses benefiting from India's structural, long-term economic transformation for superior capital appreciation.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Carnelian Asset Management & Advisors LLP",
            managerDescription: "Known for thematic investing approach, deep macro and sector insights, and high-conviction portfolio construction through theme-driven investing, bottom-up stock selection, and a focus on structural growth sectors for long-term wealth creation.",
            strategyDescription: "Carnelian Bharat Amritkaal Fund follows a thematic long-only equity strategy, investing in businesses across manufacturing & industrials, financial services, consumption, and export-oriented sectors benefiting from India's next decade of transformational growth.",
            coreFocusAreas: [
                "Manufacturing & industrial growth",
                "Financialization of savings",
                "Consumption & premiumization",
                "Export-oriented businesses"
            ],
            graphs: {
                sectorAllocationTitle: "Theme Allocation",
                sectorAllocation: [
                    { name: "Manufacturing & Industrials", value: 30 },
                    { name: "Financial Services", value: 25 },
                    { name: "Consumption", value: 25 },
                    { name: "Exports / Global Plays", value: 20 }
                ],
                stageAllocationTitle: "Market Cap Allocation",
                stageAllocation: [
                    { name: "Large Cap", value: 40 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Months)", value: 36 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "India growth story believers",
                "Thematic investors",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended structure with defined liquidity windows; subscription & redemption as per fund terms."
        }
    },
    {
        name: "CCV Emerging Opportunities Fund I",
        category: "Category III",
        theme: "Emerging Growth / Long-Only",
        manager: "CCV Investment Managers LLP",
        desc: "Category III AIF focused on identifying high-growth emerging companies in India, delivering long-term capital appreciation by investing in early-stage leaders and scalable businesses.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "CCV Investment Managers LLP",
            managerDescription: "Focused on emerging market opportunities, growth investing, and early-stage business identification through bottom-up research, a focus on scalability and innovation, long-term investment horizon, and high-growth orientation.",
            strategyDescription: "CCV Emerging Opportunities Fund I follows an emerging businesses long-only strategy, investing in small & mid-cap high-growth companies across sectors with scalable and innovative business models, targeting tomorrow's market leaders at an early stage.",
            coreFocusAreas: [
                "Small & mid-cap emerging companies",
                "High-growth sectors",
                "Scalable and innovative businesses",
                "Early-stage leaders"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Small Cap", value: 50 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Industrials", value: 30 },
                    { name: "Consumer", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Months)", value: 36 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Small & mid-cap investors",
                "High-growth opportunity seekers",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "D&B India Opportunities Multicap Fund",
        category: "Category III",
        theme: "Multi-Cap / Long-Only Equity",
        manager: "Dolat & Bhavesh Asset Management LLP",
        desc: "Category III AIF generating long-term capital appreciation by investing across large, mid, and small-cap companies in India with a balanced, diversified portfolio and fundamental-driven approach.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Dolat & Bhavesh Asset Management LLP",
            managerDescription: "Focused on multi-cap investing, growth strategies, and active portfolio management through bottom-up research, balanced allocation across market caps, focus on scalable businesses, and dynamic portfolio adjustments.",
            strategyDescription: "D&B India Opportunities Multicap Fund follows a multi-cap long-only strategy, combining large-cap stability, mid-cap growth, and small-cap alpha through fundamental-driven investing with sector rotation to deliver diversified, risk-balanced capital appreciation.",
            coreFocusAreas: [
                "Large-cap stability + mid-cap growth + small-cap alpha",
                "High-quality companies across sectors",
                "Sector rotation based on opportunities",
                "Fundamental-driven investing"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 40 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 25 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 33 },
                    { name: "Avg Holding (Months)", value: 24 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Multi-cap investors",
                "Diversification seekers",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Edelweiss Alternative Equity Scheme",
        category: "Category III",
        theme: "Long-Short / Absolute Return",
        manager: "Edelweiss Asset Management Limited",
        desc: "Category III AIF generating consistent absolute returns through actively managed long-short equity strategies, combining directional equity exposure with hedging for stable performance across market cycles.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Edelweiss Asset Management Limited",
            managerDescription: "A leading asset management company with expertise in alternative investments, hedge fund strategies, and institutional portfolio management through fundamental and quantitative analysis, dynamic long-short allocation, and active monitoring and rebalancing.",
            strategyDescription: "Edelweiss Alternative Equity Scheme follows a long-short absolute return strategy, combining long positions in fundamentally strong companies with short positions for hedging and alpha generation, supplemented by market-neutral and event-driven trades.",
            coreFocusAreas: [
                "Long positions in fundamentally strong companies",
                "Short positions for hedging and alpha generation",
                "Market-neutral opportunities",
                "Tactical and event-driven trades"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 60 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 40 },
                    { name: "Hedged", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 30 },
                    { name: "Avg Holding (Months)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Absolute return seekers",
                "Hedged equity investors",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Emkay Emerging Stars Fund – Series VI",
        category: "Category III",
        theme: "Emerging Growth / Long-Only",
        manager: "Emkay Investment Managers Ltd.",
        desc: "Category III AIF identifying next-generation growth companies in India, generating long-term capital appreciation by investing in emerging leaders with scalable business models and strong growth visibility.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Emkay Investment Managers Ltd.",
            managerDescription: "Known for mid & small-cap expertise, growth-oriented investing, and strong research-driven approach through bottom-up stock selection, focus on scalability and earnings growth, long-term investment horizon, and high-conviction portfolio construction.",
            strategyDescription: "Emkay Emerging Stars Fund follows an emerging growth long-only strategy, investing in small & mid-cap high-growth companies and emerging sector leaders with scalable and innovative business models for superior long-term capital appreciation.",
            coreFocusAreas: [
                "Small & mid-cap high-growth companies",
                "Emerging sector leaders",
                "Scalable and innovative businesses",
                "Early-stage growth opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Small Cap", value: 50 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Industrials", value: 30 },
                    { name: "Consumer", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Months)", value: 36 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Small & mid-cap investors",
                "Growth-focused investors",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended fund with periodic liquidity windows; subscription & redemption as per fund terms."
        }
    },
    {
        name: "Enigma Small Opportunities Fund",
        category: "Category III",
        theme: "Small-Cap / Long-Only",
        manager: "Enigma Investment Advisors LLP",
        desc: "Category III AIF focused on identifying high-growth small-cap companies in India, generating long-term capital appreciation by investing in undiscovered and emerging businesses with strong scalability potential.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Enigma Investment Advisors LLP",
            managerDescription: "Focused on small-cap investing, emerging opportunities, and high-growth strategies through deep fundamental research, identification of under-researched companies, long-term investment horizon, and high-conviction portfolio construction.",
            strategyDescription: "Enigma Small Opportunities Fund follows a small-cap focused long-only strategy, investing in under-researched and emerging businesses with strong scalability potential, targeting early-stage discovery of high-growth companies ahead of market recognition.",
            coreFocusAreas: [
                "Small-cap high-growth companies",
                "Emerging sector leaders",
                "Under-researched opportunities",
                "Scalable business models"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Small Cap", value: 70 },
                    { name: "Mid Cap", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Industrials", value: 30 },
                    { name: "Consumer", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Months)", value: 36 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Small-cap investors",
                "High-risk, high-return seekers",
                "Long-term growth investors"
            ],
            liquidity: "Open-ended structure with periodic liquidity windows; subscription & redemption as per fund terms."
        }
    },
    {
        name: "Finideas Growth Fund – Scheme 1",
        category: "Category III",
        theme: "Growth / Long-Only Equity",
        manager: "Finideas Investment Advisors LLP",
        desc: "Category III AIF generating long-term capital appreciation through growth-oriented equity investing, building a high-conviction portfolio of scalable businesses with strong earnings visibility.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Finideas Investment Advisors LLP",
            managerDescription: "Focused on growth investing, equity portfolio construction, and long-term wealth creation through bottom-up research, focus on scalable and profitable businesses, long-term investment horizon, and high-conviction portfolio construction.",
            strategyDescription: "Finideas Growth Fund follows a growth long-only equity strategy, building a high-conviction multi-cap portfolio of scalable businesses with strong earnings visibility and long-term growth potential for consistent capital compounding.",
            coreFocusAreas: [
                "High-growth companies across sectors",
                "Multi-cap equity opportunities",
                "Businesses with strong scalability",
                "Sector leaders and emerging players"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 40 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 25 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Months)", value: 36 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Long-term wealth creators",
                "Equity market participants"
            ],
            liquidity: "Open-ended structure with periodic liquidity windows; subscription & redemption as per fund terms."
        }
    },
    {
        name: "First Water Capital Fund II",
        category: "Category II",
        theme: "Growth / Private Equity",
        manager: "First Water Capital Advisors LLP",
        desc: "Category II AIF focused on investing in growth-stage companies across high-potential sectors in India, delivering long-term capital appreciation by backing scalable businesses with strong fundamentals.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "Long-term Capital Appreciation",
            manager: "First Water Capital Advisors LLP",
            managerDescription: "Focused on private equity investments, growth capital strategies, and mid-market opportunities through bottom-up stock selection, strong promoter evaluation, sector and macro analysis, and active portfolio management.",
            strategyDescription: "First Water Capital Fund II follows a growth / private equity strategy, investing in mid-market growth companies across consumer & retail, healthcare, industrials, and technology sectors with scalable business models and strong execution capability.",
            coreFocusAreas: [
                "Mid-market growth companies",
                "Consumer & retail businesses",
                "Healthcare & pharma",
                "Industrials and manufacturing"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Retail", value: 30 },
                    { name: "Healthcare", value: 25 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Capital", value: 50 },
                    { name: "Expansion Capital", value: 35 },
                    { name: "Pre-IPO", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 12 },
                    { name: "Avg Holding (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Private equity investors",
                "Long-term capital allocators",
                "Growth-focused investors"
            ],
            liquidity: "Close-ended fund with lock-in of approximately 5–7 years. No early redemption; exit via IPO or strategic sale."
        }
    },
    {
        name: "GCIV Breakout Fund I",
        category: "Category III",
        theme: "Breakout / Momentum",
        manager: "GCIV Investment Advisors LLP",
        desc: "Category III AIF capturing high-momentum equity opportunities using breakout patterns supported by fundamentals and technical indicators for sharp alpha generation.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "GCIV Investment Advisors LLP",
            managerDescription: "Focused on momentum investing, technical-driven strategies, and active trading through technical and fundamental analysis, breakout identification models, active risk management, and dynamic portfolio allocation.",
            strategyDescription: "GCIV Breakout Fund I uses a breakout/momentum-driven strategy, investing in stocks breaking key technical resistance levels with strong fundamental backing, combining tactical entry and exit discipline with active risk controls for consistent alpha.",
            coreFocusAreas: [
                "Stocks breaking key technical resistance levels",
                "Momentum-driven opportunities",
                "High-growth and high-volume stocks",
                "Tactical entry and exit strategies"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Breakout Trades", value: 60 },
                    { name: "Momentum Trades", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 50 },
                    { name: "Hedged", value: 30 },
                    { name: "Market Neutral", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 38 },
                    { name: "Holding Period (Days)", value: 20 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Momentum strategy investors",
                "Active traders",
                "Short-term opportunity seekers"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Geojit Yield Plus Fund",
        category: "Category II",
        theme: "Credit / Income",
        manager: "Geojit Financial Services Ltd.",
        desc: "Category II AIF generating stable income through credit-oriented investments including structured credit, corporate debt, and private credit deals with focus on capital preservation.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Income + Capital Preservation",
            manager: "Geojit Financial Services Ltd.",
            managerDescription: "A well-established financial services firm with expertise in fixed income investing, credit strategies, and wealth and portfolio management through credit risk assessment, structured deal evaluation, and diversified portfolio construction with yield optimization.",
            strategyDescription: "Geojit Yield Plus Fund follows a credit/income strategy, investing across structured credit, corporate debt, and private credit opportunities designed to deliver consistent income with relatively lower volatility and strong capital preservation.",
            coreFocusAreas: [
                "Structured credit opportunities",
                "Corporate debt instruments",
                "Yield-generating assets",
                "Private credit deals"
            ],
            graphs: {
                sectorAllocationTitle: "Allocation by Instrument",
                sectorAllocation: [
                    { name: "Structured Credit", value: 40 },
                    { name: "Corporate Debt", value: 30 },
                    { name: "Private Credit", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Credit Profile",
                stageAllocation: [
                    { name: "Investment Grade", value: 50 },
                    { name: "AA & Below", value: 30 },
                    { name: "Opportunistic Credit", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 12 },
                    { name: "Avg Holding (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry / Incentive Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Low-volatility seekers",
                "Fixed income allocators"
            ],
            liquidity: "Close-ended fund with lock-in of approximately 3–5 years. Exit via maturity or structured repayment."
        }
    },
    {
        name: "Grobiz SME Opportunities Fund",
        category: "Category II",
        theme: "SME / Growth Capital",
        manager: "Grobiz Financial Services LLP",
        desc: "Category II AIF investing in high-growth Small & Medium Enterprises in India, generating long-term capital appreciation by backing emerging businesses with strong scalability.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Close-Ended",
            minCommitment: "₹1 Crore",
            tenure: "4–6 Years",
            targetIRR: "Capital Appreciation",
            manager: "Grobiz Financial Services LLP",
            managerDescription: "Focused on SME investments, growth capital strategies, and mid-market opportunities through bottom-up research, promoter due diligence, focus on scalability, and active portfolio involvement.",
            strategyDescription: "Grobiz SME Opportunities Fund follows an SME/growth capital strategy, investing in early growth-stage and sector-agnostic SME businesses with promoter-driven scalable models, targeting long-term value creation through active portfolio management.",
            coreFocusAreas: [
                "SME & mid-market businesses",
                "Early growth-stage companies",
                "Sector-agnostic opportunities",
                "Promoter-driven scalable businesses"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Industrials", value: 30 },
                    { name: "Consumer", value: 25 },
                    { name: "Services", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Capital", value: 50 },
                    { name: "Early Expansion", value: 30 },
                    { name: "Pre-IPO", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 10 },
                    { name: "Avg Holding (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "SME growth investors",
                "High-risk, high-return seekers",
                "Long-term capital allocators"
            ],
            liquidity: "Close-ended fund with lock-in of approximately 4–6 years. No early redemption; exit via IPO or strategic sale."
        }
    },
    {
        name: "Helios India Long Short Fund",
        category: "Category III",
        theme: "Long-Short / Absolute Return",
        manager: "Helios Capital Management (India) LLP",
        desc: "Category III AIF generating absolute returns across market cycles using long-short equity strategies with fundamental research and active hedging for consistent performance and downside protection.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Helios Capital Management (India) LLP",
            managerDescription: "A reputed investment firm known for long-short equity strategies, fundamental research-driven investing, and risk-managed portfolio construction through bottom-up stock selection, identification of mispriced opportunities, dynamic long-short allocation, and continuous risk monitoring.",
            strategyDescription: "Helios India Long Short Fund combines long positions in high-quality, high-conviction stocks with short positions in structurally weak or overvalued businesses, using sector rotation and market-neutral positioning for consistent alpha with strong downside protection.",
            coreFocusAreas: [
                "Long positions in high-quality, high-conviction stocks",
                "Short positions in structurally weak or overvalued businesses",
                "Sector rotation and tactical opportunities",
                "Market-neutral positioning"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 60 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Hedged", value: 40 },
                    { name: "Net Long", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 30 },
                    { name: "Avg Holding (Months)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Absolute return seekers",
                "Hedged equity investors",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Smart Horizon Opportunity Fund",
        category: "Category III",
        theme: "Opportunistic Long-Short",
        manager: "Smart Horizon Investment Advisors LLP",
        desc: "Category III AIF generating absolute returns by capturing tactical and opportunistic equity market trends through active portfolio management and flexible strategy allocation.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Smart Horizon Investment Advisors LLP",
            managerDescription: "Focused on opportunistic investing, active trading strategies, and dynamic portfolio management through tactical market analysis, flexible asset allocation, risk-controlled execution, and continuous monitoring and rebalancing.",
            strategyDescription: "Smart Horizon Opportunity Fund follows an opportunistic long-short strategy, combining tactical long positions in high-potential stocks with short positions in weak or overvalued sectors and event-driven trades for consistent alpha across market cycles.",
            coreFocusAreas: [
                "Tactical long positions in high-potential stocks",
                "Short positions in weak or overvalued sectors",
                "Event-driven opportunities",
                "Sector rotation and trend-based allocation"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 55 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 20 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Hedged", value: 40 },
                    { name: "Net Long", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 38 },
                    { name: "Avg Holding (Months)", value: 7 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Tactical investors",
                "Absolute return seekers",
                "Active strategy investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "ICICI Prudential Enhanced Dynamic Equity Fund",
        category: "Category III",
        theme: "Dynamic Equity / Long-Short",
        manager: "ICICI Prudential Asset Management Company Ltd.",
        desc: "Category III AIF delivering enhanced equity returns through dynamic allocation and hedging strategies, combining long-term equity exposure with tactical adjustments for consistent risk-adjusted returns.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return + Enhanced Equity",
            manager: "ICICI Prudential Asset Management Company Ltd.",
            managerDescription: "One of India's leading asset managers with expertise in dynamic asset allocation, equity and hybrid strategies, and risk-managed portfolio construction through data-driven allocation models, fundamental and quantitative analysis, dynamic hedging strategies, and continuous portfolio rebalancing.",
            strategyDescription: "ICICI Prudential Enhanced Dynamic Equity Fund combines core long equity positions with dynamic hedging based on market conditions, tactical asset allocation, and arbitrage/market-neutral strategies to deliver consistent enhanced returns with managed risk.",
            coreFocusAreas: [
                "Long positions in high-quality equity opportunities",
                "Dynamic hedging based on market conditions",
                "Tactical asset allocation",
                "Arbitrage and market-neutral strategies"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Core Equity", value: 55 },
                    { name: "Hedging / Short", value: 25 },
                    { name: "Arbitrage / Others", value: 20 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Hedged", value: 40 },
                    { name: "Net Long", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 45 },
                    { name: "Avg Holding (Months)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Dynamic allocation investors",
                "Risk-managed equity seekers",
                "Absolute return investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "InCred Dynamic Equity Asymmetric Returns Fund",
        category: "Category III",
        theme: "Dynamic / Asymmetric Long-Short",
        manager: "InCred Asset Management",
        desc: "Category III AIF focused on generating asymmetric risk-reward returns through dynamic equity allocation and hedging strategies to maximize upside while limiting downside.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "InCred Asset Management",
            managerDescription: "A leading investment firm with expertise in dynamic asset allocation, alternative investments, and risk-managed equity strategies using an asymmetric risk-reward framework and continuous optimization.",
            strategyDescription: "The fund follows an asymmetric long-short dynamic strategy, focusing on high-conviction growth opportunities combined with dynamic hedging to protect the downside and tactical allocation based on market cycles.",
            coreFocusAreas: [
                "Long positions in high-conviction growth opportunities",
                "Dynamic hedging to protect downside",
                "Tactical asset allocation based on market cycles",
                "Arbitrage and market-neutral opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Core Long Equity", value: 50 },
                    { name: "Hedging / Short", value: 30 },
                    { name: "Arbitrage / Others", value: 20 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Hedged", value: 45 },
                    { name: "Net Long", value: 30 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 38 },
                    { name: "Avg Holding (Months)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Risk-managed equity investors",
                "Downside-protection seekers",
                "Absolute return investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "InCred Liquid Alternative Fund I",
        category: "Category III",
        theme: "Liquid Alternative / Arbitrage",
        manager: "InCred Asset Management",
        desc: "Category III AIF providing stable, low-volatility returns through liquid alternative strategies including arbitrage and market-neutral positions with a focus on capital preservation.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Stable Income",
            manager: "InCred Asset Management",
            managerDescription: "Known for alternative investments, risk-managed strategies, and institutional portfolio management with a focus on liquidity, capital preservation, and diversified low-risk allocation.",
            strategyDescription: "The fund follows a liquid / low-risk alternative strategy, utilizing arbitrage opportunities, market-neutral stances, and short-term fixed income instruments for steady returns and capital protection.",
            coreFocusAreas: [
                "Arbitrage opportunities",
                "Market-neutral strategies",
                "Short-term fixed income instruments",
                "Low-risk trading strategies"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Arbitrage", value: 40 },
                    { name: "Market Neutral", value: 30 },
                    { name: "Fixed Income / Cash", value: 30 }
                ],
                stageAllocationTitle: "Risk Profile",
                stageAllocation: [
                    { name: "Low Risk", value: 60 },
                    { name: "Moderate Risk", value: 30 },
                    { name: "Opportunistic", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 75 },
                    { name: "Avg Holding (Days)", value: 45 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Low / Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Conservative alternative investors",
                "Low-volatility seekers",
                "Short-term capital allocators"
            ],
            liquidity: "Open-ended fund with frequent subscription & redemption windows; high liquidity compared to other AIFs."
        }
    },
    {
        name: "Inquant Debt Plus",
        category: "Category II",
        theme: "Credit / Income",
        manager: "Inquant Investment Advisors LLP",
        desc: "Category II AIF focused on generating stable income with enhanced yield through structured credit, corporate bonds, and private credit opportunities with low volatility.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Income + Capital Preservation",
            manager: "Inquant Investment Advisors LLP",
            managerDescription: "Focused on fixed income strategies, credit investing, and yield optimization through credit risk assessment, structured deal evaluation, and diversified portfolio construction.",
            strategyDescription: "The fund follows a credit / income strategy, investing in structured credit instruments, corporate bonds, and private credit deals to deliver steady yield with strong downside protection.",
            coreFocusAreas: [
                "Structured credit instruments",
                "Corporate bonds & debt securities",
                "Private credit deals",
                "Yield-enhancing opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Allocation by Instrument",
                sectorAllocation: [
                    { name: "Structured Credit", value: 40 },
                    { name: "Corporate Debt", value: 30 },
                    { name: "Private Credit", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Credit Profile",
                stageAllocation: [
                    { name: "Investment Grade", value: 50 },
                    { name: "AA & Below", value: 30 },
                    { name: "Opportunistic Credit", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: 12 },
                    { name: "Avg Holding (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry / Incentive Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Income-focused investors",
                "Fixed income allocators",
                "Low-volatility seekers"
            ],
            liquidity: "Close-ended fund with lock-in of approximately 3–5 years; exit via maturity or repayment."
        }
    },
    {
        name: "I Wealth Fund – II",
        category: "Category II",
        theme: "Growth / Private Equity",
        manager: "I Wealth Management LLP",
        desc: "Category II AIF investing in growth-stage businesses across high-potential sectors in India, targeting long-term capital appreciation by backing scalable companies with strong fundamentals.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "Capital Appreciation",
            manager: "I Wealth Management LLP",
            managerDescription: "Focused on private equity investments, growth capital strategies, and mid-market opportunities through bottom-up research, promoter due diligence, sector & macro analysis, and active portfolio monitoring.",
            strategyDescription: "I Wealth Fund – II follows a growth / private equity strategy, investing in mid-market companies in consumer, financial services, industrials, and technology sectors with strong earnings visibility and experienced management teams.",
            coreFocusAreas: [
                "Mid-market growth companies",
                "Consumer and services sectors",
                "Financial services",
                "Emerging high-growth industries"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Services", value: 30 },
                    { name: "Financial Services", value: 25 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Capital", value: 50 },
                    { name: "Expansion Capital", value: 35 },
                    { name: "Pre-IPO", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 12 },
                    { name: "Avg Holding (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Private equity investors",
                "Long-term capital allocators",
                "Growth-focused investors"
            ],
            liquidity: "Close-ended fund with lock-in of approximately 5–7 years. No early redemption; exit via IPO or strategic sale."
        }
    },
    {
        name: "KLAY Growth Fund",
        category: "Category II",
        theme: "Growth / Venture Capital",
        manager: "KLAY Capital Advisors LLP",
        desc: "Category II AIF investing in early to growth-stage companies across emerging sectors in India, targeting long-term capital appreciation by backing innovative, scalable businesses.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "Capital Appreciation",
            manager: "KLAY Capital Advisors LLP",
            managerDescription: "Focused on venture and growth investments, the startup ecosystem, and early-stage opportunity identification through bottom-up startup evaluation, founder & team assessment, scalability focus, and active portfolio support.",
            strategyDescription: "KLAY Growth Fund follows a growth / venture capital strategy, targeting technology, consumer, and financial services companies from early to pre-IPO stage with high growth potential and innovative business models.",
            coreFocusAreas: [
                "Early to growth-stage companies",
                "Technology & digital businesses",
                "Consumer and services sectors",
                "Emerging and innovative industries"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Technology", value: 35 },
                    { name: "Consumer & Services", value: 30 },
                    { name: "Financial Services", value: 15 },
                    { name: "Others", value: 20 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Stage", value: 50 },
                    { name: "Early Stage", value: 30 },
                    { name: "Late Stage / Pre-IPO", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 15 },
                    { name: "Avg Holding (Years)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Venture capital investors",
                "Startup ecosystem participants",
                "High-risk, high-return seekers"
            ],
            liquidity: "Close-ended fund with lock-in of approximately 5–7 years. No early redemption; exit via IPO or strategic sale."
        }
    },
    {
        name: "Matterhorn India Fund",
        category: "Category III",
        theme: "Long-Only / High Conviction Equity",
        manager: "Matterhorn Investment Advisors LLP",
        desc: "Category III AIF generating long-term capital appreciation through high-conviction equity investments in fundamentally strong Indian companies with sustainable growth and competitive advantages.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Matterhorn Investment Advisors LLP",
            managerDescription: "Focused on equity investing, high-conviction strategies, and long-term wealth creation through bottom-up research, concentrated portfolio construction, and a focus on quality and scalability.",
            strategyDescription: "Matterhorn India Fund builds a concentrated portfolio of sector leaders and emerging champions across market caps, investing with a long-term horizon in businesses with sustainable growth drivers and strong competitive moats.",
            coreFocusAreas: [
                "High-quality businesses with strong fundamentals",
                "Sector leaders and emerging champions",
                "Multi-cap opportunities",
                "Companies with sustainable growth drivers"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 50 },
                    { name: "Mid Cap", value: 30 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 25 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 20 },
                    { name: "Avg Holding (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Concentrated portfolio investors",
                "Long-term equity investors",
                "Growth-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Mili Emerging Equities Fund",
        category: "Category III",
        theme: "Emerging Growth / Long-Only Equity",
        manager: "Mili Investment Advisors LLP",
        desc: "Category III AIF identifying high-growth emerging small and mid-cap companies in India for long-term capital appreciation, focusing on early-stage leaders and scalable businesses.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Mili Investment Advisors LLP",
            managerDescription: "Focused on emerging market investing, growth strategies, and small & mid-cap opportunities through bottom-up research, focus on scalability and earnings growth, and a long-term, high-conviction approach.",
            strategyDescription: "Mili Emerging Equities Fund invests in under-researched small and mid-cap companies with strong growth potential, building a concentrated portfolio of early-stage leaders with sustainable earnings momentum.",
            coreFocusAreas: [
                "Small & mid-cap companies",
                "Emerging sector leaders",
                "High-growth opportunities",
                "Under-researched businesses"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Small Cap", value: 55 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Industrials", value: 30 },
                    { name: "Consumer", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Small & mid-cap investors",
                "Growth-focused investors",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption windows as per fund terms."
        }
    },
    {
        name: "MoneyGrow Alpha Fund I",
        category: "Category III",
        theme: "Alpha / Long-Short",
        manager: "MoneyGrow Investment Advisors LLP",
        desc: "Category III AIF focused on generating consistent alpha and absolute returns through active long-short equity strategies to outperform markets.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "MoneyGrow Investment Advisors LLP",
            managerDescription: "Focused on alpha generation strategies, long-short equity investing, and active portfolio management utilizing fundamental and tactical analysis to identify market inefficiencies.",
            strategyDescription: "MoneyGrow Alpha Fund I follows an alpha-focused long-short strategy, combining long positions in high-alpha stocks with short positions in overvalued or weak companies, alongside market-neutral and tactical sector trades.",
            coreFocusAreas: [
                "Long positions in high-alpha stocks",
                "Short positions in overvalued or weak companies",
                "Market-neutral and arbitrage opportunities",
                "Tactical sector allocation"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 60 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Hedged", value: 40 },
                    { name: "Net Long", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 38 },
                    { name: "Avg Holding (Months)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Alpha-seeking investors",
                "Active strategy investors",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Motilal Oswal Hedged Multifactor Equity Fund",
        category: "Category III",
        theme: "Multifactor / Hedged Quant",
        manager: "Motilal Oswal Asset Management Company Ltd.",
        desc: "Category III AIF combining factor-based investing with hedging strategies to capture systematic alpha using multiple factors while reducing downside risk.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Motilal Oswal Asset Management Company Ltd.",
            managerDescription: "A leading asset manager known for quantitative investing, factor-based strategies, and institutional portfolio management through data-driven models and systematic portfolio construction.",
            strategyDescription: "The fund follows a multifactor hedged strategy, creating a long portfolio based on Value, Momentum, Quality, and Low Volatility factors while using derivatives for dynamic active hedging and market-neutral exposure.",
            coreFocusAreas: [
                "Factor-based investing (Value, Momentum, Quality, Low Volatility)",
                "Long positions based on factor signals",
                "Hedging via derivatives and short exposure",
                "Market-neutral and arbitrage strategies"
            ],
            graphs: {
                sectorAllocationTitle: "Factor Allocation",
                sectorAllocation: [
                    { name: "Momentum", value: 30 },
                    { name: "Value", value: 25 },
                    { name: "Quality", value: 25 },
                    { name: "Low Volatility", value: 20 }
                ],
                stageAllocationTitle: "Strategy Allocation",
                stageAllocation: [
                    { name: "Long Factor Portfolio", value: 55 },
                    { name: "Hedging / Short", value: 30 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 75 },
                    { name: "Avg Holding (Days)", value: 45 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Quant and factor strategy investors",
                "Risk-managed equity seekers",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Negen Undiscovered Value Fund",
        category: "Category III",
        theme: "Value / Long-Only Equity",
        manager: "Negen Capital Services Pvt. Ltd.",
        desc: "Category III AIF focused on identifying undervalued and under-researched companies trading below intrinsic value with strong turnaround or growth potential in India.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Negen Capital Services Pvt. Ltd.",
            managerDescription: "Focused on value investing, deep research-driven strategies, and long-term wealth creation through bottom-up stock selection and identifying re-rating catalysts.",
            strategyDescription: "Negen Undiscovered Value Fund invests in small and mid-cap under-researched stocks, deep value plays, and turnaround stories, ensuring a margin of safety while waiting for fundamental re-rating.",
            coreFocusAreas: [
                "Undervalued companies with strong fundamentals",
                "Turnaround and re-rating opportunities",
                "Small & mid-cap under-researched stocks",
                "Businesses with margin of safety"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Small Cap", value: 50 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Large Cap", value: 15 }
                ],
                stageAllocationTitle: "Strategy Focus",
                stageAllocation: [
                    { name: "Deep Value", value: 50 },
                    { name: "Turnaround Stories", value: 30 },
                    { name: "Re-rating Opportunities", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Value investors",
                "Contrarian investors",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Neo Treasury Plus Fund",
        category: "Category III",
        theme: "Treasury / Arbitrage",
        manager: "Neo Asset Management Pvt. Ltd.",
        desc: "Category III AIF delivering stable, low-volatility returns through treasury management and arbitrage strategies as a liquid alternative for consistent income generation.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Stable Income",
            manager: "Neo Asset Management Pvt. Ltd.",
            managerDescription: "Focused on alternative investments, treasury strategies, and risk-managed portfolio construction through arbitrage, spread capture, and liquidity-focused allocation.",
            strategyDescription: "The fund focuses on capital safety and steady returns by capturing arbitrage opportunities across equity and derivatives, investing in short-term fixed income instruments, and maintaining market-neutral positioning.",
            coreFocusAreas: [
                "Arbitrage opportunities across equity and derivatives",
                "Short-term fixed income instruments",
                "Cash and treasury management strategies",
                "Market-neutral positioning"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Arbitrage", value: 45 },
                    { name: "Fixed Income / Cash", value: 35 },
                    { name: "Market Neutral", value: 20 }
                ],
                stageAllocationTitle: "Risk Profile",
                stageAllocation: [
                    { name: "Low Risk", value: 65 },
                    { name: "Moderate Risk", value: 25 },
                    { name: "Opportunistic", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 75 },
                    { name: "Avg Holding (Days)", value: 30 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Low / Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Conservative investors",
                "Liquidity-focused allocators",
                "Low-volatility seekers"
            ],
            liquidity: "Open-ended fund with frequent subscription & redemption windows; high liquidity relative to other AIFs."
        }
    },
    {
        name: "Neomile Growth Fund – Series I",
        category: "Category III",
        theme: "Growth / Private Equity",
        manager: "Neomile Capital Advisors LLP",
        desc: "Category III AIF investing in growth-stage businesses across emerging sectors in India, backing scalable companies with strong fundamentals for long-term capital appreciation.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "Capital Appreciation",
            manager: "Neomile Capital Advisors LLP",
            managerDescription: "Focused on private equity investments, growth capital strategies, and mid-market opportunities through bottom-up research, promoter due diligence, and active portfolio management.",
            strategyDescription: "The fund follows a growth / private equity strategy targeting mid-market companies primarily in consumer, technology, and financial services sectors, aiming to scale businesses with strong earnings visibility.",
            coreFocusAreas: [
                "Mid-market growth companies",
                "Consumer & services sectors",
                "Technology and digital businesses",
                "Emerging high-growth industries"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Services", value: 30 },
                    { name: "Technology", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Industrials", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Capital", value: 50 },
                    { name: "Expansion Capital", value: 35 },
                    { name: "Pre-IPO", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 12 },
                    { name: "Avg Holding (Years)", value: 5 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Private equity investors",
                "Long-term capital allocators",
                "Growth-focused investors"
            ],
            liquidity: "Close-ended fund with lock-in of approximately 5–7 years. Exit via IPO or strategic sale."
        }
    },
    {
        name: "Nepean Long Term Opportunities Fund II",
        category: "Category III",
        theme: "Growth / Private Equity",
        manager: "Nepean Capital Advisors LLP",
        desc: "Category III AIF focused on investing in growth-stage companies with long-term value creation potential, scalable models, and sustainable growth drivers.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "Capital Appreciation",
            manager: "Nepean Capital Advisors LLP",
            managerDescription: "Focused on private equity investments and long-term growth strategies in mid-market companies through meticulous bottom-up research, robust promoter due diligence, and active macro analysis.",
            strategyDescription: "Nepean Long Term Opportunities Fund II utilizes a long-term private equity approach to support mid-market growth companies, emphasizing sustainable and compounded value creation over short-term gains.",
            coreFocusAreas: [
                "Mid-market growth companies",
                "Consumer & services sectors",
                "Financial services",
                "Industrials and emerging sectors"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Consumer & Services", value: 30 },
                    { name: "Financial Services", value: 25 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Capital", value: 55 },
                    { name: "Expansion Capital", value: 30 },
                    { name: "Pre-IPO", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 12 },
                    { name: "Avg Holding (Years)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Private equity investors",
                "Long-term capital allocators",
                "Growth-focused investors"
            ],
            liquidity: "Close-ended fund with lock-in of approximately 5–7 years. Exit via IPO or strategic sale."
        }
    },
    {
        name: "Nexus Equity Growth Fund",
        category: "Category III",
        theme: "Growth / Long-Only Equity",
        manager: "Nexus Investment Advisors LLP",
        desc: "Category III AIF delivering long-term capital appreciation by building a diversified, high-conviction portfolio of growth-oriented companies with scale and competitive edges.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Nexus Investment Advisors LLP",
            managerDescription: "Focused on growth equity investing, fundamental research-driven strategies, and long-term portfolio construction focusing on highly scalable and profitable enterprises.",
            strategyDescription: "The fund seeks long-term wealth creation through multi-cap equity opportunities, identifying emerging and established businesses set to deliver superior compound earnings growth.",
            coreFocusAreas: [
                "Multi-cap equity opportunities",
                "High-growth companies across sectors",
                "Emerging and established leaders",
                "Businesses with strong scalability"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Long-term wealth creators",
                "Equity market participants"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "NIEO 9 – Undiscovered India",
        category: "Category III",
        theme: "Discovery / Growth Equity",
        manager: "NIEO Asset Management Pvt. Ltd.",
        desc: "Category III AIF focused on identifying hidden gems within India’s small and mid-cap universe for long-term capital appreciation before they become mainstream winners.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "NIEO Asset Management Pvt. Ltd.",
            managerDescription: "Focused on emerging market investing, discovery-based strategies, and high-growth opportunities through bottom-up research, identification of under-covered companies, and long-term investment discipline.",
            strategyDescription: "NIEO 9 – Undiscovered India follows a discovery-driven long-only strategy focusing on small and mid-cap companies, targeting under-researched, niche businesses with high scalability, early discovery, and high upside potential.",
            coreFocusAreas: [
                "Small & mid-cap companies",
                "Under-researched and niche businesses",
                "Emerging sector leaders",
                "High-growth potential companies"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Small Cap", value: 55 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Industrials", value: 30 },
                    { name: "Consumer", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Small & mid-cap investors",
                "High-growth seekers",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended fund with defined liquidity windows for subscription and redemption as per fund terms."
        }
    },
    {
        name: "Niveshaay Hedgehogs Fund",
        category: "Category III",
        theme: "Small-Cap / Long-Only",
        manager: "Niveshaay Investment Advisors LLP",
        desc: "Category III AIF focused on investing in high-growth small-cap companies with strong fundamentals, scalable models, and niche market leadership.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Niveshaay Investment Advisors LLP",
            managerDescription: "Focused on small-cap investing, growth strategies, and high-conviction portfolio construction through deep fundamental research into niche, highly scalable businesses with long-term horizons.",
            strategyDescription: "Niveshaay Hedgehogs Fund utilizes a small-cap focused long-only strategy to identify emerging businesses and niche sector leaders early, creating a portfolio designed for high-growth compounding.",
            coreFocusAreas: [
                "High-growth small-cap companies",
                "Niche businesses with strong competitive advantages",
                "Emerging sector leaders",
                "Under-researched opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Small Cap", value: 70 },
                    { name: "Mid Cap", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Industrials", value: 30 },
                    { name: "Consumer", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 25 },
                    { name: "Avg Holding (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Small-cap investors",
                "High-risk, high-return seekers",
                "Long-term growth investors"
            ],
            liquidity: "Open-ended fund with periodic liquidity windows for subscription and redemption as per fund terms."
        }
    },
    {
        name: "Northern Arc Money Market Alpha Fund",
        category: "Category III",
        theme: "Money Market / Arbitrage",
        manager: "Northern Arc Investment Managers Pvt. Ltd.",
        desc: "Category III AIF focused on generating stable, low-volatility returns through money market instruments and arbitrage strategies as a liquid alternative for consistent income.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Stable Income",
            manager: "Northern Arc Investment Managers Pvt. Ltd.",
            managerDescription: "Known for fixed income expertise, alternative credit strategies, and risk-managed investment solutions focused on liquidity, capital preservation, and spread capture operations.",
            strategyDescription: "The fund follows a money market and arbitrage strategy using short-term instruments, market-neutral trades, and treasury management to deliver capital safety, liquidity, and steady income over traditional debt.",
            coreFocusAreas: [
                "Short-term money market instruments",
                "Arbitrage opportunities across markets",
                "Treasury and liquidity management",
                "Market-neutral strategies"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Money Market Instruments", value: 45 },
                    { name: "Arbitrage", value: 35 },
                    { name: "Cash / Treasury", value: 20 }
                ],
                stageAllocationTitle: "Risk Profile",
                stageAllocation: [
                    { name: "Low Risk", value: 70 },
                    { name: "Moderate Risk", value: 20 },
                    { name: "Opportunistic", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 75 },
                    { name: "Avg Holding (Days)", value: 30 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Low / Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Conservative investors",
                "Liquidity-focused allocators",
                "Short-term capital parking"
            ],
            liquidity: "Open-ended fund with frequent subscription and redemption windows, offering high liquidity relative to other AIFs."
        }
    },
    {
        name: "Nuvama EDGE Fund",
        category: "Category III",
        theme: "Dynamic / Long-Short Equity",
        manager: "Nuvama Asset Management Ltd.",
        desc: "Category III AIF designed to generate enhanced returns through dynamic equity strategies and active risk management by combining directional equity exposure with hedging.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Nuvama Asset Management Ltd.",
            managerDescription: "Focused on alternative investments, dynamic equity strategies, and risk-managed portfolio construction through fundamental and quantitative analysis for active hedging and optimization.",
            strategyDescription: "Nuvama EDGE Fund follows a dynamic long-short equity strategy, positioning long in high-conviction equities while using short exposure for hedging and alpha, alongside tactical asset allocation.",
            coreFocusAreas: [
                "Long positions in high-conviction equities",
                "Short exposure for hedging and alpha",
                "Tactical asset allocation",
                "Arbitrage and market-neutral opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 55 },
                    { name: "Short / Hedging", value: 30 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 35 },
                    { name: "Hedged", value: 40 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 38 },
                    { name: "Avg Holding (Months)", value: 6 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Dynamic allocation investors",
                "Absolute return seekers",
                "Risk-managed equity investors"
            ],
            liquidity: "Open-ended fund with periodic subscription and redemption as per fund terms."
        }
    },
    {
        name: "Nuvama Flexicap Equity Fund",
        category: "Category III",
        theme: "Flexi-Cap / Long-Only Equity",
        manager: "Nuvama Asset Management Ltd.",
        desc: "Category III AIF focused on long-term capital appreciation through a flexible multi-cap strategy, dynamically allocating across market caps to capture cycle opportunities.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Nuvama Asset Management Ltd.",
            managerDescription: "Expert in equity investing and institutional portfolio management, focusing on bottom-up stock selection, dynamic market cap allocation, and scalable businesses with long-term discipline.",
            strategyDescription: "The fund follows a flexi-cap long-only equity strategy, dynamically rotating across large, mid, and small-cap companies to capture high-growth and high-quality opportunities.",
            coreFocusAreas: [
                "Dynamic allocation across market caps",
                "High-growth and high-quality companies",
                "Sector rotation based on opportunities",
                "Balanced risk-return approach"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 30 },
                    { name: "Small Cap", value: 25 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 33 },
                    { name: "Avg Holding (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Flexi-cap investors",
                "Diversification seekers",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended fund with periodic subscription and redemption as per fund terms."
        }
    },
    {
        name: "Nuvama Multi Asset Strategy Return Fund",
        category: "Category III",
        theme: "Multi-Asset / Absolute Return",
        manager: "Nuvama Asset Management Ltd.",
        desc: "Category III AIF designing to generate consistent absolute returns through diversified multi-asset allocation across equity, debt, and alternative strategies.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Nuvama Asset Management Ltd.",
            managerDescription: "Focused on multi-asset investing and dynamic allocation solutions through cross-asset modeling, fundamental analysis, and continuous risk-managed rebalancing.",
            strategyDescription: "The fund follows a multi-asset absolute return strategy, investing in equity for growth, debt for stability, and arbitrage for market-neutral positioning to deliver risk-adjusted performance.",
            coreFocusAreas: [
                "Equity investments for growth",
                "Debt instruments for stability",
                "Arbitrage and market-neutral strategies",
                "Dynamic asset allocation"
            ],
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Equity", value: 50 },
                    { name: "Debt", value: 30 },
                    { name: "Arbitrage / Others", value: 20 }
                ],
                stageAllocationTitle: "Risk Profile",
                stageAllocation: [
                    { name: "Moderate Risk", value: 50 },
                    { name: "Low Risk", value: 30 },
                    { name: "Opportunistic", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 60 },
                    { name: "Avg Holding (Months)", value: 12 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Diversification seekers",
                "Balanced risk investors",
                "Absolute return investors"
            ],
            liquidity: "Open-ended fund with periodic subscription and redemption as per fund terms."
        }
    },
    {
        name: "Oculus Capital Growth Fund",
        category: "Category III",
        theme: "Growth / Long-Only Equity",
        manager: "Oculus Capital Advisors LLP",
        desc: "Category III AIF focused on delivering long-term capital appreciation through growth-oriented equity investing in scalable businesses.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Oculus Capital Advisors LLP",
            managerDescription: "Focused on growth equity investing, fundamental research-driven strategies, and long-term wealth creation through bottom-up stock selection and risk-managed allocation.",
            strategyDescription: "The fund aims to build a high-conviction portfolio of scalable businesses with strong earnings growth and sustainable competitive advantages, following a growth / long-only equity strategy.",
            coreFocusAreas: [
                "High-growth companies across sectors",
                "Multi-cap equity opportunities",
                "Businesses with strong scalability",
                "Sector leaders and emerging champions"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Long-term wealth creators",
                "Equity market participants"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "PGIM India Equity Growth Opportunities Fund – Series II",
        category: "Category III",
        theme: "Growth / Long-Only Equity",
        manager: "PGIM India Asset Management Pvt. Ltd.",
        desc: "Category III AIF focused on generating long-term capital appreciation through high-quality growth-oriented equity investments in India.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "PGIM India Asset Management Pvt. Ltd.",
            managerDescription: "A global asset management firm known for growth investing, research-driven strategies, and institutional portfolio management with a long-term investment discipline.",
            strategyDescription: "The fund aims to identify high-quality businesses with strong earnings visibility, scalable models, and sustainable competitive advantages through a growth / long-only equity approach.",
            coreFocusAreas: [
                "Multi-cap equity opportunities",
                "High-growth and high-quality companies",
                "Sector leaders and emerging champions",
                "Businesses with sustainable competitive advantages"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 50 },
                    { name: "Mid Cap", value: 30 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: 28 },
                    { name: "Avg Holding (Years)", value: 4 }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Long-term wealth creators",
                "Diversification seekers"
            ],
            liquidity: "Open-ended (or periodic liquidity windows) with subscription & redemption as per fund terms."
        }
    },
    {
        name: "Pluswealth Assets LLP",
        category: "Category III",
        theme: "Growth / Long-Only Equity",
        manager: "Pluswealth Assets LLP",
        desc: "Category III AIF strategies centered around growth, long-only, and active portfolio management approaches for long-term wealth creation.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (As per scheme)",
            targetIRR: "Capital Appreciation",
            manager: "Pluswealth Assets LLP",
            managerDescription: "An investment advisory and asset management firm focused on delivering long-term wealth creation through equity-based, high-conviction strategies.",
            strategyDescription: "Following a growth-oriented, research-driven investment philosophy, the firm focuses on consistency, compounding, and quality investing through disciplined portfolio construction.",
            coreFocusAreas: [
                "Long-term wealth creation",
                "Focus on scalable and high-quality businesses",
                "Fundamental research-driven investing",
                "Disciplined portfolio construction"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Mix",
                sectorAllocation: [
                    { name: "Long-Only Equity", value: 70 },
                    { name: "Tactical Allocation", value: 20 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Market Cap Allocation",
                stageAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Stocks", value: 28 },
                    { name: "Style", value: "Growth / Active" }
                ]
            },
            fees: {
                management: "As per mandate / PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Long-term equity investors",
                "Growth-focused investors",
                "Portfolio diversification seekers"
            ],
            liquidity: "Open-ended (depending on scheme) with periodic liquidity windows as per fund structure."
        }
    },
    {
        name: "Athena Enhanced Equity Fund",
        category: "Category III",
        theme: "Enhanced Equity / Long-Short",
        manager: "Athena Investment Advisors LLP",
        desc: "Category III AIF designed to deliver enhanced returns by combining long-only exposure with tactical hedging and alpha generation techniques.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return + Enhanced Equity",
            manager: "Athena Investment Advisors LLP",
            managerDescription: "Focused on enhanced equity strategies, long-short investing, and risk-managed portfolio construction using a core-satellite structure.",
            strategyDescription: "The fund achieves superior risk-adjusted returns through active portfolio management, combining a core long equity portfolio with tactical hedging and arbitrage strategies.",
            coreFocusAreas: [
                "Core long equity portfolio for growth",
                "Tactical hedging using derivatives",
                "Arbitrage and market-neutral strategies",
                "Dynamic allocation based on market conditions"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Core Equity", value: 60 },
                    { name: "Hedging / Short", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 40 },
                    { name: "Hedged", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: 38 },
                    { name: "Style", value: "Enhanced Equity" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Investors seeking enhanced equity returns",
                "Risk-managed equity investors",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Stock Convertible Scheme",
        category: "Category II",
        theme: "Convertible / Structured",
        manager: "Investment Manager (As per Scheme)",
        desc: "Category II AIF focusing on structured investments with equity upside potential through convertible instruments, offering capital protection.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "Income + Capital Appreciation",
            manager: "As per fund structure / AMC",
            managerDescription: "Focused on structured investments, convertible securities, private credit, and hybrid strategies with a focus on risk-adjusted returns and downside protection.",
            strategyDescription: "The fund focuses on structured investments with equity upside potential through convertible instruments, aiming to generate stable income while participating in equity growth.",
            coreFocusAreas: [
                "Convertible debentures and instruments",
                "Structured equity-linked deals",
                "Pre-IPO and private equity opportunities",
                "Downside protection with upside participation"
            ],
            graphs: {
                sectorAllocationTitle: "Instrument Allocation",
                sectorAllocation: [
                    { name: "Convertible Instruments", value: 50 },
                    { name: "Structured Credit", value: 30 },
                    { name: "Equity Exposure", value: 20 }
                ],
                stageAllocationTitle: "Risk-Return Profile",
                stageAllocation: [
                    { name: "Downside Protection", value: 40 },
                    { name: "Upside Participation", value: 40 },
                    { name: "Volatility (Moderate)", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: "8–15" },
                    { name: "Style", value: "Structured Hybrid" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry / Incentive Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Investors seeking hybrid exposure",
                "Downside-protection seekers",
                "Structured product investors"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years; exit via conversion, maturity, or sale."
        }
    },
    {
        name: "Profusion All Weather Fund",
        category: "Category III",
        theme: "All-Weather / Multi-Asset",
        manager: "Profusion Investment Advisors LLP",
        desc: "Category III AIF designed to deliver consistent returns across market environments through a diversified multi-asset approach.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Profusion Investment Advisors LLP",
            managerDescription: "A specialist in multi-asset investing and risk-managed strategies, utilizing macro and quantitative analysis for dynamic asset allocation.",
            strategyDescription: "The fund follows an all-weather / multi-asset strategy, aiming to reduce volatility and downside risk while capturing steady returns in both bull and bear markets.",
            coreFocusAreas: [
                "Equity exposure for growth",
                "Debt instruments for stability",
                "Arbitrage and market-neutral strategies",
                "Dynamic asset allocation based on macro conditions"
            ],
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Equity", value: 40 },
                    { name: "Debt", value: 35 },
                    { name: "Arbitrage / Alternatives", value: 25 }
                ],
                stageAllocationTitle: "Scenario Allocation",
                stageAllocation: [
                    { name: "Bull Market Positioning", value: 35 },
                    { name: "Bear Market Protection", value: 35 },
                    { name: "Neutral / Arbitrage", value: 30 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: "40–80" },
                    { name: "Style", value: "Multi-Asset / Balanced" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Balanced risk investors",
                "Diversification seekers",
                "All-weather strategy investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Prudent Equity ACE Fund",
        category: "Category III",
        theme: "Growth / Long-Only Equity",
        manager: "Prudent Investment Managers LLP",
        desc: "Category III AIF focused on delivering long-term capital appreciation through high-conviction quality growth equity investments.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Prudent Investment Managers LLP",
            managerDescription: "Focused on equity portfolio management and growth investing through bottom-up stock selection and long-term investment discipline.",
            strategyDescription: "The fund aims to build a high-conviction portfolio of quality companies with strong earnings growth, scalability, and competitive advantages using a growth-oriented long-only logic.",
            coreFocusAreas: [
                "Multi-cap equity opportunities",
                "High-growth and high-quality companies",
                "Sector leaders and emerging businesses",
                "Businesses with strong fundamentals"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "20–35" },
                    { name: "Style", value: "Growth / Active" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Long-term wealth creators",
                "Equity market participants"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "SageOne India Growth OE Fund",
        category: "Category III",
        theme: "Growth / Long-Only Equity",
        manager: "SageOne Investment Advisors LLP",
        desc: "Category III AIF focused on long-term capital appreciation through a high-conviction growth equity strategy targeting quality businesses.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "SageOne Investment Advisors LLP",
            managerDescription: "Known for high-conviction investing and growth equity strategies based on deep fundamental research and concentrated portfolio construction.",
            strategyDescription: "The fund follows a growth / long-only equity strategy focusing on quality businesses with strong earnings visibility, competitive advantages, and long-term scalability.",
            coreFocusAreas: [
                "High-quality growth companies",
                "Multi-cap equity opportunities",
                "Sector leaders and emerging businesses",
                "Companies with strong governance and fundamentals"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 50 },
                    { name: "Mid Cap", value: 30 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "15–25" },
                    { name: "Style", value: "High Conviction Growth" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "High-conviction investors",
                "Growth-focused investors",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Samarth Emerging Fund",
        category: "Category III",
        theme: "Emerging Growth / Long-Only Equity",
        manager: "Samarth Investment Advisors LLP",
        desc: "Category III AIF focused on identifying high-growth emerging companies, particularly in the small and mid-cap segments in India.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Samarth Investment Advisors LLP",
            managerDescription: "Specializes in emerging market investing and small & mid-cap strategies through bottom-up research and a focus on scalability and earnings growth.",
            strategyDescription: "The fund aims to generate long-term capital appreciation by identifying early-stage leaders and scalable businesses with strong growth potential through an emerging growth strategy.",
            coreFocusAreas: [
                "Small & mid-cap companies",
                "Emerging sector leaders",
                "Under-researched opportunities",
                "High-growth potential businesses"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Small Cap", value: 55 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Industrials", value: 30 },
                    { name: "Consumer", value: 25 },
                    { name: "Financial Services", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "20–35" },
                    { name: "Style", value: "Emerging Growth" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Small & mid-cap investors",
                "High-growth seekers",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended (with periodic liquidity windows) with subscription & redemption as per fund terms."
        }
    },
    {
        name: "Sameeksha India Equity Fund",
        category: "Category III",
        theme: "Long-Only India Equity",
        manager: "Sameeksha Capital LLP",
        desc: "Category III AIF focused on delivering long-term capital appreciation through diversified equity investments across Indian markets.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Sameeksha Capital LLP",
            managerDescription: "Focused on equity portfolio management and research-driven investing with a bottom-up stock selection approach for long-term wealth creation.",
            strategyDescription: "The fund aims to build a diversified portfolio of high-quality businesses with strong growth potential and sustainable competitive advantages through a long-only strategy.",
            coreFocusAreas: [
                "Multi-cap equity opportunities",
                "High-quality and growth-oriented companies",
                "Sector leaders and emerging businesses",
                "Companies with strong fundamentals"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 50 },
                    { name: "Mid Cap", value: 30 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "25–40" },
                    { name: "Style", value: "Diversified Growth" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "India-focused investors",
                "Long-term equity investors",
                "Diversification seekers"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "SBI Optimal Equity Fund",
        category: "Category III",
        theme: "Optimized / Long-Only Equity",
        manager: "SBI Funds Management Ltd.",
        desc: "Category III AIF designed to deliver optimal risk-adjusted returns through a disciplined and diversified equity investment approach.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "SBI Funds Management Ltd.",
            managerDescription: "One of India’s leading asset managers with expertise in equity investing and risk-managed portfolio strategies.",
            strategyDescription: "The fund focuses on building a balanced portfolio of high-quality companies while maintaining efficient risk management through an optimized long-only strategy.",
            coreFocusAreas: [
                "Multi-cap equity allocation",
                "High-quality growth and value stocks",
                "Sector diversification",
                "Risk-optimized portfolio construction"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 55 },
                    { name: "Mid Cap", value: 30 },
                    { name: "Small Cap", value: 15 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "25–40" },
                    { name: "Style", value: "Optimized Growth" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Balanced equity investors",
                "Risk-conscious investors",
                "Long-term wealth creators"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Senora StaG AIF – Series I",
        category: "Category II",
        theme: "Special Situations / Stressed Assets",
        manager: "Senora Capital Advisors LLP",
        desc: "Category II AIF focused on generating attractive returns by investing in distressed, turnaround, and structured opportunities.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "3–5 Years",
            targetIRR: "High Alpha / Opportunistic",
            manager: "Senora Capital Advisors LLP",
            managerDescription: "Focused on special situations investing, distressed asset strategies, and structured credit through deep due diligence and active involvement.",
            strategyDescription: "The fund aims to generate attractive risk-adjusted returns by investing in distressed, turnaround, and structured opportunities across sectors.",
            coreFocusAreas: [
                "Distressed and stressed assets",
                "Turnaround and restructuring opportunities",
                "Special situation investments",
                "Structured credit deals"
            ],
            graphs: {
                sectorAllocationTitle: "Opportunity Allocation",
                sectorAllocation: [
                    { name: "Stressed Assets", value: 40 },
                    { name: "Special Situations", value: 35 },
                    { name: "Structured Credit", value: 25 }
                ],
                stageAllocationTitle: "Return Drivers",
                stageAllocation: [
                    { name: "Turnaround Gains", value: 45 },
                    { name: "Credit Yield", value: 30 },
                    { name: "Event-Driven Upside", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Investments", value: "6–12" },
                    { name: "Style", value: "Opportunistic" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Opportunistic investors",
                "High-risk, high-return seekers",
                "Special situations investors"
            ],
            liquidity: "Close-ended fund with a lock-in of ~3–5 years; exit via restructuring, strategic sale, or maturity."
        }
    },
    {
        name: "Shepherds Hill Private Investment Fund",
        category: "Category III",
        theme: "Long-Only / Private Investment",
        manager: "Shepherds Hill Investment Advisors LLP",
        desc: "Category III AIF focused on long-term capital appreciation through high-conviction equity investments and select private opportunities.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Shepherds Hill Investment Advisors LLP",
            managerDescription: "Focused on equity investing and private market opportunities through deep fundamental research and high-conviction portfolio strategies.",
            strategyDescription: "The fund aims to build a concentrated portfolio of fundamentally strong businesses with scalable growth potential, combining listed equity with select private/pre-IPO deals.",
            coreFocusAreas: [
                "Listed equity investments",
                "Select private / pre-IPO opportunities",
                "High-quality growth businesses",
                "Concentrated portfolio approach"
            ],
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Listed Equity", value: 70 },
                    { name: "Private / Pre-IPO", value: 20 },
                    { name: "Cash / Others", value: 10 }
                ],
                stageAllocationTitle: "Market Cap Allocation",
                stageAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "15–25" },
                    { name: "Style", value: "High Conviction" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Long-term equity investors",
                "Private market exposure seekers",
                "High-conviction investors"
            ],
            liquidity: "Open-ended (with periodic liquidity windows) with subscription & redemption as per fund terms."
        }
    },
    {
        name: "Singularity Equity Fund I",
        category: "Category II",
        theme: "Venture / Growth Equity",
        manager: "Singularity Asset Management",
        desc: "Category II AIF focused on investing in next-generation, technology-driven and scalable businesses in India with high disruption potential.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "Capital Appreciation",
            manager: "Singularity Asset Management",
            managerDescription: "Focused on venture capital and technology-driven businesses in future-oriented sectors through thematic investing and active portfolio support.",
            strategyDescription: "The fund aims to generate long-term capital appreciation by backing innovative companies with strong disruption potential across sectors like EV, SaaS, and fintech.",
            coreFocusAreas: [
                "Technology-led businesses",
                "Industry disruptors and innovators",
                "Growth-stage startups",
                "Emerging sectors (EV, SaaS, fintech, deep tech)"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Technology / SaaS", value: 35 },
                    { name: "EV & Mobility", value: 25 },
                    { name: "Fintech", value: 20 },
                    { name: "Deep Tech / Others", value: 20 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Stage", value: 50 },
                    { name: "Late Stage", value: 30 },
                    { name: "Early Stage", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "10–20" },
                    { name: "Style", value: "Innovation / Venture" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Venture capital investors",
                "Innovation-focused investors",
                "High-risk, high-return seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~5–7 years; exit via IPO or strategic sale."
        }
    },
    {
        name: "Sohum India Opportunities Fund",
        category: "Category III",
        theme: "Opportunities / Long-Only Equity",
        manager: "Sohum Asset Managers LLP",
        desc: "Category III AIF focused on capturing high-growth investment opportunities across Indian equity markets benefiting from structural and cyclical trends.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Sohum Asset Managers LLP",
            managerDescription: "Focused on opportunity-driven investing and equity market strategies through bottom-up stock selection and thematic analysis.",
            strategyDescription: "The fund aims to generate long-term capital appreciation by investing in businesses benefiting from structural and cyclical growth trends in India.",
            coreFocusAreas: [
                "Multi-cap equity investments",
                "Sectoral and thematic opportunities",
                "Growth and cyclical businesses",
                "Emerging and established leaders"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Industrials", value: 25 },
                    { name: "Consumer", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "20–35" },
                    { name: "Style", value: "Opportunities / Growth" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Opportunity-driven investors",
                "Growth-focused investors",
                "Long-term equity investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Steptrade Revolution Fund",
        category: "Category III",
        theme: "Quant / Long-Short Trading",
        manager: "Steptrade Capital Advisors LLP",
        desc: "Category III AIF focused on generating absolute returns using quantitative, algorithmic, and trading-driven strategies to capitalize on market inefficiencies.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Steptrade Capital Advisors LLP",
            managerDescription: "Focused on quantitative investing and algorithmic trading strategies using data-driven models and statistical arbitrage.",
            strategyDescription: "The fund follows a systematic quant / trading-based long-short strategy, aiming to capitalize on market inefficiencies and short-term trends.",
            coreFocusAreas: [
                "Algorithmic and quantitative models",
                "Long-short equity strategies",
                "Arbitrage and market-neutral trades",
                "Short-term trading opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Quant Long-Short", value: 50 },
                    { name: "Arbitrage", value: 30 },
                    { name: "Tactical Trading", value: 20 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Market Neutral", value: 40 },
                    { name: "Hedged", value: 35 },
                    { name: "Net Directional", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: "50–150" },
                    { name: "Style", value: "Quant / Trading" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Quant strategy investors",
                "Absolute return seekers",
                "Low market correlation investors"
            ],
            liquidity: "Open-ended fund with frequent subscription & redemption windows as per fund terms."
        }
    },
    {
        name: "Sundaram Atlas Opportunities Fund",
        category: "Category III",
        theme: "Opportunities / Long-Only Equity",
        manager: "Sundaram Alternate Assets Ltd.",
        desc: "Category III AIF focused on identifying high-potential sectoral and thematic growth opportunities across Indian equity markets.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Sundaram Alternate Assets Ltd.",
            managerDescription: "Part of Sundaram Group, specializing in equity and alternative investments through research-driven, bottom-up stock selection.",
            strategyDescription: "The fund aims to generate long-term capital appreciation by investing in growth-oriented businesses and sectoral opportunities across the multi-cap space.",
            coreFocusAreas: [
                "Multi-cap equity investments",
                "Sectoral and thematic opportunities",
                "Growth and cyclical businesses",
                "Emerging and established leaders"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Industrials", value: 25 },
                    { name: "Consumer", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "20–35" },
                    { name: "Style", value: "Opportunities / Growth" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Opportunity-driven investors",
                "Growth-focused investors",
                "Long-term equity investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Swyom India Alpha Fund",
        category: "Category III",
        theme: "Alpha / Long-Short",
        manager: "Swyom Investment Advisors LLP",
        desc: "Category III AIF focused on generating consistent absolute returns and alpha through active long-short equity and event-driven strategies.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Swyom Investment Advisors LLP",
            managerDescription: "Focused on alpha generation and active portfolio management using fundamental and tactical analysis to exploit market mispricing.",
            strategyDescription: "The fund follows an alpha-driven long-short strategy, aiming to outperform markets while providing downside protection through hedging and arbitrage.",
            coreFocusAreas: [
                "Long positions in high-conviction stocks",
                "Short exposure in overvalued or weak businesses",
                "Arbitrage and market-neutral strategies",
                "Tactical and event-driven opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 60 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 35 },
                    { name: "Hedged", value: 40 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: "25–50" },
                    { name: "Style", value: "Active / Alpha" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Alpha-seeking investors",
                "Absolute return investors",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "ITI Long Short Equity Fund",
        category: "Category III",
        theme: "Long-Short Equity",
        manager: "ITI Asset Management Ltd.",
        desc: "Category III AIF designed to generate absolute returns by combining long equity positions with short-selling and hedging strategies.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "ITI Asset Management Ltd.",
            managerDescription: "Focused on risk-managed equity and alternative strategies using fundamental research and dynamic hedging.",
            strategyDescription: "The fund aims to reduce market risk while capturing alpha through long-short equity strategies and tactical sector allocation.",
            coreFocusAreas: [
                "Long positions in fundamentally strong companies",
                "Short positions in overvalued or weak businesses",
                "Market-neutral and hedged strategies",
                "Tactical sector allocation"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 60 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 35 },
                    { name: "Hedged", value: 40 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: "25–50" },
                    { name: "Style", value: "Active / Hedged" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Absolute return seekers",
                "Hedged equity investors",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Tata Equity Plus Absolute Returns Fund",
        category: "Category III",
        theme: "Enhanced Equity / Long-Short",
        manager: "Tata Asset Management Ltd.",
        desc: "Category III AIF designed to deliver enhanced equity returns with lower volatility through a combination of long equity exposure and hedging strategies.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return + Equity Upside",
            manager: "Tata Asset Management Ltd.",
            managerDescription: "Part of the Tata Group, focused on fundamental research and dynamic hedging strategies for risk-adjusted allocation.",
            strategyDescription: "The fund aims to generate consistent absolute returns while maintaining downside protection across market cycles using an enhanced equity / long-short logic.",
            coreFocusAreas: [
                "Core long equity portfolio for growth",
                "Short positions and derivatives for hedging",
                "Arbitrage and market-neutral opportunities",
                "Dynamic allocation based on market conditions"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Core Equity", value: 60 },
                    { name: "Hedging / Short", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 40 },
                    { name: "Hedged", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: "30–60" },
                    { name: "Style", value: "Enhanced Equity" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Risk-managed equity investors",
                "Absolute return seekers",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Two X Capital Exponential Opportunities Fund",
        category: "Category II",
        theme: "Venture / High-Growth",
        manager: "Two X Capital Advisors LLP",
        desc: "Category II AIF focused on investing in high-growth, disruptive businesses with exponential scaling potential across emerging sectors.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category II AIF",
            structure: "Closed Ended",
            minCommitment: "₹1 Crore",
            tenure: "5–7 Years",
            targetIRR: "Capital Appreciation",
            manager: "Two X Capital Advisors LLP",
            managerDescription: "Focused on venture capital and disruptive technologies through thematic investing and active portfolio support for high-growth startups.",
            strategyDescription: "The fund aims to generate outsized long-term returns by backing innovative companies across emerging sectors like AI, fintech, and deep tech.",
            coreFocusAreas: [
                "Technology-driven businesses",
                "Disruptive startups and innovators",
                "Emerging sectors (AI, fintech, SaaS, EV, deep tech)",
                "Growth-stage and late-stage opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Sector Allocation",
                sectorAllocation: [
                    { name: "Technology / SaaS", value: 35 },
                    { name: "Fintech", value: 20 },
                    { name: "AI / Deep Tech", value: 20 },
                    { name: "EV & Mobility", value: 15 },
                    { name: "Others", value: 10 }
                ],
                stageAllocationTitle: "Investment Stage",
                stageAllocation: [
                    { name: "Growth Stage", value: 50 },
                    { name: "Late Stage", value: 30 },
                    { name: "Early Stage", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "10–20" },
                    { name: "Style", value: "Exponential Growth" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Carry Model",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Venture capital investors",
                "Innovation-focused investors",
                "High-risk, high-return seekers"
            ],
            liquidity: "Close-ended fund with a lock-in of ~5–7 years; exit via IPO or strategic acquisition."
        }
    },
    {
        name: "Vajra Capital Growth Scheme",
        category: "Category III",
        theme: "Growth / Long-Only Equity",
        manager: "Vajra Capital Advisors LLP",
        desc: "Category III AIF focused on delivering long-term capital appreciation through high-conviction, growth-oriented equity investments.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "Vajra Capital Advisors LLP",
            managerDescription: "Focused on growth equity investing and research-driven stock selection for long-term wealth creation.",
            strategyDescription: "The fund aims to build a high-conviction portfolio of scalable businesses with strong earnings growth and sustainable competitive advantages.",
            coreFocusAreas: [
                "Multi-cap equity opportunities",
                "High-growth and high-quality companies",
                "Sector leaders and emerging businesses",
                "Businesses with strong fundamentals"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 45 },
                    { name: "Mid Cap", value: 35 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "20–35" },
                    { name: "Style", value: "Growth" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Growth-focused investors",
                "Long-term wealth creators",
                "Equity market participants"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "WhiteOak Capital Equity Fund",
        category: "Category III",
        theme: "Quality Growth / Long-Only",
        manager: "WhiteOak Capital Asset Management Ltd.",
        desc: "Category III AIF focused on delivering long-term capital appreciation through quality-driven equity investing in high-governance businesses.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "WhiteOak Capital Asset Management Ltd.",
            managerDescription: "Known for a quality investing approach and research-driven strategies with a focus on governance and sustainability.",
            strategyDescription: "The fund emphasizes investing in high-quality businesses with strong governance, sustainable earnings, and competitive advantages using a bottom-up approach.",
            coreFocusAreas: [
                "High-quality companies with strong fundamentals",
                "Multi-cap equity allocation",
                "Businesses with sustainable competitive advantages",
                "Companies with strong governance and earnings visibility"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 50 },
                    { name: "Mid Cap", value: 30 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "20–30" },
                    { name: "Style", value: "Quality Growth" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Quality-focused investors",
                "Long-term wealth creators",
                "Low-risk growth seekers"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "WhiteOak Healthcare Opportunities Fund",
        category: "Category III",
        theme: "Healthcare / Long-Only Equity",
        manager: "WhiteOak Capital Asset Management Ltd.",
        desc: "Category III AIF focused on long-term capital appreciation by investing in the growing healthcare and pharmaceutical sectors in India.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "WhiteOak Capital Asset Management Ltd.",
            managerDescription: "Utilizes deep sector research and bottom-up stock selection to capture innovation and scalability in the healthcare space.",
            strategyDescription: "The fund aims to capture opportunities across pharma, hospitals, diagnostics, and healthcare services, benefiting from India’s growing demand and innovation trends.",
            coreFocusAreas: [
                "Pharmaceutical companies",
                "Hospitals and healthcare services",
                "Diagnostics and healthcare infrastructure",
                "Healthcare innovation and biotech"
            ],
            graphs: {
                sectorAllocationTitle: "Sub-Sector Allocation",
                sectorAllocation: [
                    { name: "Pharmaceuticals", value: 40 },
                    { name: "Hospitals", value: 25 },
                    { name: "Diagnostics", value: 20 },
                    { name: "Others", value: 15 }
                ],
                stageAllocationTitle: "Market Cap Allocation",
                stageAllocation: [
                    { name: "Large Cap", value: 50 },
                    { name: "Mid Cap", value: 30 },
                    { name: "Small Cap", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "15–25" },
                    { name: "Style", value: "Sectoral / Growth" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Sector-focused investors",
                "Healthcare growth believers",
                "Long-term equity investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Whitespace Alpha Hybrid Plus",
        category: "Category III",
        theme: "Hybrid / Multi-Strategy",
        manager: "Whitespace Investment Advisors LLP",
        desc: "Category III AIF designed to deliver enhanced risk-adjusted returns through a hybrid approach combining equity, debt, and alternative strategies.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "Whitespace Investment Advisors LLP",
            managerDescription: "Focused on multi-asset investing and alpha generation through dynamic asset allocation and risk-managed portfolio construction.",
            strategyDescription: "The fund aims to generate consistent alpha while maintaining controlled volatility using a hybrid / multi-strategy approach across equity and debt.",
            coreFocusAreas: [
                "Equity investments for growth",
                "Debt instruments for stability",
                "Arbitrage and market-neutral strategies",
                "Tactical asset allocation"
            ],
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Equity", value: 45 },
                    { name: "Debt", value: 30 },
                    { name: "Arbitrage / Alternatives", value: 25 }
                ],
                stageAllocationTitle: "Risk Profile",
                stageAllocation: [
                    { name: "Moderate Risk", value: 50 },
                    { name: "Low Risk", value: 30 },
                    { name: "Opportunistic", value: 20 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: "40–80" },
                    { name: "Style", value: "Hybrid / Multi-Strategy" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Balanced risk investors",
                "Alpha-seeking investors",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Whitespace Equity Plus Fund",
        category: "Category III",
        theme: "Enhanced Equity / Long-Short",
        manager: "Whitespace Investment Advisors LLP",
        desc: "Category III AIF designed to deliver enhanced equity returns with controlled downside risk through long equity exposure and tactical hedging.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return + Equity Upside",
            manager: "Whitespace Investment Advisors LLP",
            managerDescription: "Focused on enhanced equity strategies and alpha generation using a core-satellite portfolio model and dynamic hedging.",
            strategyDescription: "The fund aims to generate consistent alpha while reducing volatility compared to pure equity strategies using an enhanced equity / long-short logic.",
            coreFocusAreas: [
                "Core long equity portfolio for growth",
                "Short exposure for hedging and alpha",
                "Arbitrage and market-neutral opportunities",
                "Tactical allocation based on market conditions"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Core Equity", value: 60 },
                    { name: "Hedging / Short", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 40 },
                    { name: "Hedged", value: 35 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: "25–50" },
                    { name: "Style", value: "Enhanced Equity" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Investors seeking enhanced equity returns",
                "Risk-managed equity investors",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Whitespace Debt Plus Fund",
        category: "Category III",
        theme: "Debt / Arbitrage",
        manager: "Whitespace Investment Advisors LLP",
        desc: "Category III AIF focused on generating stable income with low volatility through a mix of debt instruments and arbitrage strategies.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Income + Absolute Return",
            manager: "Whitespace Investment Advisors LLP",
            managerDescription: "Specializes in fixed income strategies and multi-strategy investing with a focus on credit analysis and yield optimization.",
            strategyDescription: "The fund aims to provide consistent returns and capital preservation, acting as a liquid alternative to traditional fixed income investments.",
            coreFocusAreas: [
                "Fixed income instruments (bonds, debentures)",
                "Credit opportunities for enhanced yield",
                "Arbitrage and market-neutral strategies",
                "Treasury and liquidity management"
            ],
            graphs: {
                sectorAllocationTitle: "Asset Allocation",
                sectorAllocation: [
                    { name: "Debt Instruments", value: 50 },
                    { name: "Arbitrage", value: 30 },
                    { name: "Cash / Treasury", value: 20 }
                ],
                stageAllocationTitle: "Risk Profile",
                stageAllocation: [
                    { name: "Low Risk", value: 60 },
                    { name: "Moderate Risk", value: 30 },
                    { name: "Opportunistic", value: 10 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: "40–100" },
                    { name: "Style", value: "Income / Low Volatility" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Low / Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Conservative investors",
                "Income-focused investors",
                "Short-term capital allocators"
            ],
            liquidity: "Open-ended fund with high liquidity and frequent subscription & redemption windows."
        }
    },
    {
        name: "Yes Alpha Plus Fund",
        category: "Category III",
        theme: "Enhanced Alpha / Long-Short",
        manager: "YES Asset Management (India) Ltd.",
        desc: "Category III AIF designed to generate consistent alpha and absolute returns through a combination of equity exposure and active hedging.",
        link: "#",
        color: "#1CADA3",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Absolute Return",
            manager: "YES Asset Management (India) Ltd.",
            managerDescription: "Specializes in alternative investment strategies and risk-managed portfolio construction using fundamental and quantitative analysis.",
            strategyDescription: "The fund aims to deliver enhanced risk-adjusted performance by leveraging market inefficiencies and tactical allocation across sectors.",
            coreFocusAreas: [
                "Long positions in high-conviction stocks",
                "Short positions for hedging and alpha generation",
                "Arbitrage and market-neutral strategies",
                "Dynamic allocation across sectors"
            ],
            graphs: {
                sectorAllocationTitle: "Strategy Allocation",
                sectorAllocation: [
                    { name: "Long Equity", value: 60 },
                    { name: "Short Equity", value: 25 },
                    { name: "Arbitrage / Others", value: 15 }
                ],
                stageAllocationTitle: "Exposure Profile",
                stageAllocation: [
                    { name: "Net Long", value: 35 },
                    { name: "Hedged", value: 40 },
                    { name: "Market Neutral", value: 25 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Positions", value: "25–50" },
                    { name: "Style", value: "Enhanced Alpha" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Alpha-seeking investors",
                "Absolute return investors",
                "Diversification-focused investors"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    },
    {
        name: "Yes Wealth Maximiser AIF",
        category: "Category III",
        theme: "Long-Only / Equity",
        manager: "YES Asset Management (India) Ltd.",
        desc: "Category III AIF focused on delivering long-term wealth creation through disciplined, multi-cap equity investing in high-quality businesses.",
        link: "#",
        color: "#2076C7",
        details: {
            category: "Category III AIF",
            structure: "Open Ended",
            minCommitment: "₹1 Crore",
            tenure: "Periodic (Open-ended)",
            targetIRR: "Capital Appreciation",
            manager: "YES Asset Management (India) Ltd.",
            managerDescription: "Utilizes research-driven investing and bottom-up stock selection to build diversified portfolios focused on long-term growth.",
            strategyDescription: "The fund aims to build a diversified portfolio of high-quality businesses with strong growth potential and sustainable earnings visibility.",
            coreFocusAreas: [
                "Multi-cap equity investments",
                "High-quality and growth-oriented companies",
                "Sector diversification",
                "Long-term compounding opportunities"
            ],
            graphs: {
                sectorAllocationTitle: "Market Cap Allocation",
                sectorAllocation: [
                    { name: "Large Cap", value: 50 },
                    { name: "Mid Cap", value: 30 },
                    { name: "Small Cap", value: 20 }
                ],
                stageAllocationTitle: "Sector Allocation",
                stageAllocation: [
                    { name: "Financial Services", value: 30 },
                    { name: "Consumer", value: 20 },
                    { name: "Industrials", value: 20 },
                    { name: "Technology", value: 15 },
                    { name: "Others", value: 15 }
                ],
                portfolioConcentrationTitle: "Portfolio Snapshot",
                portfolioConcentration: [
                    { name: "Companies", value: "25–40" },
                    { name: "Style", value: "Wealth Creation / Growth" }
                ]
            },
            fees: {
                management: "As per PPM",
                performance: "Incentive-based",
                hurdle: "Applicable"
            },
            suitableFor: [
                "HNI / Ultra HNI",
                "Long-term wealth creators",
                "Equity-focused investors",
                "Diversification seekers"
            ],
            liquidity: "Open-ended fund with periodic subscription & redemption as per fund terms."
        }
    }
];

export const aifComparisonData = [
    { name: "Abakkus 428", cat: "II", type: "Emerging Growth", manager: "Sunil Singhania", tenure: "5+ yrs", min: "₹1 Cr" },
    { name: "360 ONE Defense", cat: "II", type: "Sector PE", manager: "360 ONE Team", tenure: "6 yrs", min: "₹1 Cr" },
    { name: "ABSL Money Manager", cat: "II", type: "Credit / Income", manager: "ABSL AMC", tenure: "2-4 yrs", min: "₹1 Cr" },
    { name: "India Discovery II", cat: "I", type: "Venture Capital", manager: "35North Ventures", tenure: "7 yrs", min: "₹1 Cr" },
    { name: "Finavenue Growth", cat: "III", type: "Long-Short", manager: "A9 Finsight", tenure: "Open-Ended", min: "₹1 Cr" },
    { name: "Arnya Real Estate", cat: "II", type: "Real Estate Debt", manager: "Arnya Advisors", tenure: "3-5 yrs", min: "₹1 Cr" },
    { name: "Equirus InnovateX", cat: "I", type: "Venture/Growth", manager: "Ajay Garg", tenure: "7 yrs", min: "₹1 Cr" },
    { name: "AARTH AIF Growth", cat: "III", type: "Long-Short / Growth", manager: "AARTH Asset", tenure: "Open-Ended", min: "₹1 Cr" },
    { name: "Abakkus Flexi Edge", cat: "III", type: "Flexi-Cap Long-Short", manager: "Abakkus Asset", tenure: "Open-Ended", min: "₹1 Cr" },
    { name: "Accuracap AlphaGen", cat: "III", type: "Quant Long-Short", manager: "Accuracap Asset", tenure: "Open-Ended", min: "₹1 Cr" },
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
