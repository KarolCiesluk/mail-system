import { SubscriberFormElement, SubscriberFormProps } from '../types';

export const SubscriberForm = ({ submit, onInputChange, formData }: SubscriberFormProps) => {
  const submitForm = async (event: React.FormEvent<SubscriberFormElement>) => {
    event.preventDefault();

    const { name, email } = event.currentTarget.elements;
    submit({ name: name.value, email: email.value });
  };

  if (formData?.isLoading) {
    return <div>Loading…</div>;
  }
  if (formData?.isError) {
    return <div>Error!!!</div>;
  }
  return (
    <form onSubmit={submitForm}>
      {formData?.isFetching && <span>Fetching…</span>}
      <h1>Update subscriber</h1>

      <label>
        Name
        <input
          {...(onInputChange && { onChange: () => onInputChange(true) })}
          defaultValue={formData?.initialValues.name}
          required
          id="name"
        />
      </label>

      <label>
        Email
        <input
          {...(onInputChange && { onChange: () => onInputChange(true) })}
          defaultValue={formData?.initialValues.email}
          required
          id="email"
          type="email"
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};
