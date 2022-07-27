import { Subscriber, SubscriberResponse } from '../types';
import { useForm } from 'react-hook-form';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

export interface SubscriberFormProps {
  title: string;
  mutation: UseMutationResult<AxiosResponse<unknown, unknown>, unknown, Subscriber, unknown>;
  subscriber?: UseQueryResult<SubscriberResponse, unknown>;
}

export const SubscriberForm = ({ title, mutation, subscriber }: SubscriberFormProps) => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<Subscriber>();

  const submit = handleSubmit(({ name, email }) =>
    mutation.mutate(
      { name, email },
      {
        onSuccess: () => {
          navigate('/subscribers');
        }
      }
    )
  );

  if (subscriber?.isLoading) {
    return <div>Loading…</div>;
  }

  if (subscriber?.isError) {
    return <div>Error!!!</div>;
  }

  return (
    <form onSubmit={submit}>
      {subscriber?.isFetching && <span>Fetching…</span>}
      <h1>{title}</h1>

      <label htmlFor="name">
        Name
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
          defaultValue={subscriber?.data.fields.name}
          required
        />
      </label>
      <p>{errors.name?.message}</p>

      <label htmlFor="email">
        Email
        <input
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format'
            }
          })}
          defaultValue={subscriber?.data.fields.email}
        />
      </label>
      <p>{errors.email?.message}</p>

      <button type="submit" disabled={mutation.isLoading}>
        Submit
      </button>
    </form>
  );
};
