import axios from 'axios';

export const sendCampaign = (formValues: { subject: string; content: string }) => {
  return axios.post('/api/mail', {
    subject: formValues.subject,
    content: formValues.content
  });
};
