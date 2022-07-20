import axios from 'axios';

export const getCampaigns = async () => {
  const { data } = await axios.get(`/api/campaigns`);

  return data;
};
