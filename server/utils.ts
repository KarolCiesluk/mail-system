import { Message, Subscriber } from "./types";

export const getRequiredEnv = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable not found: ${key}`);
  }

  return value;
};

export const buildMessage = ({
  message: { subject, content },
  subscribersData,
}: {
  message: Message;
  subscribersData: Subscriber[];
}) => {
  const personalizations = subscribersData.map(
    ({ fields: { name, email } }) => ({
      to: email,
      substitutions: {
        name,
      },
    })
  );

  return {
    personalizations,
    from: getRequiredEnv("SENDER_EMAIL"),
    subject,
    text: content,
    substitutionWrappers: ["{{", "}}"],
  };
};
