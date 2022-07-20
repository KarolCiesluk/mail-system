import { useCampaigns } from './hooks/use-campaigns';

export const Campaigns = () => {
  const { isLoading, isError, data } = useCampaigns();

  if (isLoading) {
    return <div>Loading…</div>;
  }
  if (isError) {
    return <div>Error!!!</div>;
  }

  return (
    <div>
      <h1>Campaigns</h1>
      {JSON.stringify(data)}
    </div>
  );
};
