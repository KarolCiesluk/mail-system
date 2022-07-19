import React from 'react';
import { Link } from 'react-router-dom';

interface Subscriber {
  id: number;
  createdTime: string;
  fields: { name: string; email: string };
}

export const Subscribers = () => {
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading');
  const [subscribers, setSubscribers] = React.useState<Subscriber[] | null>(null);

  const fetchSubscribers = React.useCallback(async () => {
    setStatus('loading');
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}subscribers?maxRecords=3&view=Grid%20view`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message, { cause: error.error.type });
      }

      const data: {
        records: {
          id: number;
          createdTime: string;
          fields: { name: string; email: string };
        }[];
      } = await response.json();

      setStatus('success');
      setSubscribers(data.records);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }, []);

  React.useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  return (
    <div>
      <h1>Subscribers</h1>
      <Link to="add">Add new subscriber</Link>

      {status === 'loading' && <div>Loading…</div>}

      {status === 'error' && <div>Error!!!</div>}

      {!!subscribers?.length && (
        <ul>
          {subscribers.map(({ id, createdTime, fields }) => (
            <li key={id}>
              name: {fields.name}, email: {fields.email}, created at: {createdTime}
              <Link to={`update/${id}`}>Update subscriber</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
