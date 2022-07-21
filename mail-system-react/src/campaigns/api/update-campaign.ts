import axios from 'axios';
import { Campaign } from '../types';

export const updateCampaign = async (fields: Campaign, id: string) => {
  await axios.patch(`/api/campaigns/${id}`, { fields });
};
