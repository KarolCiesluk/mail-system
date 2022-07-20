import axios from 'axios';
import { CampaignFields } from './types';

export const createCampaign = async (fields: CampaignFields) => {
  await axios.post('/api/campaigns', {
    fields
  });
};
