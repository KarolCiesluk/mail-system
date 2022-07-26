import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSubscriber } from '../api/delete-subscriber';
import { subscribersKeys } from '../subscribers-keys';

export const useDeleteSubscriber = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteSubscriber, {
    onSuccess: () => {
      queryClient.invalidateQueries(subscribersKeys.all);
    }
  });
};
