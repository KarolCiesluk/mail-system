export interface Campaign {
  content: string;
  subject: string;
  status: 'sent' | 'draft';
}

interface FormElement extends HTMLFormControlsCollection {
  subject: HTMLInputElement;
  content: HTMLTextAreaElement;
}

export interface CampaignFormElement extends HTMLFormElement {
  readonly elements: FormElement;
}
