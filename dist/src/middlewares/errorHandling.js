"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const badRequestHandler = (err, req, res, next) => {
    if (err.httpStatus === 400) {
        res.status(400).json({
            success: false,
            errors: err.msg || "Bad Request",
        });
    }
    next(err);
};
const forbiddenError = (err, req, res, next) => {
    if (err.httpStatus === 403) {
        res.status(400).json({
            success: false,
            errors: err.msg || "Forbidden",
        });
    }
    next(err);
};
const notFoundHandler = (err, req, res, next) => {
    if (err.httpStatus === 404) {
        res.status(404).json({
            success: false,
            errors: err.msg || "Not Found",
        });
    }
    next(err);
};
const unauthorizedError = (err, req, res, next) => {
    if (err.httpStatus === 401) {
        res.status(401).json({
            success: false,
            errors: err.msg || "Unauthorized",
        });
    }
    next(err);
};
const genericErrorHandler = (err, req, res, next) => {
    if (!res.headersSent) {
        res.status(err.httpStatus || 500).json({
            success: false,
            errors: err.msg || "Internal Server Error",
        });
    }
};
module.exports = (server) => {
    server.use(badRequestHandler);
    server.use(notFoundHandler);
    server.use(forbiddenError);
    server.use(unauthorizedError);
    server.use(genericErrorHandler);
};
