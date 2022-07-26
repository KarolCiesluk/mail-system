import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { Campaign } from '../types';
import { useForm } from 'react-hook-form';
import { useSendCampaign } from '../hooks/use-send-campaign';
import { CampaignResponse } from '../api/types';

interface CampaignFormProps {
  title: string;
  mutation: UseMutationResult<void, unknown, Campaign, unknown>;
  campaign?: UseQueryResult<CampaignResponse, unknown>;
}

export const CampaignForm = ({ title, mutation, campaign }: CampaignFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<Omit<Campaign, 'status'>>();

  const saveDraftCampaign = handleSubmit((formValues) => {
    mutation.mutate({ ...formValues, status: 'draft' });
  });

  const saveSentCampaign = handleSubmit((formValues) => {
    mutation.mutate({ ...formValues, status: 'sent' });
  });

  const sendCampaign = useSendCampaign({
    onError: saveDraftCampaign,
    onSuccess: saveSentCampaign
  });

  const handleSendCampaign = handleSubmit((formValues) => sendCampaign.mutate(formValues));

  const disableButtons = mutation.isLoading || sendCampaign.isLoading;

  if (campaign?.isLoading) {
    return <div>Loading…</div>;
  }

  if (campaign?.isError) {
    return <div>Error!!!</div>;
  }

  return (
    <div>
      <h1>{title}</h1>

      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="subject">
          Subject:
          <input
            id="subject"
            {...register('subject', { required: 'Subject is required' })}
            defaultValue={campaign?.data?.fields.subject}
          />
        </label>
        <p>{errors.subject?.message}</p>

        <label htmlFor="content">
          Content:
          <textarea
            id="content"
            {...register('content', { required: 'Content is required' })}
            defaultValue={campaign?.data?.fields.content}
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
