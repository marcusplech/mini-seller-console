export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
}

export interface Opportunity {
  id: number;
  leadId: number;
  name: string;
  company: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type StatusFilter = 'all' | 'new' | 'contacted' | 'qualified' | 'converted';
export type SortBy = 'score' | 'name' | 'company';