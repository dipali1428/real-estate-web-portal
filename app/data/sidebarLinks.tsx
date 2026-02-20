import {
    LayoutDashboard,
    User,
    UserCheck,
    Briefcase,
    HandCoins,
    Megaphone,
    Download,
    Users,
    Proportions,
    UserPlus,
    HelpCircle,
    ShieldCheck,    // For Roles
    Building2,      // For DSA Management
    UserMinus,      // For Unassigned
    Layers,         // For Total Leads
    CreditCard,
    MessageSquare,  // For CIBIL
    FolderOpen,
    ShoppingBag,
    Activity,
} from "lucide-react";

export const sidebarLinks = {
    // common: [
    // { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
    // { label: "Profile", href: "/dashboard/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
    // ],
    DSA: [
        { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "Profile", href: "/dashboard/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "Lead Management", href: "/dashboard/leadmanagement", icon: <UserCheck className="h-5 w-5 text-neutral-700" /> },
        { label: "Client Portfolio", href: "/dashboard/clientPortfolio", icon: <Briefcase className="h-5 w-5 text-neutral-700" /> },
        { label: "Incentives & Payouts", href: "/dashboard/incentives", icon: <HandCoins className="h-5 w-5 text-neutral-700" /> },
        { label: "Marketing Campaigns", href: "/dashboard/marketing", icon: <Megaphone className="h-5 w-5 text-neutral-700" /> },
        { label: "Downloads", href: "/dashboard/pdf-download", icon: <Download className="h-5 w-5 text-neutral-700" /> },
        { label: "Relationship Manager", href: "/dashboard/relationshipManager", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "Help & Support", href: "/dashboard/helpSupport", icon: <HelpCircle className="h-5 w-5 text-neutral-700" /> },
        { label: "Our Products", href: "/dashboard/products", icon: <Proportions className="h-5 w-5 text-neutral-700" /> },
        { label: "Co-Partners", href: "/dashboard/copartners", icon: <UserPlus className="h-5 w-5 text-neutral-700" /> },
    ],

    ADMIN: [
        { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "Profile", href: "/admin/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "Roles", href: "/admin/roles", icon: <ShieldCheck className="h-5 w-5 text-neutral-700" /> },
        { label: "DSA Management", href: "/admin/dsalist", icon: <Building2 className="h-5 w-5 text-neutral-700" /> },
        { label: "Ticket Raised", href: "/admin/ticket", icon: <HelpCircle className="h-5 w-5 text-neutral-700" /> },
        { label: "Website Enquiry", href: "/admin/enquiry", icon: <Megaphone className="h-5 w-5 text-neutral-700" /> },
        { label: "CIBIL Requests", href: "/admin/cibil", icon: <CreditCard className="h-5 w-5 text-neutral-700" /> },
        { label: "Unassigned DSA's", href: "/admin/unassigneddsa", icon: <UserMinus className="h-5 w-5 text-neutral-700" /> },
        { label: "Total Leads", href: "/admin/totalleads", icon: <Layers className="h-5 w-5 text-neutral-700" /> },
        { label: "All Users", href: "/admin/allusers", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "Detail Leads", href: "/admin/detailleads", icon: <UserPlus className="h-5 w-5 text-neutral-700" /> },
        { label: "Referral Leads", href: "/admin/referralleads", icon: <UserPlus className="h-5 w-5 text-neutral-700" /> },
    ],

    GM: [],
    AVP: [],

    ACCOUNTS: [
        { label: "Dashboard", href: "/accounts", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "Profile", href: "/accounts/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "Receivable", href: "/accounts/reciveable", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "TDS Management", href: "/accounts/tdsmanagement", icon: <CreditCard className="h-5 w-5 text-neutral-700" /> },
        { label: "Lead Management", href: "/accounts/leadmanagement", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "Bill Payment", href: "/accounts/billpayment", icon: <Users className="h-5 w-5 text-neutral-700" /> },
    ],

    DEPARTMENTHEAD: [
        { label: "Dashboard", href: "/departmenthead", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "Profile", href: "/departmenthead/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "RM's List", href: "/departmenthead/rmlist", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "Leads", href: "/departmenthead/totalleads", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "Consumer detailed lead", href: "/departmenthead/consumerdetailedlead", icon: <Users className="h-5 w-5 text-neutral-700" /> },

    ],
    RM: [
        { label: "Dashboard", href: "/rm", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "Profile", href: "/rm/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "My DSAs", href: "/rm/mydsa", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "Referal leads", href: "/rm/referralleads", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "Detailed leads", href: "/rm/detailedleads", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "Consumer Detailed leads", href: "/rm/consumerdetailedleads", icon: <Users className="h-5 w-5 text-neutral-700" /> },
    ],

    HR: [
        { label: "Dashboard", href: "/hr", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "Profile", href: "/hr/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "Website Enquiry", href: "/hr/websiteenquiry", icon: <Megaphone className="h-5 w-5 text-neutral-700" /> },
        { label: "Career Management", href: "/hr/careermanagement", icon: < MessageSquare className="h-5 w-5 text-neutral-700" /> },
    ],

    CUSTOMER: [
        { label: "Dashboard", href: "/customer", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "Profile", href: "/customer/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },

        {
            label: "Products",
            icon: <Proportions className="h-5 w-5 text-neutral-700" />,
            children: [
                {
                    label: "Unlisted Panel",
                    icon: <Users className="h-4 w-4 text-neutral-700" />,
                    children: [
                        {
                            label: "Dashboard",
                            href: "/customer/unlisted/dashboard",
                            icon: <Users className="h-4 w-4 text-neutral-700" />,
                        },
                        {
                            label: "Profile"
                            , href: "/customer/unlisted/profile",
                            icon: <Users className="h-4 w-4 text-neutral-700" />,
                        },
                        {
                            label: "Portfolio",
                            href: "/customer/unlisted/portfolio",
                            icon: <Briefcase className="h-4 w-4 text-neutral-700" />,
                        },
                        {
                            label: "Companies",
                            href: "/customer/unlisted/companies",
                            icon: <Users className="h-4 w-4 text-neutral-700" />,
                        },
                        {
                            label: "Transactions",
                            href: "/customer/unlisted/transactions",
                            icon: <Activity className="h-4 w-4 text-neutral-700" />,
                        },
                        {
                            label: "Documents",
                            href: "/customer/unlisted/documents",
                            icon: <FolderOpen className="h-4 w-4 text-neutral-700" />,
                        },               
                    ],
                },
                {
                    label: "Mutual Funds Panel",
                    icon: <Users className="h-4 w-4 text-neutral-700" />,
                    children: [
                        {
                            label: "Equity Funds",
                            href: "/customer/mutualfunds/equity",
                            icon: <Users className="h-4 w-4 text-neutral-700" />,
                        },
                        {
                            label: "Debt Funds",
                            href: "/customer/mutualfunds/debt",
                            icon: <Users className="h-4 w-4 text-neutral-700" />,
                        },
                    ],
                },
            ],
        },
    ],

    UNLISTEDADMIN: [
        { label: "Dashboard", href: "/UnlistedAdmin", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        // { label: "Company Management", href: "/UnlistedAdmin/CompanyManagement", icon: <Proportions className="h-5 w-5 text-neutral-700" /> },
        { label: "Analytics View", href: "/UnlistedAdmin/AnalyticsView", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "User Management", href: "/UnlistedAdmin/UserManagement", icon: <UserPlus className="h-5 w-5 text-neutral-700" /> },
        { label: "Enquiry Management", href: "/UnlistedAdmin/EnquiryManagement", icon: <MessageSquare className="h-5 w-5 text-neutral-700" /> },
        { label: "Transaction Management", href: "/UnlistedAdmin/TransactionManagement", icon: <CreditCard className="h-5 w-5 text-neutral-700" /> },
        // { label: "Order Management", href: "/UnlistedAdmin/OrderBook", icon: <Layers className="h-5 w-5 text-neutral-700" /> },
        { label: "Import History", href: "/UnlistedAdmin/ImportExportAdmin", icon: <Download className="h-5 w-5 text-neutral-700" /> },
        // { label: "Admin Settings", href: "/UnlistedAdmin/AdminSettings", icon: <User className="h-5 w-5 text-neutral-700" /> },
    ],

};
