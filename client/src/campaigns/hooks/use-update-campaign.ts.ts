import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCampaign } from '../api/update-campaign';
import { campaignsKeys } from '../campaigns-keys';
import { Campaign, CampaignResponse } from '../types';

export const useUpdateCampaign = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation((fields: Campaign) => updateCampaign(fields, id), {
    onSuccess: async (updateCampaign) => {
      await queryClient.cancelQueries(campaignsKeys.lists());

      queryClient.setQueryData<CampaignResponse[]>(campaignsKeys.lists(), (old) =>
        (old || []).map((campaign) =>
          campaign.id === updateCampaign.id ? updateCampaign : campaign
        )
      );

      await queryClient.invalidateQueries(campaignsKeys.detail(id));
    }
  });
};
