import * as express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import * as SendGridMail from "@sendgrid/mail";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as Airtable from "airtable";
import { Message, Subscriber } from "./types";
import { getRequiredEnv } from "./utils";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

const base = new Airtable({ apiKey: getRequiredEnv("AIRTABLE_API_KEY") }).base(
  getRequiredEnv("AIRTABLE_BASE_KEY")
);

SendGridMail.setApiKey(getRequiredEnv("SENDGRID_API_KEY"));

const buildMessage = ({
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

app.use(express.static(path.resolve(__dirname, "../client/build")));

const airtableProxy = {
  target: `${getRequiredEnv("AIRTABLE_API_URL")}${getRequiredEnv(
    "AIRTABLE_BASE_KEY"
  )}`,
  changeOrigin: true,
  headers: {
    Authorization: `Bearer ${getRequiredEnv("AIRTABLE_API_KEY")}`,
  },
  pathRewrite: {
    "^/api/subscribers": "/subscribers",
    "^/api/campaigns": "/campaigns",
  },
};

app.use(
  ["/api/subscribers", "/api/campaigns"],
  createProxyMiddleware(airtableProxy)
);

app.use(express.json());

const getSubscribers = async (): Promise<Subscriber[]> =>
  base("subscribers").select().all();

app.post("/mail", async (req, res) => {
  try {
    const subscribersData = await getSubscribers();

    await SendGridMail.send(
      buildMessage({ message: req.body, subscribersData })
    );

    res.send({ message: "udalo sie wysłać maile" });
  } catch (error) {
    res.status(500);
    console.log("error: ", error);
    res.send({ message: "Błąd wysyłania maili" });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
