// types/clientData.ts

// Types
export interface Client {
  id: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  product: string;
  relationshipManager?: string;
}

export interface Lead {
  id: string;
  clientId: string;
  source: string;
  status: 'New' | 'In-Progress' | 'Closed' | 'Not Interested';
  followUpActivity: string;
  nextFollowUpDate: string;
  notes: string;
  priority: 'Hot' | 'Warm' | 'Cold';
}

export interface Application {
  clientId: string;
  status: 'New Lead' | 'Document Pending' | 'Under Processing' | 'Underwriting' | 'Sanctioned' | 'Disbursed' | 'Rejected';
  lastUpdated: string;
}

export interface Document {
  clientId: string;
  type: string;
  name: string;
  uploadedDate: string;
  status: 'Uploaded' | 'Verified' | 'Pending';
}

export interface Commission {
  clientId: string;
  expectedPayout: number;
  approvedPayout: number;
  paidCommission: number;
  pendingCommission: number;
}

// Enhanced Mock data with more comprehensive coverage
export const clients: Client[] = [
  // Loan Category - Personal Loans
  {
    id: '1',
    name: 'Rajesh Kumar',
    mobile: '+91 9876543210',
    email: 'rajesh@example.com',
    address: 'Mumbai, Maharashtra',
    product: 'Personal Loan',
    relationshipManager: 'Amit Sharma'
  },
  {
    id: '2',
    name: 'Priya Singh',
    mobile: '+91 9876543211',
    email: 'priya@example.com',
    address: 'Delhi, NCR',
    product: 'Home Loan',
    relationshipManager: 'Neha Verma'
  },
  {
    id: '3',
    name: 'Amit Patel',
    mobile: '+91 9876543212',
    email: 'amit@example.com',
    address: 'Ahmedabad, Gujarat',
    product: 'Business Loan',
    relationshipManager: 'Rahul Mehta'
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    mobile: '+91 9876543213',
    email: 'sneha@example.com',
    address: 'Hyderabad, Telangana',
    product: 'LAP',
    relationshipManager: 'Kiran Kumar'
  },
  {
    id: '9',
    name: 'Sanjay Gupta',
    mobile: '+91 9876543218',
    email: 'sanjay@example.com',
    address: 'Lucknow, Uttar Pradesh',
    product: 'Personal Loan',
    relationshipManager: 'Amit Sharma'
  },
  {
    id: '10',
    name: 'Pooja Mehta',
    mobile: '+91 9876543219',
    email: 'pooja@example.com',
    address: 'Surat, Gujarat',
    product: 'Home Loan',
    relationshipManager: 'Neha Verma'
  },
  
  // Loan Category - Additional Loans
  {
    id: '11',
    name: 'Rahul Desai',
    mobile: '+91 9876543220',
    email: 'rahul@example.com',
    address: 'Bengaluru, Karnataka',
    product: 'Car Loan',
    relationshipManager: 'Vikram Singh'
  },
  {
    id: '12',
    name: 'Meera Joshi',
    mobile: '+91 9876543221',
    email: 'meera@example.com',
    address: 'Pune, Maharashtra',
    product: 'Education Loan',
    relationshipManager: 'Priya Nair'
  },
  {
    id: '13',
    name: 'Arun Khanna',
    mobile: '+91 9876543222',
    email: 'arun@example.com',
    address: 'Chandigarh, Punjab',
    product: 'Personal Loan',
    relationshipManager: 'Rohit Malhotra'
  },
  {
    id: '14',
    name: 'Sunita Rao',
    mobile: '+91 9876543223',
    email: 'sunita@example.com',
    address: 'Chennai, Tamil Nadu',
    product: 'Home Loan',
    relationshipManager: 'Kiran Kumar'
  },

  // Insurance Category
  {
    id: '5',
    name: 'Vikram Malhotra',
    mobile: '+91 9876543214',
    email: 'vikram@example.com',
    address: 'Chennai, Tamil Nadu',
    product: 'Life Insurance',
    relationshipManager: 'Priya Nair'
  },
  {
    id: '15',
    name: 'Anil Verma',
    mobile: '+91 9876543224',
    email: 'anil@example.com',
    address: 'Kolkata, West Bengal',
    product: 'Health Insurance',
    relationshipManager: 'Sneha Reddy'
  },
  {
    id: '16',
    name: 'Pooja Sharma',
    mobile: '+91 9876543225',
    email: 'poojasharma@example.com',
    address: 'Jaipur, Rajasthan',
    product: 'Motor Insurance',
    relationshipManager: 'Rahul Mehta'
  },
  {
    id: '17',
    name: 'Karan Singh',
    mobile: '+91 9876543226',
    email: 'karan@example.com',
    address: 'Dehradun, Uttarakhand',
    product: 'Home Insurance',
    relationshipManager: 'Neha Verma'
  },

  // Investment Category
  {
    id: '6',
    name: 'Anjali Sharma',
    mobile: '+91 9876543215',
    email: 'anjali@example.com',
    address: 'Bangalore, Karnataka',
    product: 'Mutual Funds',
    relationshipManager: 'Sanjay Rao'
  },
  {
    id: '8',
    name: 'Neha Kapoor',
    mobile: '+91 9876543217',
    email: 'neha@example.com',
    address: 'Kolkata, West Bengal',
    product: 'Stocks',
    relationshipManager: 'Arun Joshi'
  },
  {
    id: '18',
    name: 'Rohit Agarwal',
    mobile: '+91 9876543227',
    email: 'rohitagarwal@example.com',
    address: 'Mumbai, Maharashtra',
    product: 'Fixed Deposits',
    relationshipManager: 'Meera Iyer'
  },
  {
    id: '19',
    name: 'Sonia Mehra',
    mobile: '+91 9876543228',
    email: 'sonia@example.com',
    address: 'Delhi, NCR',
    product: 'Bonds',
    relationshipManager: 'Amit Sharma'
  },
  {
    id: '20',
    name: 'Vikram Jadhav',
    mobile: '+91 9876543229',
    email: 'vikramj@example.com',
    address: 'Nagpur, Maharashtra',
    product: 'Real Estate',
    relationshipManager: 'Kiran Kumar'
  },

  // Credit Category
  {
    id: '7',
    name: 'Rohit Verma',
    mobile: '+91 9876543216',
    email: 'rohit@example.com',
    address: 'Pune, Maharashtra',
    product: 'Credit Card',
    relationshipManager: 'Meera Iyer'
  },
  {
    id: '21',
    name: 'Priya Deshmukh',
    mobile: '+91 9876543230',
    email: 'priyad@example.com',
    address: 'Aurangabad, Maharashtra',
    product: 'Credit Line',
    relationshipManager: 'Rahul Mehta'
  },
  {
    id: '22',
    name: 'Amit Khurana',
    mobile: '+91 9876543231',
    email: 'amitk@example.com',
    address: 'Gurgaon, Haryana',
    product: 'Loan Against Securities',
    relationshipManager: 'Sanjay Rao'
  }
];

export const leads: Lead[] = [
  // Loan Category Leads
  {
    id: '1',
    clientId: '1',
    source: 'Referral',
    status: 'In-Progress',
    followUpActivity: 'Document Collection',
    nextFollowUpDate: '2024-01-20',
    notes: 'Interested in personal loan for education',
    priority: 'Hot'
  },
  {
    id: '2',
    clientId: '2',
    source: 'Walk-in',
    status: 'New',
    followUpActivity: 'Initial Consultation',
    nextFollowUpDate: '2024-01-18',
    notes: 'Looking for home loan for new property',
    priority: 'Hot'
  },
  {
    id: '3',
    clientId: '3',
    source: 'Tele-calling',
    status: 'In-Progress',
    followUpActivity: 'Business Verification',
    nextFollowUpDate: '2024-01-22',
    notes: 'Business expansion loan required',
    priority: 'Warm'
  },
  {
    id: '4',
    clientId: '4',
    source: 'Social',
    status: 'New',
    followUpActivity: 'Property Evaluation',
    nextFollowUpDate: '2024-01-19',
    notes: 'Loan against property for business',
    priority: 'Hot'
  },
  {
    id: '9',
    clientId: '9',
    source: 'Tele-calling',
    status: 'New',
    followUpActivity: 'Initial Discussion',
    nextFollowUpDate: '2024-01-24',
    notes: 'Personal loan for medical expenses',
    priority: 'Warm'
  },
  {
    id: '10',
    clientId: '10',
    source: 'Referral',
    status: 'In-Progress',
    followUpActivity: 'Document Verification',
    nextFollowUpDate: '2024-01-26',
    notes: 'Home loan for new construction',
    priority: 'Hot'
  },
  {
    id: '11',
    clientId: '11',
    source: 'Walk-in',
    status: 'In-Progress',
    followUpActivity: 'Vehicle Selection',
    nextFollowUpDate: '2024-01-27',
    notes: 'Car loan for new SUV purchase',
    priority: 'Hot'
  },
  {
    id: '12',
    clientId: '12',
    source: 'Referral',
    status: 'New',
    followUpActivity: 'University Verification',
    nextFollowUpDate: '2024-01-28',
    notes: 'Education loan for Masters in US',
    priority: 'Warm'
  },

  // Insurance Category Leads
  {
    id: '5',
    clientId: '5',
    source: 'Referral',
    status: 'Closed',
    followUpActivity: 'Policy Issuance',
    nextFollowUpDate: '2024-01-25',
    notes: 'Life insurance policy completed',
    priority: 'Cold'
  },
  {
    id: '15',
    clientId: '15',
    source: 'Tele-calling',
    status: 'In-Progress',
    followUpActivity: 'Medical Checkup',
    nextFollowUpDate: '2024-01-29',
    notes: 'Family health insurance required',
    priority: 'Hot'
  },
  {
    id: '16',
    clientId: '16',
    source: 'Walk-in',
    status: 'New',
    followUpActivity: 'Vehicle Inspection',
    nextFollowUpDate: '2024-01-30',
    notes: 'Car insurance renewal with better coverage',
    priority: 'Warm'
  },

  // Investment Category Leads
  {
    id: '6',
    clientId: '6',
    source: 'Walk-in',
    status: 'Not Interested',
    followUpActivity: 'Follow-up',
    nextFollowUpDate: '2024-02-01',
    notes: 'Client postponed investment decision',
    priority: 'Cold'
  },
  {
    id: '8',
    clientId: '8',
    source: 'Referral',
    status: 'New',
    followUpActivity: 'Investment Planning',
    nextFollowUpDate: '2024-01-23',
    notes: 'Wealth management consultation',
    priority: 'Hot'
  },
  {
    id: '18',
    clientId: '18',
    source: 'Tele-calling',
    status: 'In-Progress',
    followUpActivity: 'Rate Discussion',
    nextFollowUpDate: '2024-02-02',
    notes: 'Fixed deposit for 3 years',
    priority: 'Warm'
  },

  // Credit Category Leads
  {
    id: '7',
    clientId: '7',
    source: 'Tele-calling',
    status: 'In-Progress',
    followUpActivity: 'Credit Assessment',
    nextFollowUpDate: '2024-01-21',
    notes: 'Premium credit card application',
    priority: 'Warm'
  },
  {
    id: '21',
    clientId: '21',
    source: 'Referral',
    status: 'New',
    followUpActivity: 'Credit Limit Discussion',
    nextFollowUpDate: '2024-02-03',
    notes: 'Business credit line requirement',
    priority: 'Hot'
  }
];

export const applications: Application[] = [
  // Loan Applications
  {
    clientId: '1',
    status: 'Under Processing',
    lastUpdated: '2024-01-15'
  },
  {
    clientId: '2',
    status: 'Document Pending',
    lastUpdated: '2024-01-14'
  },
  {
    clientId: '3',
    status: 'Underwriting',
    lastUpdated: '2024-01-16'
  },
  {
    clientId: '4',
    status: 'Sanctioned',
    lastUpdated: '2024-01-13'
  },
  {
    clientId: '9',
    status: 'Document Pending',
    lastUpdated: '2024-01-18'
  },
  {
    clientId: '10',
    status: 'Underwriting',
    lastUpdated: '2024-01-19'
  },
  {
    clientId: '11',
    status: 'Under Processing',
    lastUpdated: '2024-01-20'
  },
  {
    clientId: '12',
    status: 'New Lead',
    lastUpdated: '2024-01-21'
  },

  // Insurance Applications
  {
    clientId: '5',
    status: 'Disbursed',
    lastUpdated: '2024-01-12'
  },
  {
    clientId: '15',
    status: 'Underwriting',
    lastUpdated: '2024-01-22'
  },
  {
    clientId: '16',
    status: 'Document Pending',
    lastUpdated: '2024-01-23'
  },

  // Investment Applications
  {
    clientId: '6',
    status: 'Rejected',
    lastUpdated: '2024-01-11'
  },
  {
    clientId: '8',
    status: 'Under Processing',
    lastUpdated: '2024-01-15'
  },
  {
    clientId: '18',
    status: 'Sanctioned',
    lastUpdated: '2024-01-24'
  },

  // Credit Applications
  {
    clientId: '7',
    status: 'New Lead',
    lastUpdated: '2024-01-17'
  },
  {
    clientId: '21',
    status: 'Under Processing',
    lastUpdated: '2024-01-25'
  }
];

export const documents: Document[] = [
  // Loan Documents
  {
    clientId: '1',
    type: 'PAN',
    name: 'pan_card.pdf',
    uploadedDate: '2024-01-10',
    status: 'Verified'
  },
  {
    clientId: '1',
    type: 'Aadhaar',
    name: 'aadhaar_card.pdf',
    uploadedDate: '2024-01-10',
    status: 'Verified'
  },
  {
    clientId: '2',
    type: 'Salary Slips',
    name: 'salary_slips_jan.pdf',
    uploadedDate: '2024-01-11',
    status: 'Pending'
  },
  {
    clientId: '3',
    type: 'Bank Statements',
    name: 'bank_statement_q4.pdf',
    uploadedDate: '2024-01-12',
    status: 'Verified'
  },
  {
    clientId: '4',
    type: 'ITR',
    name: 'itr_2023.pdf',
    uploadedDate: '2024-01-13',
    status: 'Uploaded'
  },
  {
    clientId: '9',
    type: 'PAN',
    name: 'pan_card_9.pdf',
    uploadedDate: '2024-01-18',
    status: 'Uploaded'
  },
  {
    clientId: '9',
    type: 'Aadhaar',
    name: 'aadhaar_card_9.pdf',
    uploadedDate: '2024-01-18',
    status: 'Pending'
  },
  {
    clientId: '10',
    type: 'Aadhaar',
    name: 'aadhaar_card_10.pdf',
    uploadedDate: '2024-01-19',
    status: 'Verified'
  },
  {
    clientId: '10',
    type: 'Salary Slips',
    name: 'salary_slips_dec.pdf',
    uploadedDate: '2024-01-19',
    status: 'Verified'
  },
  {
    clientId: '11',
    type: 'RC Copy',
    name: 'rc_copy.pdf',
    uploadedDate: '2024-01-20',
    status: 'Verified'
  },

  // Insurance Documents
  {
    clientId: '5',
    type: 'Address Proof',
    name: 'electricity_bill.pdf',
    uploadedDate: '2024-01-14',
    status: 'Verified'
  },
  {
    clientId: '15',
    type: 'Medical Reports',
    name: 'medical_report.pdf',
    uploadedDate: '2024-01-22',
    status: 'Pending'
  },

  // Investment Documents
  {
    clientId: '6',
    type: 'Loan Forms',
    name: 'application_form.pdf',
    uploadedDate: '2024-01-15',
    status: 'Pending'
  },
  {
    clientId: '8',
    type: 'Investment Proof',
    name: 'investment_docs.pdf',
    uploadedDate: '2024-01-17',
    status: 'Uploaded'
  },
  {
    clientId: '18',
    type: 'Bank FD Receipt',
    name: 'fd_receipt.pdf',
    uploadedDate: '2024-01-24',
    status: 'Verified'
  },

  // Credit Documents
  {
    clientId: '7',
    type: 'Income Proof',
    name: 'income_certificate.pdf',
    uploadedDate: '2024-01-16',
    status: 'Verified'
  },
  {
    clientId: '21',
    type: 'Business Proof',
    name: 'business_registration.pdf',
    uploadedDate: '2024-01-25',
    status: 'Uploaded'
  }
];

export const commissions: Commission[] = [
  // Loan Commissions
  {
    clientId: '1',
    expectedPayout: 15000,
    approvedPayout: 12000,
    paidCommission: 8000,
    pendingCommission: 4000
  },
  {
    clientId: '2',
    expectedPayout: 25000,
    approvedPayout: 22000,
    paidCommission: 15000,
    pendingCommission: 7000
  },
  {
    clientId: '3',
    expectedPayout: 18000,
    approvedPayout: 16000,
    paidCommission: 10000,
    pendingCommission: 6000
  },
  {
    clientId: '4',
    expectedPayout: 32000,
    approvedPayout: 30000,
    paidCommission: 20000,
    pendingCommission: 10000
  },
  {
    clientId: '9',
    expectedPayout: 12000,
    approvedPayout: 10000,
    paidCommission: 5000,
    pendingCommission: 5000
  },
  {
    clientId: '10',
    expectedPayout: 28000,
    approvedPayout: 25000,
    paidCommission: 12000,
    pendingCommission: 13000
  },
  {
    clientId: '11',
    expectedPayout: 8000,
    approvedPayout: 7500,
    paidCommission: 0,
    pendingCommission: 7500
  },

  // Insurance Commissions
  {
    clientId: '5',
    expectedPayout: 8000,
    approvedPayout: 7500,
    paidCommission: 7500,
    pendingCommission: 0
  },
  {
    clientId: '15',
    expectedPayout: 12000,
    approvedPayout: 10000,
    paidCommission: 5000,
    pendingCommission: 5000
  },

  // Investment Commissions
  {
    clientId: '6',
    expectedPayout: 12000,
    approvedPayout: 0,
    paidCommission: 0,
    pendingCommission: 0
  },
  {
    clientId: '8',
    expectedPayout: 15000,
    approvedPayout: 12000,
    paidCommission: 8000,
    pendingCommission: 4000
  },
  {
    clientId: '18',
    expectedPayout: 5000,
    approvedPayout: 4500,
    paidCommission: 4500,
    pendingCommission: 0
  },

  // Credit Commissions
  {
    clientId: '7',
    expectedPayout: 5000,
    approvedPayout: 4500,
    paidCommission: 3000,
    pendingCommission: 1500
  },
  {
    clientId: '21',
    expectedPayout: 10000,
    approvedPayout: 8000,
    paidCommission: 0,
    pendingCommission: 8000
  }
];

// Enhanced product categories and mappings
export const categories = {
  'All': ['All'],
    'Loan': ['Personal Loan', 'Home Loan', 'Business Loan', 'LAP', 'Car Loan', 'Education Loan', 'Mortgage Loan', 'SME Loan','Balance transfer Loan', 'Vehicle Loan','loan against securities / MF', 'Debt Capital Market (DCM)'],
    'Insurance': ['Life Insurance', 'Health Insurance', 'Motor Insurance', 'Travel Insurance','Property Insurance','Cattle Insurance','Marine Insurance'],
    'Investment': ['Mutual Funds', 'Stocks', 'Fixed Deposits', 'Bonds', 'Real Estate','Wealth Management','PMS / AIF']
};

export const productCategoryMap: { [key: string]: string } = {
  'Personal Loan': 'Loan',
        'Home Loan': 'Loan',
        'Business Loan': 'Loan',
        'LAP': 'Loan',
        'Car Loan': 'Loan',
        'Education Loan': 'Loan',
        'Mortgage Loan' : 'Loan',
        'SME Loan': 'Loan',
        'Balance transfer Loan': 'Loan',
        'Vehicle Loan': 'Loan',
        'loan against securities / MF': 'Loan',
        'Debt Capital Market (DCM)': 'Loan',
        'Insurance': 'Insurance',
        'Life Insurance': 'Insurance',
        'Health Insurance': 'Insurance',
        'Motor Insurance': 'Insurance',
        'Travel Insurance': 'Insurance',
        'Property Insurance': 'Insurance',
        'Cattle Insurance': 'Insurance',
        'Marine Insurance': 'Insurance',
        'Mutual Funds': 'Investment',
        'Credit Card': 'Credit',
        'Investment': 'Investment',
        'Stocks': 'Investment',
        'Fixed Deposits': 'Investment',
        'Bonds': 'Investment',
        'Real Estate': 'Investment',
        'Wealth Management': 'Investment',
        'PMS / AIF': 'Investment',
        'Credit Line': 'Credit',
        'Loan Against Securities': 'Credit'
};

// Utility functions for data validation
export const validateClientData = (clientId: string): { isValid: boolean; missingData: string[] } => {
  const missingData: string[] = [];
  
  const clientLead = leads.find(lead => lead.clientId === clientId);
  const clientApplication = applications.find(app => app.clientId === clientId);
  const clientDocuments = documents.filter(doc => doc.clientId === clientId);
  const clientCommission = commissions.find(comm => comm.clientId === clientId);
  
  if (!clientLead) missingData.push('Lead');
  if (!clientApplication) missingData.push('Application');
  if (clientDocuments.length === 0) missingData.push('Documents');
  if (!clientCommission) missingData.push('Commission');
  
  return {
    isValid: missingData.length === 0,
    missingData
  };
};

export const getAllClientData = (clientId: string) => {
  const client = clients.find(c => c.id === clientId);
  const lead = leads.find(l => l.clientId === clientId);
  const application = applications.find(a => a.clientId === clientId);
  const clientDocuments = documents.filter(d => d.clientId === clientId);
  const commission = commissions.find(c => c.clientId === clientId);
  
  return {
    client,
    lead,
    application,
    documents: clientDocuments,
    commission
  };
};

// Get statistics by category
export const getCategoryStats = () => {
  const stats: { [key: string]: { clients: number; leads: number; revenue: number } } = {};
  
  Object.keys(categories).forEach(category => {
    if (category !== 'All') {
      const categoryClients = clients.filter(client => 
        productCategoryMap[client.product] === category
      );
      const categoryClientIds = categoryClients.map(c => c.id);
      const categoryLeads = leads.filter(lead => 
        categoryClientIds.includes(lead.clientId)
      );
      const categoryCommissions = commissions.filter(commission => 
        categoryClientIds.includes(commission.clientId)
      );
      
      stats[category] = {
        clients: categoryClients.length,
        leads: categoryLeads.length,
        revenue: categoryCommissions.reduce((sum, comm) => sum + comm.paidCommission + comm.pendingCommission, 0)
      };
    }
  });
  
  return stats;
};

// Export all data in a single object for easy imports
export const clientData = {
  clients,
  leads,
  applications,
  documents,
  commissions,
  categories,
  productCategoryMap
};

export default clientData;