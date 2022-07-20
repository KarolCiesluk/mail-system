import axios from 'axios';
import { SubscriberDataType } from './types';

export const addSubscriber = async (subscriberData: SubscriberDataType) => {
  await axios.post('/api/subscribers', { fields: subscriberData });
};
