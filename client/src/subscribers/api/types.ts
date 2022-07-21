import { Subscriber } from '../types';

export interface SubscriberResponse {
  id: string;
  createdTime: string;
  fields: Subscriber;
}

export interface SubscribersResponse {
  records: SubscriberResponse[];
}
