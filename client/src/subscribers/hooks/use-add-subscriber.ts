import { useMutation } from '@tanstack/react-query';
import { addSubscriber } from '../api/add-subscriber';

export const useAddSubscriber = () => {
  return useMutation(addSubscriber);
};
