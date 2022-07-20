export interface Subscriber {
  name: string;
  email: string;
}

export interface SubscriberResponse {
  id: string;
  createdTime: string;
  fields: Subscriber;
}

export interface SubscribersResponse {
  records: SubscriberResponse[];
}
