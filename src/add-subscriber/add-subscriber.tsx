interface FormElement extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
}

interface SubscriberFormElement extends HTMLFormElement {
  readonly elements: FormElement;
}

export const AddSubscriber = () => {
  const submitForm = async (event: React.FormEvent<SubscriberFormElement>) => {
    event.preventDefault();

    const { name, email } = event.currentTarget.elements;

    try {
      await fetch(`${process.env.REACT_APP_API_URL}subscribers`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        method: 'POST',
        body: JSON.stringify({ fields: { name: name.value, email: email.value } })
      });
    } catch (error) {
      console.error(error);
    }
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
