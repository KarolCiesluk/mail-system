import * as express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

// import * as sgMail from "@sendgrid/mail";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
// const msg = {
//   to: "karolciesluk.db@gmail.com",
//   from: "karol.cc@wp.pl",
//   subject: "Hello {{name}}!",
//   text: "and -name- to do anywhere, even with Node.js",
//   html: "<strong>and {{name}} to do anywhere, even with Node.js</strong>",
//   substitutionWrappers: ["{{", "}}"],
//   substitutions: {
//     name: "Karol",
//   },
// };

app.use(express.static(path.resolve(__dirname, "../client/build")));

const airtableProxy = {
  target: `${process.env.API_URL}`,
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

app.get("*", (_req, res) => {
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log("Email sent");
  //   })
  //   .catch((error: unknown) => {
  //     console.error(error);
  //   });
  // console.log("send_grid_api_key: ", process.env.SENDGRID_API_KEY);
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
