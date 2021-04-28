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
const schema_1 = require("../clients/schema");
const schema_2 = require("./schema");
const errors_1 = require("../../types/errors");
const newPayment = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const payment = new schema_2.paymentModel(Object.assign(Object.assign({}, req.body), { companyId: (_a = req.company) === null || _a === void 0 ? void 0 : _a._id }));
        yield payment.save();
        res.status(201).send(payment._id);
    }
    catch (error) {
        nex(new errors_1.errorMessage(error.message, 500));
    }
});
const getPayments = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const payments = yield schema_1.clientModel.find({ company_id: (_b = req.company) === null || _b === void 0 ? void 0 : _b._id });
        if (payments.length < 1)
            res.status(404).send("No payments made untill now");
        res.status(200).send(payments);
    }
    catch (error) {
        nex(new errors_1.errorMessage(error.message, 500));
    }
});
const getSinglePayment = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payment = yield schema_2.paymentModel.findById(id);
        res.status(200).send(payment);
    }
    catch (error) { }
});
const cancelPayment = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () { });
exports.default = { newPayment, getPayments, getSinglePayment };
