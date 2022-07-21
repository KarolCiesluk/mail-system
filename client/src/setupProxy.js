const { createProxyMiddleware } = require("http-proxy-middleware");

const airtableProxy = {
  target: `${process.env.REACT_APP_API_URL}`,
  changeOrigin: true,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
  pathRewrite: {
    "^/api/subscribers": "/subscribers",
    "^/api/campaigns": "/campaigns",
  },
};

module.exports = function (app) {
  app.use(
    ["/api/subscribers", "/api/campaigns"],
    createProxyMiddleware(airtableProxy)
  );
};
