import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSubscriber } from '../api/update-subscriber';
import { subscribersKeys } from '../subscribers-keys';
import { Subscriber, SubscriberResponse } from '../types';

export const useUpdateSubscriber = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(async (fields: Subscriber) => updateSubscriber(fields, id), {
    onSuccess: async (updateSubscriber) => {
      await queryClient.cancelQueries(subscribersKeys.lists());

      queryClient.setQueryData<SubscriberResponse[]>(subscribersKeys.lists(), (old) =>
        (old || []).map((subscriber) =>
          subscriber.id === updateSubscriber.id ? updateSubscriber : subscriber
        )
      );

      queryClient.invalidateQueries(subscribersKeys.detail(id));
    }
  });
};
