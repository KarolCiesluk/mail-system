import axios from 'axios';
import { Campaign } from './types';

export const createCampaign = async (fields: Campaign) => {
  await axios.post('/api/campaigns', {
    fields
  });
};
