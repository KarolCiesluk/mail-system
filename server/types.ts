export interface Subscriber {
  id: string;
  fields: {
    name: string;
    email: string;
  };
}

export interface Message {
  subject: string;
  content: string;
}
