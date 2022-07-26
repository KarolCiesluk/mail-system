import { useAddSubscriber } from '../hooks/use-add-subscriber';
import { SubscriberForm } from './subscriber-form';

export const SubscriberAddition = () => {
  const addSubscriber = useAddSubscriber();

  return <SubscriberForm title="Add subscriber" mutation={addSubscriber} />;
};
