import { SubscriberForm } from '../subscriber-form';
import { useAddSubscriber } from './hooks/use-add-subscriber';

export const SubscriberAddition = () => {
  const { mutate } = useAddSubscriber();

  return <SubscriberForm submit={mutate} />;
};
