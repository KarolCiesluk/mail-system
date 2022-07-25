"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMessage = exports.getRequiredEnv = void 0;
const getRequiredEnv = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable not found: ${key}`);
    }
    return value;
};
exports.getRequiredEnv = getRequiredEnv;
const buildMessage = ({ message: { subject, content }, subscribersData, }) => {
    const personalizations = subscribersData.map(({ fields: { name, email } }) => ({
        to: email,
        substitutions: {
            name,
        },
    }));
    return {
        personalizations,
        from: (0, exports.getRequiredEnv)("SENDER_EMAIL"),
        subject,
        text: content,
        substitutionWrappers: ["{{", "}}"],
    };
};
exports.buildMessage = buildMessage;
