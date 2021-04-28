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
const schema_1 = require("./schema");
const schema_2 = require("../cart/schema");
const jwt_1 = __importDefault(require("../auth/jwt"));
const newClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const companyId = (_a = req.company) === null || _a === void 0 ? void 0 : _a._id;
        const payload = req.body;
        const newClient = new schema_1.clientModel(Object.assign(Object.assign({}, req.body), { company_id: companyId }));
        const { _id } = yield newClient.save();
        yield new schema_2.cartModel({ clientId: _id }).save();
        const token = jwt_1.default.makePayment(_id, payload.time);
        if (token) {
            const addTokenPayment = yield schema_1.clientModel.findByIdAndUpdate(_id, {
                accessToken: token,
            });
            res.status(201).send(_id);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
const getClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const client = yield schema_1.clientModel.findById((_b = req.client) === null || _b === void 0 ? void 0 : _b._id);
        res.status(200).send(client);
    }
    catch (error) { }
});
// route for companies to get their clients
const getClients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const companyId = (_c = req.company) === null || _c === void 0 ? void 0 : _c._id;
        const clients = yield schema_1.clientModel.find({ company_id: companyId });
        res.status(200).send(clients);
    }
    catch (error) {
        next(error);
    }
});
const editClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const editClientInfo = yield schema_1.clientModel.findByIdAndUpdate((_d = req.client) === null || _d === void 0 ? void 0 : _d._id, {
            $set: Object.assign({}, req.body),
        }, { new: true });
        res.status(200).send(editClientInfo);
    }
    catch (error) {
        next(error);
    }
});
const deleteClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const deleteClientInfo = yield schema_1.clientModel.findByIdAndDelete((_e = req.client) === null || _e === void 0 ? void 0 : _e._id);
    res.status(200).send("Successfuly deleted");
});
exports.default = {
    newClient,
    getClients,
    getClient,
    editClient,
    deleteClient,
};
