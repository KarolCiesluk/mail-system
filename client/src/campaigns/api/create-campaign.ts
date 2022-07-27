import axios from 'axios';
import { Campaign, CampaignResponse } from '../types';

export const createCampaign = async (fields: Campaign) => {
  const { data } = await axios.post<CampaignResponse>('/api/campaigns', {
    fields
  });

  return data;
};
