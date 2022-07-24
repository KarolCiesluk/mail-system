"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const SendGridMail = require("@sendgrid/mail");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const Airtable = require("airtable");
const utils_1 = require("./utils");
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
const base = new Airtable({ apiKey: (0, utils_1.getRequiredEnv)("AIRTABLE_API_KEY") }).base((0, utils_1.getRequiredEnv)("AIRTABLE_BASE_KEY"));
SendGridMail.setApiKey((0, utils_1.getRequiredEnv)("SENDGRID_API_KEY"));
const buildMessage = ({ message: { subject, content }, subscribersData, }) => {
    const personalizations = subscribersData.map(({ fields: { name, email } }) => ({
        to: email,
        substitutions: {
            name,
        },
    }));
    return {
        personalizations,
        from: (0, utils_1.getRequiredEnv)("SENDER_EMAIL"),
        subject,
        text: content,
        substitutionWrappers: ["{{", "}}"],
    };
};
app.use(express.static(path.resolve(__dirname, "../client/build")));
const airtableProxy = {
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
app.use(["/api/subscribers", "/api/campaigns"], (0, http_proxy_middleware_1.createProxyMiddleware)(airtableProxy));
app.use(express.json());
const getSubscribers = () => __awaiter(void 0, void 0, void 0, function* () { return base("subscribers").select().all(); });
app.post("/mail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscribersData = yield getSubscribers();
        yield SendGridMail.send(buildMessage({ message: req.body, subscribersData }));
        res.send({ message: "udalo sie wysłać maile" });
    }
    catch (error) {
        res.status(500);
        console.log("error: ", error);
        res.send({ message: "Błąd wysyłania maili" });
    }
}));
app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
