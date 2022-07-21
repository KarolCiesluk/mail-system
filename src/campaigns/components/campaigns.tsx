import { Link } from 'react-router-dom';
import { useCampaigns } from '../hooks/use-campaigns';
import { useDeleteCampaign } from '../hooks/use-delete-campaign';

export const Campaigns = () => {
  const { isLoading, isError, data } = useCampaigns();
  const { mutate } = useDeleteCampaign();

  if (isLoading) {
    return <div>Loading…</div>;
  }

  if (isError) {
    return <div>Error!!!</div>;
  }

  return (
    <div>
      <h1>Campaigns</h1>

      <Link to="create">Create a new campaign</Link>

      <ul>
        {(data?.records || []).map(({ id, fields: { subject, content, status } }) => (
          <li key={id}>
            subject: {subject}, content: {content}, status: {status}
            {status === 'draft' && (
              <>
                <Link to="#">Edit</Link> <button onClick={() => mutate(id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
