"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airtableProxy = exports.airtableProxyPaths = void 0;
const dotenv = require("dotenv");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const utils_1 = require("./utils");
dotenv.config();
exports.airtableProxyPaths = ["/api/subscribers", "/api/campaigns"];
const airtableProxyOptions = {
    target: `${(0, utils_1.getRequiredEnv)("AIRTABLE_API_URL")}${(0, utils_1.getRequiredEnv)("AIRTABLE_BASE_KEY")}`,
    changeOrigin: true,
    headers: {
        Authorization: `Bearer ${(0, utils_1.getRequiredEnv)("AIRTABLE_API_KEY")}`,
    },
    pathRewrite: {
        "^/api/subscribers": "/subscribers",
        "^/api/campaigns": "/campaigns",
    },
};
exports.airtableProxy = (0, http_proxy_middleware_1.createProxyMiddleware)(airtableProxyOptions);
