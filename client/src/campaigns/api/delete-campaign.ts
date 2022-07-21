import axios from 'axios';

export const deleteCampaign = async (id: string) => {
  await axios.delete(`/api/campaigns/${id}`);
};
