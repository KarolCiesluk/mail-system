import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useCreateCampaign } from '../hooks/use-create-campaign';
import { CampaignFormElement } from '../types';

const sendCampaign = async (formValues: { subject: string; content: string }) => {
  axios.post('/mail', {
    subject: formValues.subject,
    content: formValues.content
  });
};

const useSendCampaign = ({ onError, onSuccess }: { onError: () => void; onSuccess: () => void }) =>
  useMutation(sendCampaign, {
    onError,
    onSuccess
  });

export const CampaignCreation = () => {
  const [formValues, setFormValues] = React.useState({
    subject: '',
    content: ''
  });

  console.log('formValues: ', formValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
  };

  const { mutate } = useCreateCampaign();

  const submitForm = (event: React.FormEvent<CampaignFormElement>) => {
    event.preventDefault();
  };

  const saveCampaign = (status: 'draft' | 'sent' = 'draft') => {
    console.log('saving');
    mutate({ subject: formValues.subject, content: formValues.content, status });
  };

  const saveCampaignDraft = () => {
    saveCampaign('draft');
  };

  const saveCompletedCampaign = () => {
    saveCampaign('sent');
  };

  const mutation = useSendCampaign({
    onError: saveCampaignDraft,
    onSuccess: saveCompletedCampaign
  });

  return (
    <div>
      <h1>Campaign creation</h1>

      <form onSubmit={submitForm}>
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

        <button onClick={saveCampaignDraft} name="save" type="submit">
          Save
        </button>
        <button
          onClick={() =>
            mutation.mutate({ subject: formValues.subject, content: formValues.content })
          }
          name="send"
          type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
