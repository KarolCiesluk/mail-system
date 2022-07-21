import axios from 'axios';
import { CampaignResponse } from './types';

export const getCampaign = async (id: string) => {
  const { data } = await axios.get<CampaignResponse>(`/api/campaigns/${id}`);

  return data;
};
