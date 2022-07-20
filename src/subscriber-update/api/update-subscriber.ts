import axios from 'axios';

export const updateSubscriber = async (
  data: { name: string; email: string },
  subscriberId?: string
) => {
  if (!subscriberId) {
    return;
  }

  await axios.patch(`/api/subscribers/${subscriberId}`, {
    fields: data
  });
};
