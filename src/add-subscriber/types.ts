interface FormElement extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
}

export interface SubscriberFormElement extends HTMLFormElement {
  readonly elements: FormElement;
}
