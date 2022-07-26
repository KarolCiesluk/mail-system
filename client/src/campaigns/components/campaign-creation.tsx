import { useCreateCampaign } from '../hooks/use-create-campaign';
import { useSendCampaign } from '../hooks/use-send-campaign';
import { useForm } from 'react-hook-form';
import { Campaign } from '../types';

export const CampaignCreation = () => {
  const createCampaign = useCreateCampaign();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<Omit<Campaign, 'status'>>();

  const saveDraftCampaign = handleSubmit((formValues) => {
    createCampaign.mutate({ ...formValues, status: 'draft' });
  });

  const saveSentCampaign = handleSubmit((formValues) => {
    createCampaign.mutate({ ...formValues, status: 'sent' });
  });

  const sendCampaign = useSendCampaign({
    onError: saveDraftCampaign,
    onSuccess: saveSentCampaign
  });

  const handleSendCampaign = handleSubmit((formValues) => sendCampaign.mutate(formValues));

  const disableButtons = createCampaign.isLoading || sendCampaign.isLoading;

  return (
    <div>
      <h1>Campaign creation</h1>

      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="subject">
          Subject:
          <input id="subject" {...register('subject', { required: 'Subject is required' })} />
        </label>
        <p>{errors.subject?.message}</p>

        <label htmlFor="content">
          Content:
          <textarea id="content" {...register('content', { required: 'Content is required' })} />
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
