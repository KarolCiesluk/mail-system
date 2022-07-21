import { UseMutateFunction } from '@tanstack/react-query';

export interface Subscriber {
  name: string;
  email: string;
}

interface FormElement extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
}

export interface SubscriberFormElement extends HTMLFormElement {
  readonly elements: FormElement;
}

export interface SubscriberFormProps {
  submit: UseMutateFunction<void, unknown, Subscriber, unknown>;
  onInputChange?: React.Dispatch<React.SetStateAction<boolean>>;
  formData?: {
    initialValues: Subscriber;
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
  };
}
