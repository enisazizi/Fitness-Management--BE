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
exports.companyModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const companySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    image: String,
    license_id: String,
});
companySchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.password != undefined) {
            const validation = yield exports.companyModel.findOne({ email: this.email });
            if (validation) {
                const err = new Error();
                err.message = "EMAIL ALREADY EXISTS";
                next(err);
                return;
            }
            const checkPw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
            const validPw = this.password.match(checkPw);
            if (validPw) {
                const encryptedPassword = yield bcrypt_1.default.hash(this.password, 2);
                this.password = encryptedPassword;
                this.email.toLowerCase();
                next();
            }
            else {
                const err = new Error();
                err.message = "THE PASSWORD YOU PROVIDED IS NOT A SAFE PASSWORD";
                next(err);
            }
        }
        else {
            const err = new Error();
            err.message = "You must provide a password";
            next(err);
        }
    });
});
companySchema.statics.findByCred = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let Company = yield this.findOne({ email });
            if (!(Company === null || Company === void 0 ? void 0 : Company.password))
                throw new Error("Company not found !!!");
            const doesMatch = yield bcrypt_1.default.compare(password, Company.password);
            if (!doesMatch) {
                const err = new Error();
                err.message = "Unable to Login,check Credentials";
                throw err;
            }
            else {
                const { name, password, business_id, license_id, email, _id, image, } = Company;
                return Object.freeze({
                    name,
                    business_id,
                    license_id,
                    email,
                    _id,
                    image,
                });
            }
        }
        catch (error) {
            error.message = "Exception while finding user";
            throw error;
        }
    });
};
companySchema.statics.updateStatus = function (id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let Company = yield this.findByIdAndUpdate(id, { status });
            if (Company)
                return Company;
        }
        catch (error) {
            throw error;
        }
    });
};
exports.companyModel = mongoose_1.model("Company", companySchema);
