import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSubscriber } from '../api/get-subscriber';
import { subscribersKeys } from '../subscribers-keys';
import { SubscriberResponse } from '../types';

export const useSubscriber = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery(subscribersKeys.detail(id), () => getSubscriber(id), {
    staleTime: Infinity,
    initialData: queryClient
      .getQueryData<SubscriberResponse[]>(subscribersKeys.lists())
      ?.find((subscriber) => subscriber.id === id)
  });
};
