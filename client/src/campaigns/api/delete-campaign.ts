import axios from 'axios';

export const deleteCampaign = async (id: string) => axios.delete(`/api/campaigns/${id}`);
