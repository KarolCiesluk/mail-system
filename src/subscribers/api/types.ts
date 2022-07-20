export interface Subscriber {
  id: string;
  createdTime: string;
  fields: { name: string; email: string };
}

export interface SubscribersResponse {
  records: Subscriber[];
}
