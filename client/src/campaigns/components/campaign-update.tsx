import { useParams } from 'react-router-dom';
import { useCampaign } from '../hooks/use-campaign';
import { useForm } from 'react-hook-form';
import { useSendCampaign } from '../hooks/use-send-campaign';
import { useUpdateCampaign } from '../hooks/use-update-campaign.ts';
import { Campaign } from '../types';

export const CampaignUpdate = () => {
  const { campaignId } = useParams();

  const campaign = useCampaign(campaignId || '');

  const updateCampaign = useUpdateCampaign(campaignId || '');

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<Omit<Campaign, 'status'>>();

  const saveSentCampaign = handleSubmit((formValues) => {
    updateCampaign.mutate({ ...formValues, status: 'sent' });
  });

  const saveDraftCampaign = handleSubmit((formValues) => {
    updateCampaign.mutate({ ...formValues, status: 'draft' });
  });

  const sendCampaign = useSendCampaign({
    onError: saveDraftCampaign,
    onSuccess: saveSentCampaign
  });

  const handleSendCampaign = handleSubmit((formValues) => sendCampaign.mutate(formValues));

  const disableButtons = updateCampaign.isLoading || sendCampaign.isLoading;

  if (campaign.isLoading) {
    return <div>Loading…</div>;
  }

  if (campaign.isError) {
    return <div>Error!!!</div>;
  }

  return (
    <div>
      <h1>Campaign update</h1>
      {campaign.isFetching && <div>Fetching…</div>}

      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="subject">
          Subject:
          <input
            id="subject"
            {...register('subject', { required: 'Subject is required' })}
            defaultValue={campaign.data?.fields.subject}
          />
        </label>
        <p>{errors.subject?.message}</p>

        <label htmlFor="content">
          Content:
          <textarea
            id="content"
            {...register('content', { required: 'Content is required' })}
            defaultValue={campaign.data?.fields.content}
          />
        </label>
        <p>{errors.content?.message}</p>

        <button onClick={saveDraftCampaign} type="submit" disabled={disableButtons}>
          Save
        </button>

        <button onClick={handleSendCampaign} type="submit" disabled={disableButtons}>
          Send
        </button>
      </form>
    </div>
  );
};
