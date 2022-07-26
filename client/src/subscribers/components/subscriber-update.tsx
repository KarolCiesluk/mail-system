import { useParams } from 'react-router-dom';

import { useSubscriber } from '../hooks/use-subscriber';
import { useUpdateSubscriber } from '../hooks/use-update-subscriber';
import { SubscriberForm } from './subscriber-form';

export const SubscriberUpdate = () => {
  const { subscriberId } = useParams();
  const subscriber = useSubscriber(subscriberId || '');
  const updateSubscriber = useUpdateSubscriber(subscriberId || '');

  return (
    <SubscriberForm title="Subscriber update" mutation={updateSubscriber} subscriber={subscriber} />
  );
};
