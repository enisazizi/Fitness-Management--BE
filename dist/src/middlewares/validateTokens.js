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
const jwt_1 = __importDefault(require("../services/auth/jwt"));
const schema_1 = require("../services/company/schema");
const schema_2 = require("../services/clients/schema");
const errors_1 = require("../types/errors");
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.cookies.token;
        const decoded = yield jwt_1.default.verifyJWT(token);
        if (decoded === null || decoded === void 0 ? void 0 : decoded.hasOwnProperty("_id")) {
            const company = yield schema_1.companyModel
                .findOne({
                _id: decoded._id,
            })
                .select({ password: 0, __v: 0 });
            if (!company) {
                throw new Error("Unauthorized");
            }
            req.token = token;
            req.company = company;
            next();
            return;
        }
        next(new errors_1.errorMessage("Unauthorized", 401));
    }
    catch (e) {
        next(new errors_1.errorMessage("Unauthorized", 401));
    }
});
const validateClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const decoded = yield jwt_1.default.verifyJWT(token);
        if (!(decoded === null || decoded === void 0 ? void 0 : decoded.hasOwnProperty("_id")))
            return;
        const client = yield schema_2.clientModel
            .findOne({
            _id: decoded._id,
        })
            .select({ password: 0, __v: 0 });
        if (!client) {
            throw new Error("Unauthorized");
        }
        req.token = token;
        req.client = client;
        next();
    }
    catch (e) {
        next(new errors_1.errorMessage("Unauthorized", 401));
    }
});
exports.default = { validateClient, validateToken };
