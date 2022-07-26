import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCampaign } from '../api/delete-campaign';
import { campaignsKeys } from '../campaigns-keys';

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteCampaign, {
    onSuccess: () => {
      queryClient.invalidateQueries(campaignsKeys.all);
    }
  });
};
