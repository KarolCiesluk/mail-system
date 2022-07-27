import axios from 'axios';
import { Subscriber, SubscriberResponse } from '../types';

export const addSubscriber = async (fields: Subscriber) => {
  const { data } = await axios.post<SubscriberResponse>('/api/subscribers', { fields });

  return data;
};
