import axios from 'axios';
import { SubscribersResponse } from './types';

export const getSubscribers = async () => {
  const { data } = await axios.get<SubscribersResponse>(`/api/subscribers`);

  return data.records;
};
