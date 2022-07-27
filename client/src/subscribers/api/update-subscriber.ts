import axios from 'axios';
import { Subscriber, SubscriberResponse } from '../types';

export const updateSubscriber = async (fields: Subscriber, id: string) => {
  const { data } = await axios.patch<SubscriberResponse>(`/api/subscribers/${id}`, {
    fields
  });

  return data;
};
