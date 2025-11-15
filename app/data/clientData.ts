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

// Mock data
export const clients: Client[] = [
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
    id: '5',
    name: 'Vikram Malhotra',
    mobile: '+91 9876543214',
    email: 'vikram@example.com',
    address: 'Chennai, Tamil Nadu',
    product: 'Insurance',
    relationshipManager: 'Priya Nair'
  },
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
    id: '7',
    name: 'Rohit Verma',
    mobile: '+91 9876543216',
    email: 'rohit@example.com',
    address: 'Pune, Maharashtra',
    product: 'Credit Card',
    relationshipManager: 'Meera Iyer'
  },
  {
    id: '8',
    name: 'Neha Kapoor',
    mobile: '+91 9876543217',
    email: 'neha@example.com',
    address: 'Kolkata, West Bengal',
    product: 'Investment',
    relationshipManager: 'Arun Joshi'
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
  }
];

export const leads: Lead[] = [
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
  }
];

export const applications: Application[] = [
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
    clientId: '5',
    status: 'Disbursed',
    lastUpdated: '2024-01-12'
  },
  {
    clientId: '6',
    status: 'Rejected',
    lastUpdated: '2024-01-11'
  },
  {
    clientId: '7',
    status: 'New Lead',
    lastUpdated: '2024-01-17'
  },
  {
    clientId: '8',
    status: 'Under Processing',
    lastUpdated: '2024-01-15'
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
  }
];

export const documents: Document[] = [
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
    clientId: '5',
    type: 'Address Proof',
    name: 'electricity_bill.pdf',
    uploadedDate: '2024-01-14',
    status: 'Verified'
  },
  {
    clientId: '6',
    type: 'Loan Forms',
    name: 'application_form.pdf',
    uploadedDate: '2024-01-15',
    status: 'Pending'
  },
  {
    clientId: '7',
    type: 'Income Proof',
    name: 'income_certificate.pdf',
    uploadedDate: '2024-01-16',
    status: 'Verified'
  },
  {
    clientId: '8',
    type: 'Investment Proof',
    name: 'investment_docs.pdf',
    uploadedDate: '2024-01-17',
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
  }
];

export const commissions: Commission[] = [
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
    clientId: '5',
    expectedPayout: 8000,
    approvedPayout: 7500,
    paidCommission: 7500,
    pendingCommission: 0
  },
  {
    clientId: '6',
    expectedPayout: 12000,
    approvedPayout: 0,
    paidCommission: 0,
    pendingCommission: 0
  },
  {
    clientId: '7',
    expectedPayout: 5000,
    approvedPayout: 4500,
    paidCommission: 3000,
    pendingCommission: 1500
  },
  {
    clientId: '8',
    expectedPayout: 15000,
    approvedPayout: 12000,
    paidCommission: 8000,
    pendingCommission: 4000
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
  }
];

export const products = [
  'All', 'Personal Loan', 'Home Loan', 'Business Loan', 'LAP', 
  'Insurance', 'Mutual Funds', 'Credit Card', 'Investment'
];

export const productMap: { [key: string]: string[] } = {
  'Personal Loan': ['Personal Loan'],
  'Home Loan': ['Home Loan'],
  'Business Loan': ['Business Loan'],
  'LAP': ['LAP'],
  'Insurance': ['Insurance'],
  'Mutual Funds': ['Mutual Funds'],
  'Credit Card': ['Credit Card'],
  'Investment': ['Investment']
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

// Export all data in a single object for easy imports
export const clientData = {
  clients,
  leads,
  applications,
  documents,
  commissions,
  products,
  productMap
};

export default clientData;