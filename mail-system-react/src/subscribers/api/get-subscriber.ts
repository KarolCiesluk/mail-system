import axios from 'axios';
import { SubscriberResponse } from './types';

export const getSubscriber = async (id: string) => {
  const { data } = await axios.get<SubscriberResponse>(`/api/subscribers/${id}`);

  return data;
};
