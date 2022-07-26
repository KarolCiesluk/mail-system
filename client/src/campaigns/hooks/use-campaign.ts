import { useQuery } from '@tanstack/react-query';
import { getCampaign } from '../api/get-campaign';
import { campaignsKeys } from '../campaigns-keys';

export const useCampaign = (id: string) => {
  return useQuery(campaignsKeys.detail(id), () => getCampaign(id), {
    staleTime: Infinity
  });
};
