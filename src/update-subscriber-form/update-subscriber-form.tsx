import { useParams } from 'react-router-dom';

export const UpdateSubscriberForm = () => {
  const { subscriberId } = useParams();

  return <div>Update Subscriber id: {subscriberId}</div>;
};
