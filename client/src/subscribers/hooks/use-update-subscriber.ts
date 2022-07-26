import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSubscriber } from '../api/update-subscriber';
import { Subscriber } from '../types';

export const useUpdateSubscriber = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(async (fields: Subscriber) => updateSubscriber(fields, id), {
    onSuccess: () => queryClient.invalidateQueries(['subscribers', id])
  });
};
