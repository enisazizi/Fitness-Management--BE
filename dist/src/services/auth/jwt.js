"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = '12341234123';
const generateToken = (id) => {
    try {
        const newAccessToken = jsonwebtoken_1.default.sign({ _id: id }, JWT_SECRET, { expiresIn: "1d" });
        return newAccessToken;
    }
    catch (error) {
        console.log("JWT authenticate error: ", error);
        throw new Error(error);
    }
};
const verifyJWT = (token) => new Promise((res, rej) => {
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err)
            rej(err);
        if (decoded !== undefined)
            res(decoded);
    });
});
const makePayment = (id, payLife) => {
    try {
        const accessToken = jsonwebtoken_1.default.sign({ _id: id }, JWT_SECRET, { expiresIn: payLife });
        return accessToken;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.default = { generateToken, verifyJWT, makePayment };
