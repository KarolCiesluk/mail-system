import { useAddSubscriber } from '../hooks/use-add-subscriber';
import { SubscriberForm } from './subscriber-form';

export const SubscriberAddition = () => {
  const { mutate } = useAddSubscriber();

  return <SubscriberForm submit={mutate} />;
};
