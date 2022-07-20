import { useMutation } from '@tanstack/react-query';
import { createCampaign } from '../api/create-campaign';

export const useCreateCampaign = () => useMutation(createCampaign);
