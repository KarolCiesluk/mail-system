"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredEnv = void 0;
const getRequiredEnv = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable not found: ${key}`);
    }
    return value;
};
exports.getRequiredEnv = getRequiredEnv;
