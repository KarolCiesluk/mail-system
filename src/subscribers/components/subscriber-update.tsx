import { useParams } from 'react-router-dom';

import { useSubscriber } from '../hooks/use-subscriber';
import { SubscriberForm } from './subscriber-form';

export const SubscriberUpdate = () => {
  const { subscriberId } = useParams();
  const {
    queryResult: { isError, isFetching, isLoading, data },
    mutation: { mutate },
    setIsDraft
  } = useSubscriber(subscriberId || '');

  return (
    <SubscriberForm
      formData={{
        initialValues: {
          name: data?.fields.name || '',
          email: data?.fields.email || ''
        },
        isLoading,
        isError,
        isFetching
      }}
      submit={mutate}
      onInputChange={setIsDraft}
    />
  );
};
