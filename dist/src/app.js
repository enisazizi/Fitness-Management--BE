"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const services_1 = __importDefault(require("./services"));
const cookieParser = require("cookie-parser");
const cors_1 = __importDefault(require("cors"));
const app = express();
app.set("trust proxy", 1);
app.enable("trust proxy");
const whitelist = [process.env.REDIRECT_URL];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, //Allow cookie
};
app.use(express.json());
app.use(cors_1.default(corsOptions));
app.use(cookieParser());
app.use("/api", services_1.default);
require("./middlewares/errorHandling")(app);
exports.default = app;
