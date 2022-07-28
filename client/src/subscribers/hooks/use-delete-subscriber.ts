import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSubscriber } from '../api/delete-subscriber';
import { subscribersKeys } from '../subscribers-keys';
import { SubscriberResponse } from '../types';

export const useDeleteSubscriber = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteSubscriber, {
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries(subscribersKeys.lists());

      const previousSubscribers = queryClient.getQueryData<SubscriberResponse[]>(
        subscribersKeys.lists()
      );

      queryClient.setQueryData<SubscriberResponse[]>(subscribersKeys.lists(), (old) =>
        (old || []).filter((subscriber) => subscriber.id !== deletedId)
      );

      return { previousSubscribers };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousSubscribers) {
        queryClient.setQueryData<SubscriberResponse[]>(
          subscribersKeys.lists(),
          context.previousSubscribers
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(subscribersKeys.all);
    }
  });
};
