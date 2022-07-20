import { UseMutateFunction } from '@tanstack/react-query';

interface FormElement extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
}

export interface SubscriberFormElement extends HTMLFormElement {
  readonly elements: FormElement;
}

export interface SubscriberFormProps {
  submit: UseMutateFunction<
    void,
    unknown,
    {
      name: string;
      email: string;
    },
    unknown
  >;
  onInputChange?: React.Dispatch<React.SetStateAction<boolean>>;
  formData?: {
    initialValues: { name: string; email: string };
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
  };
}
