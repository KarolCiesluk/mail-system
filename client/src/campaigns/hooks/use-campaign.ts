import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCampaign } from '../api/get-campaign';
import { campaignsKeys } from '../campaigns-keys';
import { CampaignResponse } from '../types';

export const useCampaign = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery(campaignsKeys.detail(id), getCampaign, {
    staleTime: Infinity,
    initialData: queryClient
      .getQueryData<CampaignResponse[]>(campaignsKeys.lists())
      ?.find((subscriber) => subscriber.id === id)
  });
};
