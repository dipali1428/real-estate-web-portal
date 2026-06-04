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
    UserMinus,
    Layers,
    CreditCard,
    MessageSquare,
    Shield,
    Calculator,
    TrendingUp,
    LineChart,
    BarChart3,
    Target,
    CircleQuestionMark,
    Mail,
    Handshake,
    Share2,
    FileText,
    ReceiptIndianRupee,
    Ticket,
    Wallet,
    BookUp,
    WalletCards,
    FileBarChart,
    Bookmark,
    LifeBuoy,
    Notebook,
    ShieldPlus,
    Contact,
    LayoutTemplate,
    Package,
    TicketCheck,
    FileUp,
    LandPlot,
    Landmark,
    Building2,
    Equal,
    CalendarDays,
    BriefcaseBusiness,
    SquareChartGantt,
    GraduationCap,
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
                { label: "Payout Dashboard", href: "/dashboard/incentives", icon: <BarChart3 className="h-4 w-4 text-neutral-700" /> },
                { label: "Agreement", href: "/dashboard/incentives/agreement", icon: <Handshake className="h-4 w-4 text-neutral-700" /> },
                { label: "Invoice", href: "/dashboard/incentives/invoice", icon: <ReceiptIndianRupee className="h-4 w-4 text-neutral-700" /> },
                { label: "TDS", href: "/dashboard/incentives/tds", icon: <BookUp className="h-4 w-4 text-neutral-700" /> },
                { label: "Credit Note", href: "/dashboard/incentives/creditnote", icon: <WalletCards className="h-4 w-4 text-neutral-700" /> },
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
        {
            label: "All Users",
            icon: <Users className="h-5 w-5 text-neutral-700" />,
            children:
                [
                    { label: "Role Management", href: "/admin/roles", icon: <ShieldCheck className="h-5 w-5 text-neutral-700" /> },
                    { label: "User Management", href: "/admin/allusers", icon: <Handshake className="h-4 w-4 text-neutral-700" /> },
                ],
        },
        {
            label: "Leads",
            icon: <Notebook className="h-5 w-5 text-neutral-700" />,
            children:
                [
                    { label: "All Leads", href: "/admin/totalleads", icon: <Layers className="h-4 w-4 text-neutral-700" /> },
                    { label: "Detailed Leads", href: "/admin/detailleads", icon: <FileText className="h-4 w-4 text-neutral-700" /> },
                    { label: "Referral Leads", href: "/admin/referralleads", icon: <Share2 className="h-4 w-4 text-neutral-700" /> },
                ],
        },
        {
            label: "DSA Administration",
            icon: <User className="h-5 w-5 text-neutral-700" />,
            children:
                [
                    { label: "DSA Management", href: "/admin/dsalist", icon: <Contact className="h-4 w-4 text-neutral-700" /> },
                    { label: "KYC Management", href: "/admin/kycmanagement", icon: <ShieldPlus className="h-5 w-5 text-neutral-700" /> },
                    { label: "Unassigned DSAs", href: "/admin/unassigneddsa", icon: <UserMinus className="h-4 w-4 text-neutral-700" /> },
                    { label: "TDS Management", href: "/admin/tdsmanagement", icon: <BookUp className="h-4 w-4 text-neutral-700" /> },
                ],
        },
        {
            label: "Enquiries",
            icon: <CircleQuestionMark className="h-5 w-5 text-neutral-700" />,
            children:
                [
                    { label: "Support Tickets", href: "/admin/ticket", icon: <Ticket className="h-4 w-4 text-neutral-700" /> },
                    { label: "Website Enquiries", href: "/admin/enquiry", icon: <Mail className="h-4 w-4 text-neutral-700" /> },
                    { label: "CIBIL Requests", href: "/admin/cibil", icon: <CreditCard className="h-4 w-4 text-neutral-700" /> },
                    { label: "Career Applications", href: "/admin/careermanagement", icon: <Briefcase className="h-4 w-4 text-neutral-700" /> },
                ],
        },
        { label: "Marketing", href: "/admin/marketing", icon: <LayoutTemplate className="h-5 w-5 text-neutral-700" /> },
        { label: "Upload Payout", href: "/admin/uploadpayout", icon: <FileUp className="h-5 w-5 text-neutral-700" /> },
        { label: "Generate Coupons", href: "/admin/generatecoupons", icon: <TicketCheck className="h-5 w-5 text-neutral-700" /> },
        { label: "Add Branch", href: "/admin/branch", icon: <LandPlot className="h-5 w-5 text-neutral-700" /> },
        { label: "Unassigned Branches", href: "/admin/unassignedbranches", icon: <Equal className="h-5 w-5 text-neutral-700" /> },
    ],

    GM: [],
    AVP: [],

    ACCOUNTS: [
        { label: "Dashboard", href: "/accounts", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/accounts/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "KYC Management", href: "/accounts/kycmanagement", icon: <ShieldCheck className="h-5 w-5 text-neutral-700" /> },
        {
            label: "Lead Confirmation", href: "/accounts/allleads", icon: <Layers className="h-5 w-5 text-neutral-700" />,
            children:
                [
                    { label: "Detailed Leads", href: "/accounts/detailedleads", icon: <FileUp className="h-4 w-4 text-neutral-700" /> },
                    { label: "Final Conifrmed Leads", href: "/accounts/referralleads", icon: <Share2 className="h-4 w-4 text-neutral-700" /> },

                ],
        },
        { label: "Receivables", href: "/accounts/reciveable", icon: <Wallet className="h-5 w-5 text-neutral-700" /> },
        { label: "TDS Management", href: "/accounts/tdsmanagement", icon: <ReceiptIndianRupee className="h-5 w-5 text-neutral-700" /> },
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
        { label: "Upload Payout", href: "/rm/uploadpayout", icon: <FileUp className="h-5 w-5 text-neutral-700" /> },
        { label: "Lead Management", href: "/rm/leadmanagement", icon: <Users className="h-5 w-5 text-neutral-700" /> },
    ],

    HR: [
        { label: "HR Dashboard", href: "/hr", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/hr/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "Website Inquiries", href: "/hr/websiteenquiry", icon: <Mail className="h-5 w-5 text-neutral-700" /> },
        { label: "Career Applications", href: "/hr/careermanagement", icon: < Briefcase className="h-5 w-5 text-neutral-700" /> },
    ],

    BRANCHHEAD: [
        { label: "Branch Head Dashboard", href: "/branchhead", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/branchhead/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "My Branches", href: "/branchhead/branches", icon: <User className="h-5 w-5 text-neutral-700" /> },
    ],

    BRANCH: [
        { label: "Branch Dashboard", href: "/branch", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/branch/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "Agreement", href: "/branch/agreement", icon: <Handshake className="h-4 w-4 text-neutral-700" /> },
        { label: "Lead Management", href: "/branch/dsamanagement", icon: <SquareChartGantt className="h-5 w-5 text-neutral-700" /> },
        { label: "My Branch Dsa's", href: "/branch/branches", icon: <Users className="h-5 w-5 text-neutral-700" /> },
        { label: "Branch Payout", href: "/branch/branchpayout", icon: <WalletCards className="h-4 w-4 text-neutral-700" /> },
        { label: "Downloads", href: "/branch/payoutgrid", icon: <Download className="h-5 w-5 text-neutral-700" /> },
        { label: "Relationship Manager", href: "/branch/relationshipmanager", icon: <UserCheck className="h-5 w-5 text-neutral-700" /> },
        { label: "Help & Support", href: "/branch/supportticket", icon: <HelpCircle className="h-5 w-5 text-neutral-700" /> },

    ],

    DIRECTOR: [
        { label: "Dashboard", href: "/director", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/director/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        { label: "KYC Management", href: "/director/kycmanagement", icon: <ShieldCheck className="h-5 w-5 text-neutral-700" /> },
        { label: "Support Tickets", href: "/director/supportticket", icon: <Ticket className="h-5 w-5 text-neutral-700" /> },
        { label: "Website Enquiries", href: "/director/websiteenquiry", icon: <Mail className="h-4 w-4 text-neutral-700" />, },
        { label: "Cibil", href: "/director/cibil", icon: <CreditCard className="h-4 w-4 text-neutral-700" />, },
        { label: "DSA Management", href: "/director/dsamanagement", icon: <Users className="h-4 w-4 text-neutral-700" />, },
        { label: "Role Management", href: "/director/role", icon: <ShieldCheck className="h-4 w-4 text-neutral-700" />, },
        { label: "User Management", href: "/director/allusers", icon: <Handshake className="h-4 w-4 text-neutral-700" />, }
    ],

    CUSTOMER: [
        { label: "Dashboard", href: "/customer", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },
        { label: "My Profile", href: "/customer/profile", icon: <User className="h-5 w-5 text-neutral-700" /> },
        {
            label: "Our Products",
            icon: <Briefcase className="h-5 w-5 text-neutral-700" />,
            children:
                [
                    { label: "Investments", href: "/customer/investments", icon: <TrendingUp className="h-4 w-4 text-neutral-700" /> },
                    { label: "Finance", href: "/customer/finance", icon: <Wallet className="h-4 w-4 text-neutral-700" /> },
                    { label: "Insurance", href: "/customer/insurance", icon: <Shield className="h-4 w-4 text-neutral-700" /> }
                ],
        },
        { label: "Portfolio", href: "/customer/portfolio", icon: <LineChart className="h-5 w-5 text-neutral-700" /> },
        { label: "Calculator", href: "/customer/calculator", icon: <Calculator className="h-5 w-5 text-neutral-700" /> },
        { label: "Goal Planner", href: "/customer/goalplanner", icon: <Target className="h-5 w-5 text-neutral-700" /> },
        { label: "Reports", href: "/customer/reports", icon: <FileBarChart className="h-5 w-5 text-neutral-700" /> },
        { label: "Wishlist", href: "/customer/wishlist", icon: <Bookmark className="h-5 w-5 text-neutral-700" /> },
        { label: "Help & Support", href: "/customer/support", icon: <LifeBuoy className="h-5 w-5 text-neutral-700" /> },
        { label: "Relationship Manager", href: "/customer/relationshipmanager", icon: <UserCheck className="h-5 w-5 text-neutral-700" /> },
    ],
    UNLISTEDADMIN: [
        { label: "Dashboard", href: "/UnlistedAdmin", icon: <LayoutDashboard className="h-5 w-5 text-neutral-700" /> },

        { label: "Analytics View", href: "/UnlistedAdmin/AnalyticsView", icon: <Users className="h-5 w-5 text-neutral-700" /> },

        { label: "Customer Management", href: "/UnlistedAdmin/UserManagement", icon: <UserPlus className="h-5 w-5 text-neutral-700" /> },

        { label: "Enquiry Details", href: "/UnlistedAdmin/EnquiryManagement", icon: <MessageSquare className="h-5 w-5 text-neutral-700" /> },

        { label: "Transaction Management", href: "/UnlistedAdmin/TransactionManagement", icon: <CreditCard className="h-5 w-5 text-neutral-700" /> },

        { label: "Shares Management", href: "/UnlistedAdmin/SharesManagement", icon: <TrendingUp className="h-5 w-5 text-neutral-700" /> },
        { label: "Ticket Management", href: "/UnlistedAdmin/ticketmanagement", icon: <FileText className="h-5 w-5 text-neutral-700" /> },
        { label: "Demat Management", href: "/UnlistedAdmin/DematManagement", icon: <Shield className="h-5 w-5 text-neutral-700" /> },
        {
            label: "Meetings",
            icon: <CalendarDays className="h-5 w-5 text-neutral-700" />,
            children: [
                {
                    label: "NPS consultation meetings",
                    href: "/UnlistedAdmin/products/investments/nps",
                    icon: <BriefcaseBusiness className="h-4 w-4 text-neutral-600" />,
                },
            ],
        },

        // ✅ NEW PRODUCTS DROPDOWN
        {
            label: "Products",
            icon: <Package className="h-5 w-5 text-neutral-700" />,
            children: [
                { label: "Unlisted shares", href: "/UnlistedAdmin/ImportExportAdmin", icon: <TrendingUp className="h-5 w-5 text-neutral-700" /> },

                {
                    label: "Real Estate",
                    href: "/UnlistedAdmin/products/investments/realestateimport",
                    icon: <Building2 className="h-4 w-4 text-neutral-600" />,
                },
                {
                    label: "PMS ",
                    href: "/UnlistedAdmin/products/investments/pms",
                    icon: <BarChart3 className="h-4 w-4 text-neutral-600" />,
                },
                {
                    label: "Fixed Deposit",
                    href: "/UnlistedAdmin/products/investments/Fixed-Deposit",
                    icon: <Landmark className="h-4 w-4 text-neutral-600" />,
                },
                {
                    label: "Bonds",
                    href: "/UnlistedAdmin/products/investments/bonds",
                    icon: <FileText className="h-4 w-4 text-neutral-600" />,
                },
                {
                    label: "NCD",
                    href: "/UnlistedAdmin/products/investments/ncd",
                    icon: <Landmark className="h-4 w-4 text-neutral-600" />,
                },
                {
                    label: "AIF",
                    href: "/UnlistedAdmin/products/investments/aif",
                    icon: <Layers className="h-5 w-5 text-neutral-600" />
                },
                {
                    label: "Home Loan",
                    href: "/UnlistedAdmin/products/finance/home-loan",
                    icon: <Landmark className="h-5 w-5 text-neutral-600" />
                },
                {
                    label: "Mortgage Loan",
                    href: "/UnlistedAdmin/products/finance/mortgage-loan",
                    icon: <Building2 className="h-5 w-5 text-neutral-600" />
                },
                {
                    label: "Credit Card",
                    href: "/UnlistedAdmin/products/finance/credit-card",
                    icon: <CreditCard className="h-5 w-5 text-neutral-600" />
                },
                 {
                    label: "Education Loan",
                    href: "/UnlistedAdmin/products/finance/Education-Loan",
                    icon: <GraduationCap className="h-5 w-5 text-neutral-600" />
                },
                 {
                    label: "Cattle Insurance",
                    href: "/UnlistedAdmin/products/finance/Cattle-Insurance",
                    icon: <Shield className="h-5 w-5 text-neutral-600" />
                }
            ],
        },
    ],
};