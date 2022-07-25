import React from 'react';
import { useCreateCampaign } from '../hooks/use-create-campaign';
import { useSendCampaign } from '../hooks/use-send-campaign';

export const CampaignCreation = () => {
  const [formValues, setFormValues] = React.useState({
    subject: '',
    content: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
  };

  const createCampaign = useCreateCampaign();

  const saveCampaign = (status: 'draft' | 'sent' = 'draft') => {
    createCampaign.mutate({ subject: formValues.subject, content: formValues.content, status });
  };
  const saveDraftCampaign = () => saveCampaign('draft');
  const saveSentCampaign = () => saveCampaign('sent');

  const sendCampaign = useSendCampaign({
    onError: saveDraftCampaign,
    onSuccess: saveSentCampaign
  });

  return (
    <div>
      <h1>Campaign creation</h1>

      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          Subject:
          <input
            value={formValues.subject}
            onChange={handleChange}
            name="subject"
            id="subject"
            required
          />
        </label>

        <label>
          Content:
          <textarea
            value={formValues.content}
            onChange={handleChange}
            name="content"
            id="content"
            required
          />
        </label>

        <button onClick={saveDraftCampaign} type="submit">
          Save
        </button>

        <button
          onClick={() =>
            sendCampaign.mutate({
              subject: formValues.subject,
              content: formValues.content
            })
          }
          type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
