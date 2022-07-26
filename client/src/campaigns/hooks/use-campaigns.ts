import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from '../api/get-campaigns';
import { campaignsKeys } from '../campaigns-keys';

export const useCampaigns = () => useQuery(campaignsKeys.lists(), getCampaigns);
