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
  priority: 'High' | 'Mid' | 'Low';
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
  },
  {
    id: '23',
    name: 'Ramesh Iyer',
    mobile: '+91 9876543232',
    email: 'ramesh@example.com',
    address: 'Coimbatore, Tamil Nadu',
    product: 'Personal Loan',
    relationshipManager: 'Amit Sharma'
  },
  {
    id: '24',
    name: 'Kavita Choudhary',
    mobile: '+91 9876543233',
    email: 'kavita@example.com',
    address: 'Bhopal, Madhya Pradesh',
    product: 'Personal Loan',
    relationshipManager: 'Neha Verma'
  },
  {
    id: '25',
    name: 'Deepak Joshi',
    mobile: '+91 9876543234',
    email: 'deepak@example.com',
    address: 'Dehradun, Uttarakhand',
    product: 'Home Loan',
    relationshipManager: 'Rahul Mehta'
  },
  {
    id: '26',
    name: 'Anita Desai',
    mobile: '+91 9876543235',
    email: 'anita@example.com',
    address: 'Mysore, Karnataka',
    product: 'Home Loan',
    relationshipManager: 'Kiran Kumar'
  },
  {
    id: '27',
    name: 'Rajiv Enterprises',
    mobile: '+91 9876543236',
    email: 'rajiv@example.com',
    address: 'Surat, Gujarat',
    product: 'Business Loan',
    relationshipManager: 'Rahul Mehta'
  },
  {
    id: '28',
    name: 'Sharma Textiles',
    mobile: '+91 9876543237',
    email: 'sharma@example.com',
    address: 'Ludhiana, Punjab',
    product: 'SME Loan',
    relationshipManager: 'Amit Sharma'
  },
  {
    id: '29',
    name: 'Gupta Metals',
    mobile: '+91 9876543238',
    email: 'gupta@example.com',
    address: 'Jamshedpur, Jharkhand',
    product: 'LAP',
    relationshipManager: 'Kiran Kumar'
  },
  {
    id: '30',
    name: 'Malhotra Constructions',
    mobile: '+91 9876543239',
    email: 'malhotra@example.com',
    address: 'Noida, Uttar Pradesh',
    product: 'Mortgage Loan',
    relationshipManager: 'Neha Verma'
  },

  // Additional clients for missing subcategories

  // Loan - Balance Transfer Loan
  {
    id: '31',
    name: 'Rahul Mehta',
    mobile: '+91 9876543240',
    email: 'rahulm@example.com',
    address: 'Mumbai, Maharashtra',
    product: 'Balance Transfer Loan',
    relationshipManager: 'Amit Sharma'
  },
  {
    id: '32',
    name: 'Sunil Nair',
    mobile: '+91 9876543241',
    email: 'sunil@example.com',
    address: 'Kochi, Kerala',
    product: 'Balance Transfer Loan',
    relationshipManager: 'Priya Nair'
  },
  {
    id: '33',
    name: 'Priya Reddy',
    mobile: '+91 9876543242',
    email: 'priyar@example.com',
    address: 'Hyderabad, Telangana',
    product: 'Balance Transfer Loan',
    relationshipManager: 'Kiran Kumar'
  },

  // Loan - Vehicle Loan
  {
    id: '34',
    name: 'Arjun Singh',
    mobile: '+91 9876543243',
    email: 'arjun@example.com',
    address: 'Jaipur, Rajasthan',
    product: 'Vehicle Loan',
    relationshipManager: 'Vikram Singh'
  },
  {
    id: '35',
    name: 'Meena Kumari',
    mobile: '+91 9876543244',
    email: 'meena@example.com',
    address: 'Patna, Bihar',
    product: 'Vehicle Loan',
    relationshipManager: 'Neha Verma'
  },
  {
    id: '36',
    name: 'Suresh Kumar',
    mobile: '+91 9876543245',
    email: 'suresh@example.com',
    address: 'Chennai, Tamil Nadu',
    product: 'Vehicle Loan',
    relationshipManager: 'Rahul Mehta'
  },

  // Loan - Debt Capital Market (DCM)
  {
    id: '37',
    name: 'Corporate Solutions Ltd',
    mobile: '+91 9876543246',
    email: 'corporate@example.com',
    address: 'Mumbai, Maharashtra',
    product: 'Debt Capital Market (DCM)',
    relationshipManager: 'Sanjay Rao'
  },
  {
    id: '38',
    name: 'Infra Developers Inc',
    mobile: '+91 9876543247',
    email: 'infra@example.com',
    address: 'Delhi, NCR',
    product: 'Debt Capital Market (DCM)',
    relationshipManager: 'Arun Joshi'
  },

  // Insurance - Travel Insurance
  {
    id: '39',
    name: 'Rohan Basu',
    mobile: '+91 9876543248',
    email: 'rohan@example.com',
    address: 'Kolkata, West Bengal',
    product: 'Travel Insurance',
    relationshipManager: 'Sneha Reddy'
  },
  {
    id: '40',
    name: 'Aditi Sharma',
    mobile: '+91 9876543249',
    email: 'aditi@example.com',
    address: 'Mumbai, Maharashtra',
    product: 'Travel Insurance',
    relationshipManager: 'Priya Nair'
  },
  {
    id: '41',
    name: 'Nitin Kapoor',
    mobile: '+91 9876543250',
    email: 'nitin@example.com',
    address: 'Delhi, NCR',
    product: 'Travel Insurance',
    relationshipManager: 'Amit Sharma'
  },

  // Insurance - Property Insurance
  {
    id: '42',
    name: 'Real Estate Corp',
    mobile: '+91 9876543251',
    email: 'realestate@example.com',
    address: 'Bengaluru, Karnataka',
    product: 'Property Insurance',
    relationshipManager: 'Kiran Kumar'
  },
  {
    id: '43',
    name: 'Mall Developers',
    mobile: '+91 9876543252',
    email: 'mall@example.com',
    address: 'Pune, Maharashtra',
    product: 'Property Insurance',
    relationshipManager: 'Rahul Mehta'
  },
  {
    id: '44',
    name: 'Warehouse Ltd',
    mobile: '+91 9876543253',
    email: 'warehouse@example.com',
    address: 'Chennai, Tamil Nadu',
    product: 'Property Insurance',
    relationshipManager: 'Neha Verma'
  },

  // Insurance - Cattle Insurance
  {
    id: '45',
    name: 'Dairy Farmers Coop',
    mobile: '+91 9876543254',
    email: 'dairy@example.com',
    address: 'Anand, Gujarat',
    product: 'Cattle Insurance',
    relationshipManager: 'Vikram Singh'
  },
  {
    id: '46',
    name: 'Livestock Corp',
    mobile: '+91 9876543255',
    email: 'livestock@example.com',
    address: 'Nagpur, Maharashtra',
    product: 'Cattle Insurance',
    relationshipManager: 'Priya Nair'
  },

  // Insurance - Marine Insurance
  {
    id: '47',
    name: 'Shipping Lines Ltd',
    mobile: '+91 9876543256',
    email: 'shipping@example.com',
    address: 'Mumbai, Maharashtra',
    product: 'Marine Insurance',
    relationshipManager: 'Sanjay Rao'
  },
  {
    id: '48',
    name: 'Export Import Corp',
    mobile: '+91 9876543257',
    email: 'export@example.com',
    address: 'Kolkata, West Bengal',
    product: 'Marine Insurance',
    relationshipManager: 'Arun Joshi'
  },

  // Investment - Wealth Management
  {
    id: '49',
    name: 'High Net Worth Individual',
    mobile: '+91 9876543258',
    email: 'hnwi@example.com',
    address: 'Mumbai, Maharashtra',
    product: 'Wealth Management',
    relationshipManager: 'Meera Iyer'
  },
  {
    id: '50',
    name: 'Family Office Services',
    mobile: '+91 9876543259',
    email: 'familyoffice@example.com',
    address: 'Delhi, NCR',
    product: 'Wealth Management',
    relationshipManager: 'Arun Joshi'
  },
  {
    id: '51',
    name: 'Business Tycoon',
    mobile: '+91 9876543260',
    email: 'tycoon@example.com',
    address: 'Bengaluru, Karnataka',
    product: 'Wealth Management',
    relationshipManager: 'Sanjay Rao'
  },

  // Investment - PMS / AIF
  {
    id: '52',
    name: 'Portfolio Investors Ltd',
    mobile: '+91 9876543261',
    email: 'portfolio@example.com',
    address: 'Mumbai, Maharashtra',
    product: 'PMS / AIF',
    relationshipManager: 'Meera Iyer'
  },
  {
    id: '53',
    name: 'Alternative Fund',
    mobile: '+91 9876543262',
    email: 'alternative@example.com',
    address: 'Gurgaon, Haryana',
    product: 'PMS / AIF',
    relationshipManager: 'Arun Joshi'
  },
  {
    id: '54',
    name: 'Investment Trust',
    mobile: '+91 9876543263',
    email: 'trust@example.com',
    address: 'Chennai, Tamil Nadu',
    product: 'PMS / AIF',
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
    priority: 'High'
  },
  {
    id: '2',
    clientId: '2',
    source: 'Walk-in',
    status: 'New',
    followUpActivity: 'Initial Consultation',
    nextFollowUpDate: '2024-01-18',
    notes: 'Looking for home loan for new property',
    priority: 'High'
  },
  {
    id: '3',
    clientId: '3',
    source: 'Tele-calling',
    status: 'In-Progress',
    followUpActivity: 'Business Verification',
    nextFollowUpDate: '2024-01-22',
    notes: 'Business expansion loan required',
    priority: 'Mid'
  },
  {
    id: '4',
    clientId: '4',
    source: 'Social',
    status: 'New',
    followUpActivity: 'Property Evaluation',
    nextFollowUpDate: '2024-01-19',
    notes: 'Loan against property for business',
    priority: 'High'
  },
  {
    id: '9',
    clientId: '9',
    source: 'Tele-calling',
    status: 'New',
    followUpActivity: 'Initial Discussion',
    nextFollowUpDate: '2024-01-24',
    notes: 'Personal loan for medical expenses',
    priority: 'Mid'
  },
  {
    id: '10',
    clientId: '10',
    source: 'Referral',
    status: 'In-Progress',
    followUpActivity: 'Document Verification',
    nextFollowUpDate: '2024-01-26',
    notes: 'Home loan for new construction',
    priority: 'High'
  },
  {
    id: '11',
    clientId: '11',
    source: 'Walk-in',
    status: 'In-Progress',
    followUpActivity: 'Vehicle Selection',
    nextFollowUpDate: '2024-01-27',
    notes: 'Car loan for new SUV purchase',
    priority: 'High'
  },
  {
    id: '12',
    clientId: '12',
    source: 'Referral',
    status: 'New',
    followUpActivity: 'University Verification',
    nextFollowUpDate: '2024-01-28',
    notes: 'Education loan for Masters in US',
    priority: 'Mid'
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
    priority: 'Low'
  },
  {
    id: '15',
    clientId: '15',
    source: 'Tele-calling',
    status: 'In-Progress',
    followUpActivity: 'Medical Checkup',
    nextFollowUpDate: '2024-01-29',
    notes: 'Family health insurance required',
    priority: 'High'
  },
  {
    id: '16',
    clientId: '16',
    source: 'Walk-in',
    status: 'New',
    followUpActivity: 'Vehicle Inspection',
    nextFollowUpDate: '2024-01-30',
    notes: 'Car insurance renewal with better coverage',
    priority: 'Mid'
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
    priority: 'Low'
  },
  {
    id: '8',
    clientId: '8',
    source: 'Referral',
    status: 'New',
    followUpActivity: 'Investment Planning',
    nextFollowUpDate: '2024-01-23',
    notes: 'Wealth management consultation',
    priority: 'High'
  },
  {
    id: '18',
    clientId: '18',
    source: 'Tele-calling',
    status: 'In-Progress',
    followUpActivity: 'Rate Discussion',
    nextFollowUpDate: '2024-02-02',
    notes: 'Fixed deposit for 3 years',
    priority: 'Mid'
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
    priority: 'Mid'
  },
  {
    id: '21',
    clientId: '21',
    source: 'Referral',
    status: 'New',
    followUpActivity: 'Credit Limit Discussion',
    nextFollowUpDate: '2024-02-03',
    notes: 'Business credit line requirement',
    priority: 'High'
  },
  {
    id: '22',
    clientId: '22',
    source: 'Tele-calling',
    status: 'New',
    followUpActivity: 'Initial Discussion',
    nextFollowUpDate: '2024-02-05',
    notes: 'Personal loan for wedding expenses',
    priority: 'Mid'
  },
  {
    id: '23',
    clientId: '24',
    source: 'Referral',
    status: 'In-Progress',
    followUpActivity: 'Document Collection',
    nextFollowUpDate: '2024-02-06',
    notes: 'Debt consolidation loan required',
    priority: 'High'
  },
  {
    id: '24',
    clientId: '25',
    source: 'Walk-in',
    status: 'In-Progress',
    followUpActivity: 'Property Verification',
    nextFollowUpDate: '2024-02-07',
    notes: 'Home loan for apartment purchase',
    priority: 'High'
  },
  {
    id: '25',
    clientId: '26',
    source: 'Social',
    status: 'New',
    followUpActivity: 'Initial Consultation',
    nextFollowUpDate: '2024-02-08',
    notes: 'Home construction loan inquiry',
    priority: 'Mid'
  },
  {
    id: '26',
    clientId: '27',
    source: 'Referral',
    status: 'In-Progress',
    followUpActivity: 'Business Plan Review',
    nextFollowUpDate: '2024-02-09',
    notes: 'Business expansion funding',
    priority: 'High'
  },
  {
    id: '27',
    clientId: '28',
    source: 'Tele-calling',
    status: 'New',
    followUpActivity: 'Factory Visit',
    nextFollowUpDate: '2024-02-10',
    notes: 'SME loan for textile unit',
    priority: 'Mid'
  },
  {
    id: '28',
    clientId: '29',
    source: 'Walk-in',
    status: 'In-Progress',
    followUpActivity: 'Property Assessment',
    nextFollowUpDate: '2024-02-11',
    notes: 'Loan against commercial property',
    priority: 'High'
  },
  {
    id: '29',
    clientId: '30',
    source: 'Referral',
    status: 'New',
    followUpActivity: 'Project Evaluation',
    nextFollowUpDate: '2024-02-12',
    notes: 'Construction project financing',
    priority: 'High'
  },

  // New leads for additional clients
  {
    id: '30',
    clientId: '31',
    source: 'Tele-calling',
    status: 'New',
    followUpActivity: 'Loan Transfer Discussion',
    nextFollowUpDate: '2024-02-15',
    notes: 'Balance transfer from other bank',
    priority: 'Mid'
  },
  {
    id: '31',
    clientId: '32',
    source: 'Referral',
    status: 'In-Progress',
    followUpActivity: 'Rate Comparison',
    nextFollowUpDate: '2024-02-16',
    notes: 'Looking for better interest rates',
    priority: 'High'
  },
  {
    id: '32',
    clientId: '33',
    source: 'Walk-in',
    status: 'New',
    followUpActivity: 'Document Verification',
    nextFollowUpDate: '2024-02-17',
    notes: 'Balance transfer for existing loan',
    priority: 'Mid'
  },
  {
    id: '33',
    clientId: '34',
    source: 'Tele-calling',
    status: 'In-Progress',
    followUpActivity: 'Vehicle Selection',
    nextFollowUpDate: '2024-02-18',
    notes: 'Commercial vehicle loan required',
    priority: 'High'
  },
  {
    id: '34',
    clientId: '35',
    source: 'Walk-in',
    status: 'New',
    followUpActivity: 'Initial Discussion',
    nextFollowUpDate: '2024-02-19',
    notes: 'Two-wheeler loan application',
    priority: 'Mid'
  },
  {
    id: '35',
    clientId: '36',
    source: 'Referral',
    status: 'In-Progress',
    followUpActivity: 'Vehicle Inspection',
    nextFollowUpDate: '2024-02-20',
    notes: 'Truck loan for transport business',
    priority: 'High'
  },
  {
    id: '36',
    clientId: '37',
    source: 'Corporate',
    status: 'New',
    followUpActivity: 'Capital Market Consultation',
    nextFollowUpDate: '2024-02-21',
    notes: 'Debt capital raising for expansion',
    priority: 'High'
  },
  {
    id: '37',
    clientId: '38',
    source: 'Corporate',
    status: 'In-Progress',
    followUpActivity: 'Financial Analysis',
    nextFollowUpDate: '2024-02-22',
    notes: 'Infrastructure project financing',
    priority: 'High'
  },
  {
    id: '38',
    clientId: '39',
    source: 'Online',
    status: 'New',
    followUpActivity: 'Travel Plan Discussion',
    nextFollowUpDate: '2024-02-23',
    notes: 'International travel insurance required',
    priority: 'Mid'
  },
  {
    id: '39',
    clientId: '40',
    source: 'Tele-calling',
    status: 'In-Progress',
    followUpActivity: 'Policy Customization',
    nextFollowUpDate: '2024-02-24',
    notes: 'Family travel insurance for Europe trip',
    priority: 'High'
  },
  {
    id: '40',
    clientId: '41',
    source: 'Walk-in',
    status: 'New',
    followUpActivity: 'Travel Details Collection',
    nextFollowUpDate: '2024-02-25',
    notes: 'Business travel insurance',
    priority: 'Mid'
  },
  {
    id: '41',
    clientId: '42',
    source: 'Corporate',
    status: 'In-Progress',
    followUpActivity: 'Property Valuation',
    nextFollowUpDate: '2024-02-26',
    notes: 'Commercial property insurance',
    priority: 'High'
  },
  {
    id: '42',
    clientId: '43',
    source: 'Tele-calling',
    status: 'New',
    followUpActivity: 'Risk Assessment',
    nextFollowUpDate: '2024-02-27',
    notes: 'Shopping mall insurance',
    priority: 'Mid'
  },
  {
    id: '43',
    clientId: '44',
    source: 'Corporate',
    status: 'In-Progress',
    followUpActivity: 'Property Inspection',
    nextFollowUpDate: '2024-02-28',
    notes: 'Warehouse insurance coverage',
    priority: 'High'
  },
  {
    id: '44',
    clientId: '45',
    source: 'Rural',
    status: 'New',
    followUpActivity: 'Livestock Assessment',
    nextFollowUpDate: '2024-03-01',
    notes: 'Cattle insurance for dairy farm',
    priority: 'Mid'
  },
  {
    id: '45',
    clientId: '46',
    source: 'Corporate',
    status: 'In-Progress',
    followUpActivity: 'Livestock Count',
    nextFollowUpDate: '2024-03-02',
    notes: 'Large scale cattle insurance',
    priority: 'High'
  },
  {
    id: '46',
    clientId: '47',
    source: 'Corporate',
    status: 'New',
    followUpActivity: 'Cargo Details',
    nextFollowUpDate: '2024-03-03',
    notes: 'Marine insurance for shipping',
    priority: 'High'
  },
  {
    id: '47',
    clientId: '48',
    source: 'Corporate',
    status: 'In-Progress',
    followUpActivity: 'Export Documentation',
    nextFollowUpDate: '2024-03-04',
    notes: 'Marine insurance for exports',
    priority: 'High'
  },
  {
    id: '48',
    clientId: '49',
    source: 'Referral',
    status: 'New',
    followUpActivity: 'Wealth Assessment',
    nextFollowUpDate: '2024-03-05',
    notes: 'High net worth portfolio management',
    priority: 'High'
  },
  {
    id: '49',
    clientId: '50',
    source: 'Corporate',
    status: 'In-Progress',
    followUpActivity: 'Family Office Setup',
    nextFollowUpDate: '2024-03-06',
    notes: 'Comprehensive wealth management',
    priority: 'High'
  },
  {
    id: '50',
    clientId: '51',
    source: 'Referral',
    status: 'New',
    followUpActivity: 'Investment Strategy',
    nextFollowUpDate: '2024-03-07',
    notes: 'Business owner wealth management',
    priority: 'High'
  },
  {
    id: '51',
    clientId: '52',
    source: 'Corporate',
    status: 'In-Progress',
    followUpActivity: 'Portfolio Review',
    nextFollowUpDate: '2024-03-08',
    notes: 'Portfolio management services',
    priority: 'High'
  },
  {
    id: '52',
    clientId: '53',
    source: 'Referral',
    status: 'New',
    followUpActivity: 'Fund Strategy Discussion',
    nextFollowUpDate: '2024-03-09',
    notes: 'Alternative investment fund',
    priority: 'High'
  },
  {
    id: '53',
    clientId: '54',
    source: 'Corporate',
    status: 'In-Progress',
    followUpActivity: 'Trust Setup',
    nextFollowUpDate: '2024-03-10',
    notes: 'Investment trust management',
    priority: 'High'
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
  },
  {
    clientId: '22',
    status: 'Under Processing',
    lastUpdated: '2024-01-25'
  },
  {
    clientId: '23',
    status: 'Document Pending',
    lastUpdated: '2024-02-01'
  },
  {
    clientId: '24',
    status: 'Under Processing',
    lastUpdated: '2024-02-02'
  },
  {
    clientId: '25',
    status: 'Underwriting',
    lastUpdated: '2024-02-03'
  },
  {
    clientId: '26',
    status: 'New Lead',
    lastUpdated: '2024-02-04'
  },
  {
    clientId: '27',
    status: 'Sanctioned',
    lastUpdated: '2024-02-05'
  },
  {
    clientId: '28',
    status: 'Document Pending',
    lastUpdated: '2024-02-06'
  },
  {
    clientId: '29',
    status: 'Under Processing',
    lastUpdated: '2024-02-07'
  },
  {
    clientId: '30',
    status: 'New Lead',
    lastUpdated: '2024-02-08'
  },

  // New applications for additional clients
  {
    clientId: '31',
    status: 'Document Pending',
    lastUpdated: '2024-02-15'
  },
  {
    clientId: '32',
    status: 'Under Processing',
    lastUpdated: '2024-02-16'
  },
  {
    clientId: '33',
    status: 'New Lead',
    lastUpdated: '2024-02-17'
  },
  {
    clientId: '34',
    status: 'Underwriting',
    lastUpdated: '2024-02-18'
  },
  {
    clientId: '35',
    status: 'Document Pending',
    lastUpdated: '2024-02-19'
  },
  {
    clientId: '36',
    status: 'Under Processing',
    lastUpdated: '2024-02-20'
  },
  {
    clientId: '37',
    status: 'New Lead',
    lastUpdated: '2024-02-21'
  },
  {
    clientId: '38',
    status: 'Underwriting',
    lastUpdated: '2024-02-22'
  },
  {
    clientId: '39',
    status: 'Document Pending',
    lastUpdated: '2024-02-23'
  },
  {
    clientId: '40',
    status: 'Under Processing',
    lastUpdated: '2024-02-24'
  },
  {
    clientId: '41',
    status: 'New Lead',
    lastUpdated: '2024-02-25'
  },
  {
    clientId: '42',
    status: 'Underwriting',
    lastUpdated: '2024-02-26'
  },
  {
    clientId: '43',
    status: 'Document Pending',
    lastUpdated: '2024-02-27'
  },
  {
    clientId: '44',
    status: 'Under Processing',
    lastUpdated: '2024-02-28'
  },
  {
    clientId: '45',
    status: 'New Lead',
    lastUpdated: '2024-03-01'
  },
  {
    clientId: '46',
    status: 'Underwriting',
    lastUpdated: '2024-03-02'
  },
  {
    clientId: '47',
    status: 'Document Pending',
    lastUpdated: '2024-03-03'
  },
  {
    clientId: '48',
    status: 'Under Processing',
    lastUpdated: '2024-03-04'
  },
  {
    clientId: '49',
    status: 'New Lead',
    lastUpdated: '2024-03-05'
  },
  {
    clientId: '50',
    status: 'Underwriting',
    lastUpdated: '2024-03-06'
  },
  {
    clientId: '51',
    status: 'Document Pending',
    lastUpdated: '2024-03-07'
  },
  {
    clientId: '52',
    status: 'Under Processing',
    lastUpdated: '2024-03-08'
  },
  {
    clientId: '53',
    status: 'New Lead',
    lastUpdated: '2024-03-09'
  },
  {
    clientId: '54',
    status: 'Underwriting',
    lastUpdated: '2024-03-10'
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
  },
  {
    clientId: '22',
    type: 'Business Proof',
    name: 'business_registration.pdf',
    uploadedDate: '2024-01-25',
    status: 'Uploaded'
  },
  {
    clientId: '23',
    type: 'PAN Card',
    name: 'pan_23.pdf',
    uploadedDate: '2024-02-01',
    status: 'Verified'
  },
  {
    clientId: '23',
    type: 'Aadhaar Card',
    name: 'aadhaar_23.pdf',
    uploadedDate: '2024-02-01',
    status: 'Pending'
  },
  {
    clientId: '24',
    type: 'Bank Statements',
    name: 'bank_statement_24.pdf',
    uploadedDate: '2024-02-02',
    status: 'Uploaded'
  },
  {
    clientId: '25',
    type: 'Salary Slips',
    name: 'salary_slips_25.pdf',
    uploadedDate: '2024-02-03',
    status: 'Verified'
  },
  {
    clientId: '26',
    type: 'Property Documents',
    name: 'property_docs_26.pdf',
    uploadedDate: '2024-02-04',
    status: 'Pending'
  },
  {
    clientId: '27',
    type: 'Business Registration',
    name: 'business_reg_27.pdf',
    uploadedDate: '2024-02-05',
    status: 'Verified'
  },
  {
    clientId: '28',
    type: 'GST Returns',
    name: 'gst_returns_28.pdf',
    uploadedDate: '2024-02-06',
    status: 'Uploaded'
  },
  {
    clientId: '29',
    type: 'Property Valuation',
    name: 'property_val_29.pdf',
    uploadedDate: '2024-02-07',
    status: 'Verified'
  },
  {
    clientId: '30',
    type: 'Project Report',
    name: 'project_report_30.pdf',
    uploadedDate: '2024-02-08',
    status: 'Pending'
  },

  // New documents for additional clients
  {
    clientId: '31',
    type: 'Existing Loan Statement',
    name: 'loan_statement_31.pdf',
    uploadedDate: '2024-02-15',
    status: 'Verified'
  },
  {
    clientId: '32',
    type: 'Income Proof',
    name: 'income_proof_32.pdf',
    uploadedDate: '2024-02-16',
    status: 'Pending'
  },
  {
    clientId: '33',
    type: 'Bank Statements',
    name: 'bank_statements_33.pdf',
    uploadedDate: '2024-02-17',
    status: 'Uploaded'
  },
  {
    clientId: '34',
    type: 'Vehicle RC',
    name: 'rc_copy_34.pdf',
    uploadedDate: '2024-02-18',
    status: 'Verified'
  },
  {
    clientId: '35',
    type: 'Income Proof',
    name: 'income_proof_35.pdf',
    uploadedDate: '2024-02-19',
    status: 'Pending'
  },
  {
    clientId: '36',
    type: 'Business Proof',
    name: 'business_proof_36.pdf',
    uploadedDate: '2024-02-20',
    status: 'Verified'
  },
  {
    clientId: '37',
    type: 'Company Financials',
    name: 'financials_37.pdf',
    uploadedDate: '2024-02-21',
    status: 'Uploaded'
  },
  {
    clientId: '38',
    type: 'Project Report',
    name: 'project_report_38.pdf',
    uploadedDate: '2024-02-22',
    status: 'Verified'
  },
  {
    clientId: '39',
    type: 'Passport Copy',
    name: 'passport_39.pdf',
    uploadedDate: '2024-02-23',
    status: 'Verified'
  },
  {
    clientId: '40',
    type: 'Travel Itinerary',
    name: 'itinerary_40.pdf',
    uploadedDate: '2024-02-24',
    status: 'Pending'
  },
  {
    clientId: '41',
    type: 'Business Card',
    name: 'business_card_41.pdf',
    uploadedDate: '2024-02-25',
    status: 'Uploaded'
  },
  {
    clientId: '42',
    type: 'Property Documents',
    name: 'property_docs_42.pdf',
    uploadedDate: '2024-02-26',
    status: 'Verified'
  },
  {
    clientId: '43',
    type: 'Building Plan',
    name: 'building_plan_43.pdf',
    uploadedDate: '2024-02-27',
    status: 'Pending'
  },
  {
    clientId: '44',
    type: 'Warehouse Details',
    name: 'warehouse_details_44.pdf',
    uploadedDate: '2024-02-28',
    status: 'Uploaded'
  },
  {
    clientId: '45',
    type: 'Livestock Records',
    name: 'livestock_records_45.pdf',
    uploadedDate: '2024-03-01',
    status: 'Verified'
  },
  {
    clientId: '46',
    type: 'Farm Registration',
    name: 'farm_registration_46.pdf',
    uploadedDate: '2024-03-02',
    status: 'Pending'
  },
  {
    clientId: '47',
    type: 'Shipping Documents',
    name: 'shipping_docs_47.pdf',
    uploadedDate: '2024-03-03',
    status: 'Verified'
  },
  {
    clientId: '48',
    type: 'Export License',
    name: 'export_license_48.pdf',
    uploadedDate: '2024-03-04',
    status: 'Uploaded'
  },
  {
    clientId: '49',
    type: 'Wealth Statement',
    name: 'wealth_statement_49.pdf',
    uploadedDate: '2024-03-05',
    status: 'Verified'
  },
  {
    clientId: '50',
    type: 'Family Assets',
    name: 'family_assets_50.pdf',
    uploadedDate: '2024-03-06',
    status: 'Pending'
  },
  {
    clientId: '51',
    type: 'Business Valuation',
    name: 'business_valuation_51.pdf',
    uploadedDate: '2024-03-07',
    status: 'Uploaded'
  },
  {
    clientId: '52',
    type: 'Portfolio Details',
    name: 'portfolio_details_52.pdf',
    uploadedDate: '2024-03-08',
    status: 'Verified'
  },
  {
    clientId: '53',
    type: 'Fund Strategy',
    name: 'fund_strategy_53.pdf',
    uploadedDate: '2024-03-09',
    status: 'Pending'
  },
  {
    clientId: '54',
    type: 'Trust Deed',
    name: 'trust_deed_54.pdf',
    uploadedDate: '2024-03-10',
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
  },
  {
    clientId: '22',
    expectedPayout: 10000,
    approvedPayout: 8000,
    paidCommission: 0,
    pendingCommission: 8000
  },
  {
    clientId: '23',
    expectedPayout: 11000,
    approvedPayout: 9000,
    paidCommission: 4000,
    pendingCommission: 5000
  },
  {
    clientId: '24',
    expectedPayout: 13000,
    approvedPayout: 11000,
    paidCommission: 6000,
    pendingCommission: 5000
  },
  {
    clientId: '25',
    expectedPayout: 35000,
    approvedPayout: 32000,
    paidCommission: 15000,
    pendingCommission: 17000
  },
  {
    clientId: '26',
    expectedPayout: 28000,
    approvedPayout: 25000,
    paidCommission: 10000,
    pendingCommission: 15000
  },
  {
    clientId: '27',
    expectedPayout: 45000,
    approvedPayout: 42000,
    paidCommission: 20000,
    pendingCommission: 22000
  },
  {
    clientId: '28',
    expectedPayout: 32000,
    approvedPayout: 30000,
    paidCommission: 12000,
    pendingCommission: 18000
  },
  {
    clientId: '29',
    expectedPayout: 38000,
    approvedPayout: 35000,
    paidCommission: 15000,
    pendingCommission: 20000
  },
  {
    clientId: '30',
    expectedPayout: 52000,
    approvedPayout: 48000,
    paidCommission: 20000,
    pendingCommission: 28000
  },

  // New commissions for additional clients
  {
    clientId: '31',
    expectedPayout: 8000,
    approvedPayout: 7000,
    paidCommission: 3500,
    pendingCommission: 3500
  },
  {
    clientId: '32',
    expectedPayout: 7500,
    approvedPayout: 6500,
    paidCommission: 3250,
    pendingCommission: 3250
  },
  {
    clientId: '33',
    expectedPayout: 8500,
    approvedPayout: 7500,
    paidCommission: 3750,
    pendingCommission: 3750
  },
  {
    clientId: '34',
    expectedPayout: 6000,
    approvedPayout: 5500,
    paidCommission: 2750,
    pendingCommission: 2750
  },
  {
    clientId: '35',
    expectedPayout: 4500,
    approvedPayout: 4000,
    paidCommission: 2000,
    pendingCommission: 2000
  },
  {
    clientId: '36',
    expectedPayout: 7000,
    approvedPayout: 6500,
    paidCommission: 3250,
    pendingCommission: 3250
  },
  {
    clientId: '37',
    expectedPayout: 120000,
    approvedPayout: 110000,
    paidCommission: 55000,
    pendingCommission: 55000
  },
  {
    clientId: '38',
    expectedPayout: 150000,
    approvedPayout: 140000,
    paidCommission: 70000,
    pendingCommission: 70000
  },
  {
    clientId: '39',
    expectedPayout: 5000,
    approvedPayout: 4500,
    paidCommission: 2250,
    pendingCommission: 2250
  },
  {
    clientId: '40',
    expectedPayout: 6000,
    approvedPayout: 5500,
    paidCommission: 2750,
    pendingCommission: 2750
  },
  {
    clientId: '41',
    expectedPayout: 4500,
    approvedPayout: 4000,
    paidCommission: 2000,
    pendingCommission: 2000
  },
  {
    clientId: '42',
    expectedPayout: 25000,
    approvedPayout: 22000,
    paidCommission: 11000,
    pendingCommission: 11000
  },
  {
    clientId: '43',
    expectedPayout: 30000,
    approvedPayout: 28000,
    paidCommission: 14000,
    pendingCommission: 14000
  },
  {
    clientId: '44',
    expectedPayout: 18000,
    approvedPayout: 16000,
    paidCommission: 8000,
    pendingCommission: 8000
  },
  {
    clientId: '45',
    expectedPayout: 8000,
    approvedPayout: 7000,
    paidCommission: 3500,
    pendingCommission: 3500
  },
  {
    clientId: '46',
    expectedPayout: 12000,
    approvedPayout: 10000,
    paidCommission: 5000,
    pendingCommission: 5000
  },
  {
    clientId: '47',
    expectedPayout: 35000,
    approvedPayout: 32000,
    paidCommission: 16000,
    pendingCommission: 16000
  },
  {
    clientId: '48',
    expectedPayout: 28000,
    approvedPayout: 25000,
    paidCommission: 12500,
    pendingCommission: 12500
  },
  {
    clientId: '49',
    expectedPayout: 75000,
    approvedPayout: 70000,
    paidCommission: 35000,
    pendingCommission: 35000
  },
  {
    clientId: '50',
    expectedPayout: 80000,
    approvedPayout: 75000,
    paidCommission: 37500,
    pendingCommission: 37500
  },
  {
    clientId: '51',
    expectedPayout: 90000,
    approvedPayout: 85000,
    paidCommission: 42500,
    pendingCommission: 42500
  },
  {
    clientId: '52',
    expectedPayout: 60000,
    approvedPayout: 55000,
    paidCommission: 27500,
    pendingCommission: 27500
  },
  {
    clientId: '53',
    expectedPayout: 70000,
    approvedPayout: 65000,
    paidCommission: 32500,
    pendingCommission: 32500
  },
  {
    clientId: '54',
    expectedPayout: 55000,
    approvedPayout: 50000,
    paidCommission: 25000,
    pendingCommission: 25000
  }
];

// Enhanced product categories and mappings
export const categories = {
  'All': ['All'],
  'Loan': ['Personal Loan', 'Home Loan', 'Business Loan', 'LAP', 'Car Loan', 'Education Loan', 'Mortgage Loan', 'SME Loan','Balance Transfer Loan', 'Vehicle Loan','Loan Against Securities', 'Debt Capital Market (DCM)'],
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
  'Balance Transfer Loan': 'Loan',
  'Vehicle Loan': 'Loan',
  'Loan Against Securities': 'Loan',
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