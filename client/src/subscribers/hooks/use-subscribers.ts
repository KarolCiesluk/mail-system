import { useQuery } from '@tanstack/react-query';
import { getSubscribers } from '../api/get-subscribers';
import { subscribersKeys } from '../subscribers-keys';

export const useSubscribers = () => useQuery(subscribersKeys.lists(), getSubscribers);
