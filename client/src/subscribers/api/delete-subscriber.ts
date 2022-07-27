import axios from 'axios';

export const deleteSubscriber = (id: string) => axios.delete(`/api/subscribers/${id}`);
