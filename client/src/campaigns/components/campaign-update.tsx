import { useParams } from 'react-router-dom';
import { useCampaign } from '../hooks/use-campaign';
import { useUpdateCampaign } from '../hooks/use-update-campaign.ts';
import { CampaignForm } from './campaign-form';

export const CampaignUpdate = () => {
  const { campaignId } = useParams();
  const campaign = useCampaign(campaignId || '');
  const updateCampaign = useUpdateCampaign(campaignId || '');

  return <CampaignForm title="Campaign update" mutation={updateCampaign} campaign={campaign} />;
};
