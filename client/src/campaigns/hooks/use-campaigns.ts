import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from '../api/get-campaigns';

export const useCampaigns = () => useQuery(['campaigns'], getCampaigns);
