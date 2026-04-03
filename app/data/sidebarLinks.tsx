import {
    LayoutDashboard,
    User,
    UserCheck,
    Briefcase,
    HandCoins,
    Megaphone,
    Download,
    Users,
    UserPlus,
    HelpCircle,
    ShieldCheck,
    Building2,
    UserMinus,
    Layers,
    CreditCard,
    MessageSquare,
    Activity,
    Shield,
    Calculator,
    TrendingUp,
    Package,
    LineChart,
    BarChart3,
    Target,
    Heart,
    Mail,
    Handshake,
    Share2,
    FileText,
    ReceiptIndianRupee,
    Ticket,
    Wallet,
    Receipt,
    BookUp,
    WalletCards,
    Building,
    icons,
    Landmark,
    Home
} from "lucide-react";

export const sidebarLinks = {
    // common: [
    // { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
    // { label: "Profile", href: "/dashboard/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
    // ],
    DSA: [
        { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/dashboard/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "Lead Management", href: "/dashboard/leadmanagement", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "Client Portfolio", href: "/dashboard/clientPortfolio", icon: <Briefcase className="h-5 w-5 text-neutral-700" /> },
        {
            label: "Incentives & Payouts",
            icon: <HandCoins className="h-5 w-5 text-neutral-700" />,
            children: [

                {
                    label: "Payout Dashboard",
                    href: "/dashboard/incentives",
                    icon: <BarChart3 className="h-4 w-4 text-neutral-700" />,
                },
                {
                    label: "Agreement",
                    href: "/dashboard/incentives/agreement",
                    icon: <Handshake className="h-4 w-4 text-neutral-700" />,
                },
                {
                    label: "Invoice",
                    href: "/dashboard/incentives/invoice",
                    icon: <ReceiptIndianRupee className="h-4 w-4 text-neutral-700" />,
                },
                {
                    label: "TDS",
                    href: "/dashboard/incentives/tds",
                    icon: <BookUp className="h-4 w-4 text-neutral-700" />,
                },
                // {
                //     label: "Credit Note",
                //     href: "/dashboard/incentives/creditnote",
                //     icon: <WalletCards className="h-4 w-4 text-neutral-700" />,
                // },
            ],
        },

        { label: "Marketing Campaigns", href: "/dashboard/marketing", icon: <Megaphone className="h-5 w-5 text-neutral-700" /> },
        { label: "Downloads", href: "/dashboard/pdf-download", icon: <Download className="h-5 w-5 text-neutral-700" /> },
        { label: "Relationship Manager", href: "/dashboard/relationshipManager", icon: <UserCheck className="h-5 w-5 text-neutral-700" /> },
        { label: "Help & Support", href: "/dashboard/helpSupport", icon: <HelpCircle className="h-5 w-5 text-neutral-700" /> },
        // { label: "Our Products", href: "/dashboard/products", icon: <Proportions className="h-5 w-5 text-neutral-700" /> },
        { label: "Co-Partners", href: "/dashboard/copartners", icon: <Handshake className="h-5 w-5 text-neutral-700" /> },
    ],

    ADMIN: [
        { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/admin/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
         { label: "KYC Management", href: "/admin/kycmanagement", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "Role Management", href: "/admin/roles", icon: <ShieldCheck className="h-5 w-5 text-neutral-700" /> },
        { label: "DSA Management", href: "/admin/dsalist", icon: <Handshake className="h-5 w-5 text-neutral-700" /> },
        { label: "Support Tickets", href: "/admin/ticket", icon: <Ticket className="h-5 w-5 text-neutral-700" /> },
        { label: "Website Enquiries", href: "/admin/enquiry", icon: <Mail className="h-5 w-5 text-neutral-700" /> },
        { label: "CIBIL Requests", href: "/admin/cibil", icon: <CreditCard className="h-5 w-5 text-neutral-700" /> },
        { label: "Unassigned DSAs", href: "/admin/unassigneddsa", icon: <UserMinus className="h-5 w-5 text-neutral-700" /> },
        { label: "All Leads", href: "/admin/totalleads", icon: <Layers className="h-5 w-5 text-neutral-700" /> },
        { label: "User Management", href: "/admin/allusers", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "Detailed Leads", href: "/admin/detailleads", icon: <FileText className="h-5 w-5 text-neutral-700" /> },
        { label: "Referral Leads", href: "/admin/referralleads", icon: <Share2 className="h-5 w-5 text-neutral-700" /> },
         { label: "TDS Management", href: "/admin/tdsmanagement", icon: <BookUp className="h-5 w-5 text-neutral-700" /> },
        { label: "Career Applications", href: "/admin/careermanagement", icon: <Briefcase className="h-5 w-5 text-neutral-700" /> },
    ],

    GM: [],
    AVP: [],

    ACCOUNTS: [
        { label: "Dashboard", href: "/accounts", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/accounts/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "Receivables", href: "/accounts/reciveable", icon: <Wallet className="h-5 w-5 text-neutral-700" /> },
        { label: "TDS Management", href: "/accounts/tdsmanagement", icon: <Receipt className="h-5 w-5 text-neutral-700" /> },
        { label: "Lead Payments", href: "/accounts/leadmanagement", icon: <FileText className="h-5 w-5 text-neutral-700" /> },
        { label: "Bill Payments", href: "/accounts/billpayment", icon: <CreditCard className="h-5 w-5 text-neutral-700" /> },
    ],

    DEPARTMENTHEAD: [
        { label: "Dashboard", href: "/departmenthead", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/departmenthead/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "Relationship Managers", href: "/departmenthead/rmlist", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "All Leads", href: "/departmenthead/totalleads", icon: <Layers className="h-5 w-5 text-neutral-700" /> },
        { label: "Consumer Leads", href: "/departmenthead/consumerdetailedlead", icon: <UserCheck className="h-5 w-5 text-neutral-700" /> },
    ],

    RM: [
        { label: "Dashboard", href: "/rm", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/rm/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "My DSA Partners", href: "/rm/mydsa", icon: <Handshake className="h-5 w-5 text-neutral-700" /> },
        { label: "Referral Leads", href: "/rm/referralleads", icon: <Share2 className="h-5 w-5 text-neutral-700" /> },
        { label: "Detailed Leads", href: "/rm/detailedleads", icon: <FileText className="h-5 w-5 text-neutral-700" /> },
        { label: "Consumer Leads", href: "/rm/consumerdetailedleads", icon: <UserCheck className="h-5 w-5 text-neutral-700" /> },
    ],

    HR: [
        { label: "HR Dashboard", href: "/hr", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/hr/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "Website Inquiries", href: "/hr/websiteenquiry", icon: <Mail className="h-5 w-5 text-neutral-700" /> },
        { label: "Career Applications", href: "/hr/careermanagement", icon: < Briefcase className="h-5 w-5 text-neutral-700" /> },
    ],

    BRANCHHEAD: [
        { label: "HR Dashboard", href: "/branchhead", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/branchhead/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
    ],

    DIRECTOR: [
        { label: "HR Dashboard", href: "/director", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/director/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
    ],

   CUSTOMER: [
    { label: "Dashboard", href: "/customer", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },

    { label: "My Profile", href: "/customer/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },

    {
        label: "Our Products",
        icon: <Package className="h-5 w-5 text-neutral-700" />,
        children: [
            {
                label: "Unlisted Shares",
                icon: <BarChart3 className="h-4 w-4 text-neutral-700" />,
                href: "/customer/unlisted",
            },
            {
                label: "Mutual Funds",
                icon: <Landmark className="h-4 w-4 text-neutral-700" />,
                href: "/customer/mutual-funds",
            },
            {
                label: "Fixed Deposit",
                icon: <Landmark className="h-4 w-4 text-neutral-700" />,
                href: "/customer/FD",
            },
            {
                label: "AIF",
                icon: <Landmark className="h-4 w-4 text-neutral-700" />,
                href: "/customer/aif",
            },
            {
                label: "PMS",
                icon: <Landmark className="h-4 w-4 text-neutral-700" />,
                href: "/customer/pms",
            },
            {
                label: "Bonds",
                icon: <Landmark className="h-4 w-4 text-neutral-700" />,
                href: "/customer/bonds",
            },
            {
                label: "Loans",
                href: "/customer/loans",
                icon: <Landmark className="h-4 w-4 text-neutral-700" />,
            },
            {
                label: "Real Estate",
                href: "/customer/real-estate",
                icon: <Building2 className="h-4 w-4 text-neutral-700" />,
            },
        ],
    },

    { label: "Portfolio", href: "/customer/portfolio", icon: <LineChart className="h-5 w-5 text-neutral-700" /> },

    { label: "Calculator", href: "/customer/calculator", icon: <Calculator className="h-5 w-5 text-neutral-700" /> },

    { label: "Goal Planner", href: "/customer/goalplanner", icon: <Target className="h-5 w-5 text-neutral-700" /> },

    { label: "Reports", href: "/customer/reports", icon: <BarChart3 className="h-5 w-5 text-neutral-700" /> },

    { label: "Wishlist", href: "/customer/wishlist", icon: <Heart className="h-5 w-5 text-neutral-700" /> },

    { label: "Help & Support", href: "/customer/support", icon: <HelpCircle className="h-5 w-5 text-neutral-700" /> },

    { label: "Relationship Manager", href: "/customer/relationshipmanager", icon: <UserCheck className="h-5 w-5 text-neutral-700" /> },
],
    UNLISTEDADMIN: [
        { label: "Dashboard", href: "/UnlistedAdmin", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        // { label: "Company Management", href: "/UnlistedAdmin/CompanyManagement", icon: <Proportions className="h-5 w-5 text-neutral-700" /> },
        { label: "Analytics View", href: "/UnlistedAdmin/AnalyticsView", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "User Management", href: "/UnlistedAdmin/UserManagement", icon: <UserPlus className="h-5 w-5 text-neutral-700" /> },
        { label: "Enquiry Management", href: "/UnlistedAdmin/EnquiryManagement", icon: <MessageSquare className="h-5 w-5 text-neutral-700" /> },
        { label: "Transaction Management", href: "/UnlistedAdmin/TransactionManagement", icon: <CreditCard className="h-5 w-5 text-neutral-700" /> },
        { label: "Shares Management", href: "/UnlistedAdmin/SharesManagement", icon: <TrendingUp className="h-5 w-5 text-neutral-700" /> },
        { label: "Demat Management", href: "/UnlistedAdmin/DematManagement", icon: <Shield className="h-5 w-5 text-neutral-700" /> },
        // { label: "Order Management", href: "/UnlistedAdmin/OrderBook", icon: <Layers className="h-5 w-5 text-neutral-700" /> },
        { label: "Import History", href: "/UnlistedAdmin/ImportExportAdmin", icon: <Download className="h-5 w-5 text-neutral-700" /> },
        // { label: "Admin Settings", href: "/UnlistedAdmin/AdminSettings", icon: <User className="h-5 w-5 text-neutral-700" /> },
    ],

};
