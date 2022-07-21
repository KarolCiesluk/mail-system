import { useQuery } from '@tanstack/react-query';
import { getSubscribers } from '../api/get-subscribers';

export const useSubscribers = () => useQuery(['subscribers'], getSubscribers);
