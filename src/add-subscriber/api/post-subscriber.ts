import { SubscriberDataType } from './types';

export const postSubscriber = async (subscriberData: SubscriberDataType) => {
  await fetch(`${process.env.REACT_APP_API_URL}subscribers`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    },
    method: 'POST',
    body: JSON.stringify({ fields: subscriberData })
  });
};
