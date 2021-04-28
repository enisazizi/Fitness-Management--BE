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
const schema_1 = require("./schema");
const errors_1 = require("../../types/errors");
const addProduct = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("hehe");
        if (!req.client)
            return;
        const addProduct = yield schema_1.cartModel.addProduct((_a = req.client) === null || _a === void 0 ? void 0 : _a._id, req.params.id);
        res.status(200).send({ succsess: true, productId: req.params.id });
    }
    catch (error) {
        nex(new errors_1.errorMessage(error.message, 500));
    }
});
const removeProduct = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!req.client)
            return;
        const addProduct = yield schema_1.cartModel.removeProduct((_b = req.client) === null || _b === void 0 ? void 0 : _b._id, req.params.id);
        res.status(200).send({ succsess: true, productId: req.params.id });
    }
    catch (error) {
        nex(new errors_1.errorMessage(error.message, 500));
    }
});
const calculateTotal = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        if (!req.client)
            return;
        const cart = yield schema_1.cartModel.calculateTotal((_c = req.client) === null || _c === void 0 ? void 0 : _c._id);
        res.status(200).send(cart);
    }
    catch (error) {
        nex(new errors_1.errorMessage(error.message, 500));
    }
});
const getCartProducts = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        if (!req.client)
            return;
        const cart = yield schema_1.cartModel.find({ clientId: (_d = req.client) === null || _d === void 0 ? void 0 : _d._id }).populate("products");
        res.status(200).send(cart);
    }
    catch (error) {
        nex(new errors_1.errorMessage(error.message, 500));
    }
});
const orderCart = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.client)
            return;
        console.log("hi");
        const cart = yield schema_1.cartModel.findOneAndUpdate({ clientId: req.client._id }, {
            products: []
        }, {
            new: true
        });
        res.status(200).send(cart);
    }
    catch (error) {
        nex(new errors_1.errorMessage(error.message, 500));
    }
});
exports.default = { addProduct, removeProduct, calculateTotal, getCartProducts, orderCart };
