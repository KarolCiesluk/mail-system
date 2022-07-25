import axios from 'axios';

export const sendCampaign = async (formValues: { subject: string; content: string }) => {
  axios.post('/api/mail', {
    subject: formValues.subject,
    content: formValues.content
  });
};
