import axios from 'axios';
import { Subscriber } from '../types';

export const addSubscriber = (fields: Subscriber) => axios.post('/api/subscribers', { fields });
