export interface SubscriberResponse {
  id: string;
  createdTime: string;
  fields: {
    name: string;
    email: string;
  };
}
