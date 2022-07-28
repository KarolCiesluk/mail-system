import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { campaignsKeys } from '../campaigns-keys';
import { CampaignResponse } from '../types';

export const getCampaign = async ({
  queryKey: [{ id }]
}: QueryFunctionContext<ReturnType<typeof campaignsKeys['detail']>>) => {
  const { data } = await axios.get<CampaignResponse>(`/api/campaigns/${id}`);

  return data;
};
