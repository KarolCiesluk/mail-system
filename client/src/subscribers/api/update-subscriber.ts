import axios from 'axios';
import { Subscriber } from '../types';

export const updateSubscriber = async (fields: Subscriber, id: string) => {
  return axios.patch(`/api/subscribers/${id}`, {
    fields
  });
};
