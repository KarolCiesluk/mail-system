import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getCampaign } from '../api/get-campaign';
import { updateCampaign } from '../api/update-campaign';
import { Campaign } from '../types';

export const useCampaign = (id: string) => {
  const [isDraft, setIsDraft] = useState(false);

  const queryResult = useQuery(['campaigns', id], () => getCampaign(id), {
    enabled: !isDraft
  });

  const mutation = useMutation((fields: Campaign) => updateCampaign(fields, id), {
    onSuccess: () => {
      setIsDraft(false);
    }
  });

  return { queryResult, mutation, setIsDraft };
};
