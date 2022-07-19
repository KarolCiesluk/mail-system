import { Link } from 'react-router-dom';
import { useDeleteSubscriber } from './hooks/use-delete-subscriber';
import { useSubscribers } from './hooks/use-subscribers';

export const Subscribers = () => {
  const { isLoading, isError, isFetching, data: subscribers } = useSubscribers();
  const { mutate: deleteSubscriber } = useDeleteSubscriber();

  return (
    <div>
      <h1>Subscribers</h1>
      <Link to="add">Add new subscriber</Link>

      {isFetching && <p>Fetching…</p>}
      {isLoading && <div>Loading…</div>}
      {isError && <div>Error!!!</div>}

      {!!subscribers?.length && (
        <ul>
          {subscribers.map(({ id, createdTime, fields }) => (
            <li key={id}>
              name: {fields.name}, email: {fields.email}, created at: {createdTime}
              <Link to={`update/${id}`}>Update subscriber</Link>
              <button onClick={() => deleteSubscriber(id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
