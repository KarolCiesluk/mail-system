const express = require("express");
const path = require("path");
require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT || 3001;

const app = express();

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
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
