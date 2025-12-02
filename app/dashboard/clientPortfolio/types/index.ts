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
    priority: string;
    status: string;
    source: string;
    nextFollowUpDate: string;
    followUpActivity: string;
    notes: string;
}

export interface Application {
    clientId: string;
    status: string;
    lastUpdated: string;
}

export interface Document {
    clientId: string;
    type: string;
    name: string;
    status: string;
    uploadedDate: string;
}

export interface Commission {
    clientId: string;
    expectedPayout: number;
    approvedPayout: number;
    paidCommission: number;
    pendingCommission: number;
}

export interface PaginationData<T> {
    data: T[];
    totalPages: number;
    totalItems: number;
}

export type ActiveTab = 'clients' | 'leads' | 'applications' | 'documents' | 'earnings';