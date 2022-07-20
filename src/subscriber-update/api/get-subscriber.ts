import axios from 'axios';
import { SubscriberResponse } from './types';

export const getSubscriber = async (subscriberId?: string) => {
  if (!subscriberId) {
    return;
  }

  const { data } = await axios.get<SubscriberResponse>(`/api/subscribers/${subscriberId}`);
  return data;
};
