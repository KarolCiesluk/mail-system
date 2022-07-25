import { useQuery } from '@tanstack/react-query';
import { getCampaign } from '../api/get-campaign';

export const useCampaign = (id: string) => {
  return useQuery(['campaigns', id], () => getCampaign(id), {
    staleTime: Infinity
  });
};
