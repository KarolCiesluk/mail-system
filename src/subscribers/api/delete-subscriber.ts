export const deleteSubscriber = async (id: string) => {
  await fetch(`${process.env.REACT_APP_API_URL}subscribers/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    },
    method: 'DELETE'
  });
};
