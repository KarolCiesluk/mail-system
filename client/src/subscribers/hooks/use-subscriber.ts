import { useQuery } from '@tanstack/react-query';
import { getSubscriber } from '../api/get-subscriber';

export const useSubscriber = (id: string) => {
  return useQuery(['subscribers', id], () => getSubscriber(id), {
    staleTime: Infinity
  });
};
