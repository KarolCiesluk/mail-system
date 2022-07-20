interface CampaignFields {
  content: string;
  subject: string;
  status: 'sent' | 'draft';
}

interface CampaignRecord {
  id: string;
  createdTime: string;
  fields: CampaignFields;
}

export interface CampaignsResponse {
  records: CampaignRecord[];
}
