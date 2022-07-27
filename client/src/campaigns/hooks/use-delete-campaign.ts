import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCampaign } from '../api/delete-campaign';
import { campaignsKeys } from '../campaigns-keys';
import { CampaignResponse } from '../types';

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteCampaign, {
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries(campaignsKeys.lists());

      const previousCampaigns = queryClient.getQueryData<CampaignResponse[]>(campaignsKeys.lists());

      queryClient.setQueryData<CampaignResponse[]>(campaignsKeys.lists(), (old) =>
        (old || []).filter((campaign) => campaign.id !== deletedId)
      );

      return { previousCampaigns };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCampaigns) {
        queryClient.setQueryData<CampaignResponse[]>(
          campaignsKeys.lists(),
          context.previousCampaigns
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(campaignsKeys.all);
    }
  });
};
