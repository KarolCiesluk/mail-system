export interface Campaign {
  content: string;
  subject: string;
  status: 'sent' | 'draft';
}

interface CampaignRecord {
  id: string;
  createdTime: string;
  fields: Campaign;
}

export interface CampaignsResponse {
  records: CampaignRecord[];
}
