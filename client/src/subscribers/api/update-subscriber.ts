import axios from 'axios';
import { Subscriber } from '../types';

export const updateSubscriber = async (fields: Subscriber, id: string) => {
  await axios.patch(`/api/subscribers/${id}`, {
    fields
  });
};
