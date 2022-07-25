import * as express from "express";
import * as dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import { getRequiredEnv } from "./utils";

dotenv.config();

export const jsonParser = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  if (req.method === "POST" || req.method === "PATH") {
    express.json();
  }

  next();
};

export const airtableProxyPaths = ["/api/subscribers", "/api/campaigns"];

const airtableProxyOptions = {
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

export const airtableProxy = createProxyMiddleware(airtableProxyOptions);
