import { useCreateCampaign } from '../hooks/use-create-campaign';
import { CampaignForm } from './campaign-form';

export const CampaignCreation = () => {
  const createCampaign = useCreateCampaign();

  return <CampaignForm title="Campaign creation" mutation={createCampaign} />;
};
