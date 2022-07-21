import { Campaign } from '../types';

export interface CampaignResponse {
  id: string;
  createdTime: string;
  fields: Campaign;
}

export interface CampaignsResponse {
  records: CampaignResponse[];
}
