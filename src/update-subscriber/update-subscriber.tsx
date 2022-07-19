import { useParams } from 'react-router-dom';

export const UpdateSubscriber = () => {
  const { subscriberId } = useParams();

  return <div>Update Subscriber id: {subscriberId}</div>;
};
