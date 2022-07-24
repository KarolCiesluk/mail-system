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
const sgMail = require("@sendgrid/mail");
const http_proxy_middleware_1 = require("http-proxy-middleware");
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = ({ subject, content }) => {
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
app.use(["/api/subscribers", "/api/campaigns"], (0, http_proxy_middleware_1.createProxyMiddleware)(airtableProxy));
app.use(express.json());
app.post("/mail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sgMail.send(msg(req.body));
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
