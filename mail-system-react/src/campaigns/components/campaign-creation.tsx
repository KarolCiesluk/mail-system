import { useCreateCampaign } from '../hooks/use-create-campaign';
import { CampaignFormElement } from '../types';

export const CampaignCreation = () => {
  const { mutate } = useCreateCampaign();

  const submitForm = (event: React.FormEvent<CampaignFormElement>) => {
    event.preventDefault();

    const { subject, content } = event.currentTarget.elements;
    mutate({ subject: subject.value, content: content.value, status: 'draft' });
  };

  return (
    <div>
      <h1>Campaign creation</h1>

      <form onSubmit={submitForm}>
        <label>
          Subject:
          <input id="subject" required />
        </label>

        <label>
          Content:
          <textarea id="content" required />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};
