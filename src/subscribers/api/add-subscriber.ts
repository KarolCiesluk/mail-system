import axios from 'axios';
import { Subscriber } from '../types';

export const addSubscriber = async (subscriberData: Subscriber) => {
  await axios.post('/api/subscribers', { fields: subscriberData });
};
