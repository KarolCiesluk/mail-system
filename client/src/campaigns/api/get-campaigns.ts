import axios from 'axios';
import { CampaignsResponse } from './types';

export const getCampaigns = async () => {
  const { data } = await axios.get<CampaignsResponse>(`/api/campaigns`);

  return data;
};
