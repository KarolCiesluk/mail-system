import axios from 'axios';
import { Campaign, CampaignResponse } from '../types';

export const updateCampaign = async (fields: Campaign, id: string) => {
  const { data } = await axios.patch<CampaignResponse>(`/api/campaigns/${id}`, { fields });

  return data;
};
