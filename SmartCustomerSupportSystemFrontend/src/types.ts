export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  description: string;
  aiSummary?: string;
  status: string;
  resolution?: string;
}

export interface SupportTicketDTO {
  name: string;
  email: string;
  description: string;
}

export const STATUS_OPTIONS = ["New", "In Progress", "Resolved", "Closed"];