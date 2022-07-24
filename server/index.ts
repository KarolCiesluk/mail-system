import * as express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import * as sgMail from "@sendgrid/mail";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const msg = ({ subject, content }: { subject: string; content: string }) => {
  return {
    personalizations: [
      {
        to: "karolciesluk.db@gmail.com",
        substitutions: {
          name: "Karol",
        },
      },
      {
        to: "karol.ciesluk@kruko.io",
        substitutions: {
          name: "Kruko",
        },
      },
    ],
    from: "karol.cc@wp.pl",
    subject,
    text: content,
    substitutionWrappers: ["{{", "}}"],
    substitutions: {
      name: "Karol",
    },
  };
};

app.use(express.static(path.resolve(__dirname, "../client/build")));

const airtableProxy = {
  target: process.env.API_URL,
  changeOrigin: true,
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
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

app.post("/mail", async (req, res) => {
  try {
    await sgMail.send(msg(req.body));
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
