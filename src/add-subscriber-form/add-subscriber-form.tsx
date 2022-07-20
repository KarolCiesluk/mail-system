import { usePostSubscriber } from './hooks/use-post-subscriber';
import { SubscriberFormElement } from './types';

export const AddSubscriberForm = () => {
  const { mutate: postSubscriber } = usePostSubscriber();

  const submitForm = async (event: React.FormEvent<SubscriberFormElement>) => {
    event.preventDefault();

    const { name, email } = event.currentTarget.elements;
    postSubscriber({ name: name.value, email: email.value });
  };

  return (
    <form onSubmit={submitForm}>
      <h1>Add a new subscriber</h1>

      <label>
        Name
        <input required id="name" />
      </label>

      <label>
        Email
        <input required id="email" type="email" />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};
