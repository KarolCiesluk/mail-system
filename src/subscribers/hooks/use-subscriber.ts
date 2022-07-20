import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { getSubscriber } from '../api/get-subscriber';
import { updateSubscriber } from '../api/update-subscriber';

export const useSubscriber = (subscriberId?: string) => {
  const [isDraft, setIsDraft] = React.useState(false);

  const queryResult = useQuery(['subscribers', subscriberId], () => getSubscriber(subscriberId), {
    enabled: !isDraft
  });

  const mutation = useMutation(
    async (data: { name: string; email: string }) => updateSubscriber(data, subscriberId),
    {
      onSuccess: () => {
        setIsDraft(false);
      }
    }
  );

  return { queryResult, mutation, setIsDraft };
};
