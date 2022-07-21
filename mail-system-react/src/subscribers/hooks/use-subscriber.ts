import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { getSubscriber } from '../api/get-subscriber';
import { updateSubscriber } from '../api/update-subscriber';
import { Subscriber } from '../types';

export const useSubscriber = (id: string) => {
  const [isDraft, setIsDraft] = React.useState(false);

  const queryResult = useQuery(['subscribers', id], () => getSubscriber(id), {
    enabled: !isDraft
  });

  const mutation = useMutation(async (fields: Subscriber) => updateSubscriber(fields, id), {
    onSuccess: () => {
      setIsDraft(false);
    }
  });

  return { queryResult, mutation, setIsDraft };
};
