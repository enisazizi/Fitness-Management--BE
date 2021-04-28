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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../types/errors");
const schema_1 = require("../company/schema");
const schema_2 = require("../clients/schema");
const jwt_1 = __importDefault(require("./jwt"));
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.company !== undefined) {
            yield req.company.save();
            res.clearCookie("token");
            res.cookie("isAuthCompany", false);
            // res.redirect(process.env.REDIRECT_LOGIN_URL);
            res.send("OK");
        }
    }
    catch (error) {
        console.log("logout error: ", error);
        next(error);
    }
});
const Clientlogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.client !== undefined) {
            yield req.client.save();
            res.clearCookie("token");
            res.cookie("isAuthCompany", false);
            // res.redirect(process.env.REDIRECT_LOGIN_URL);
            res.send("OK");
        }
    }
    catch (error) {
        console.log("logout error: ", error);
        next(error);
    }
});
const clientLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log(username);
        const client = yield schema_2.clientModel.findByCred(username, password);
        if (!(client === null || client === void 0 ? void 0 : client._id))
            return next(new errors_1.errorMessage("Invalid Credentials", 500));
        let token = jwt_1.default.generateToken(client._id);
        res.status(200).cookie("token", token, { httpOnly: true, sameSite: 'none', secure: true }).send("okej");
    }
    catch (error) {
        console.log("error", error.message);
        next(new errors_1.errorMessage(error.message, 500));
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const company = yield schema_1.companyModel.findByCred(email, password);
        if (!company)
            return next(new Error("Invalid Credentials"));
        const token = jwt_1.default.generateToken(company._id);
        res.cookie("token", token, { httpOnly: true, sameSite: 'none', secure: true });
        res.cookie("isAuthcompany", true);
        res.status(200).send(token);
    }
    catch (error) {
        console.log("Login error: ", error);
        next(new errors_1.errorMessage(error.message, 500));
    }
});
exports.default = {
    login,
    logout,
    clientLogin,
    Clientlogout,
};
