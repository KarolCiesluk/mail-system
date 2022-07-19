import { Subscriber } from './types';

export const getSubscribers = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}subscribers`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    }
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message, { cause: error.error.type });
  }
  const data: { records: Subscriber[] } = await response.json();
  return data.records;
};
