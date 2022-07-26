import { useQuery } from '@tanstack/react-query';
import { getSubscriber } from '../api/get-subscriber';
import { subscribersKeys } from '../subscribers-keys';

export const useSubscriber = (id: string) => {
  return useQuery(subscribersKeys.detail(id), () => getSubscriber(id), {
    staleTime: Infinity
  });
};
