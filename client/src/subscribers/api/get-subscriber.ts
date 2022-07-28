import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { subscribersKeys } from '../subscribers-keys';
import { SubscriberResponse } from '../types';

export const getSubscriber = async ({
  queryKey: [{ id }]
}: QueryFunctionContext<ReturnType<typeof subscribersKeys['detail']>>) => {
  const { data } = await axios.get<SubscriberResponse>(`/api/subscribers/${id}`);

  return data;
};
