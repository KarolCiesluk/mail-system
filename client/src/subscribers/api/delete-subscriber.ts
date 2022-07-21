import axios from 'axios';

export const deleteSubscriber = async (id: string) => {
  await axios.delete(`/api/subscribers/${id}`);
};
