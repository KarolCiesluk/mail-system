"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const http_proxy_middleware_1 = require("http-proxy-middleware");
dotenv.config();
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
app.use(["/api/subscribers", "/api/campaigns"], (0, http_proxy_middleware_1.createProxyMiddleware)(airtableProxy));
app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
