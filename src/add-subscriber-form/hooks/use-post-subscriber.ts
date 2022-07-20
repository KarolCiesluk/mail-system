import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSubscriber } from '../api/post-subscriber';

export const usePostSubscriber = () => {
  const queryClient = useQueryClient();

  return useMutation(postSubscriber, {
    onSuccess: () => {
      queryClient.invalidateQueries(['subscribers']);
    }
  });
};
