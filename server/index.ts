import * as express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import * as SendGridMail from "@sendgrid/mail";
import * as Airtable from "airtable";
import { Subscriber } from "./types";
import { buildMessage, getRequiredEnv } from "./utils";
import { airtableProxy, airtableProxyPaths, jsonParser } from "./middleware";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(jsonParser);

const base = new Airtable({ apiKey: getRequiredEnv("AIRTABLE_API_KEY") }).base(
  getRequiredEnv("AIRTABLE_BASE_KEY")
);

SendGridMail.setApiKey(getRequiredEnv("SENDGRID_API_KEY"));

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

app.use(airtableProxyPaths, airtableProxy);

app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
