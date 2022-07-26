import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCampaign } from '../api/update-campaign';
import { campaignsKeys } from '../campaigns-keys';
import { Campaign } from '../types';

export const useUpdateCampaign = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation((fields: Campaign) => updateCampaign(fields, id), {
    onSuccess: () => queryClient.invalidateQueries(campaignsKeys.detail(id))
  });
};
