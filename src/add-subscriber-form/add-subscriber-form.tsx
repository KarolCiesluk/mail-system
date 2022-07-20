import { SubscriberForm } from '../subscriber-form';
import { useAddSubscriber } from './hooks/use-add-subscriber';

export const AddSubscriberForm = () => {
  const { mutate } = useAddSubscriber();

  return <SubscriberForm submit={mutate} />;
};
