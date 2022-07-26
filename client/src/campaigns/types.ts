export interface Campaign {
  content: string;
  subject: string;
  status: 'sent' | 'draft';
}

export interface CampaignResponse {
  id: string;
  createdTime: string;
  fields: Campaign;
}
