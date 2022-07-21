import { useParams } from 'react-router-dom';
import { useCampaign } from '../hooks/use-campaign';
import { CampaignFormElement } from '../types';

export const CampaignUpdate = () => {
  const { campaignId } = useParams();
  const {
    queryResult: { isLoading, isError, isFetching, data },
    mutation: { mutate },
    setIsDraft
  } = useCampaign(campaignId || '');

  const submitForm = (event: React.FormEvent<CampaignFormElement>) => {
    event.preventDefault();

    const { subject, content } = event.currentTarget.elements;
    mutate({ subject: subject.value, content: content.value, status: 'draft' });
  };

  if (isLoading) {
    return <div>Loading…</div>;
  }

  if (isError) {
    return <div>Error!!!</div>;
  }

  return (
    <div>
      <h1>Campaign update</h1>
      {isFetching && <div>Fetching…</div>}

      <form onSubmit={submitForm} onChange={() => setIsDraft(true)}>
        <label>
          Subject:
          <input defaultValue={data?.fields.subject} id="subject" required />
        </label>

        <label>
          Content:
          <textarea defaultValue={data?.fields.content} id="content" required />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};
