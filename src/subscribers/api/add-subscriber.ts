import axios from 'axios';
import { Subscriber } from '../types';

export const addSubscriber = async (fields: Subscriber) => {
  await axios.post('/api/subscribers', { fields });
};
