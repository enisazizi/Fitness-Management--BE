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
exports.clientModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const clientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String },
    company_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Company", required: true },
    password: { type: String },
    username: { type: String, unique: true },
    accessToken: { type: String },
    cart: [
        {
            total: Number,
            product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 },
        },
    ],
    image: String,
});
clientSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.password != undefined) {
            const validation = yield exports.clientModel.findOne({ username: this.username });
            if (!validation) {
                const checkPw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/; //Check if pw has a number,lowercase and uppercase
                const validPw = this.password.match(checkPw);
                if (validPw) {
                    const encryptedPassword = yield bcrypt_1.default.hash(this.password, 8);
                    this.password = encryptedPassword;
                    this.username = this.username.toLowerCase();
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
                err.message = "USERNAME ALREADY EXISTS";
                next(err);
            }
        }
        else {
            const err = new Error();
            err.message = "PASSWORD MUST HAVE MORE THAN 8 CHARACTERS";
            next(err);
        }
    });
});
//FINDS CLIENT BY USERNAME/EMAIL AND PASSWORD
clientSchema.statics.findByCred = function (username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let Client = yield this.findOne({ username });
            if (!(Client === null || Client === void 0 ? void 0 : Client.password))
                return;
            const doesMatch = yield bcrypt_1.default.compare(password, Client.password);
            if (!doesMatch) {
                const err = new Error();
                err.message = "Unable to Login,check Crendetials";
                throw err;
            }
            delete Client.password;
            return Client;
        }
        catch (error) {
            error.mesage = "Exception while finding client";
            throw error;
        }
    });
};
//CART MANOVER
exports.clientModel = mongoose_1.model("Client", clientSchema);
