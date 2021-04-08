import {Request,Response,NextFunction,Application} from "express"
import {errorMessage as Error} from '../types/errors'

const badRequestHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
	if (err.httpStatus === 400) {
		res.status(400).json({
			success: false,
			errors: err.msg || "Bad Request",
		});
	}
	next(err);
};

const forbiddenError = (err:Error, req:Request, res:Response, next:NextFunction) => {
	if (err.httpStatus === 403) {
		res.status(400).json({
			success: false,
			errors: err.msg || "Forbidden",
		});
	}
	next(err);
};

const notFoundHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
	if (err.httpStatus === 404) {
		res.status(404).json({
			success: false,
			errors: err.msg || "Not Found",
		});
	}
	next(err);
};

const unauthorizedError = (err:Error, req:Request, res:Response, next:NextFunction) => {
	if (err.httpStatus === 401) {
		res.status(401).json({
			success: false,
			errors: err.msg || "Unauthorized",
		});
	}
	next(err);
};

const genericErrorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
	if (!res.headersSent) {
		res.status(err.httpStatus || 500).json({
			success: false,
			errors: err.msg || "Internal Server Error",
		});
	}
};

module.exports = (server:Application) => {
	server.use(badRequestHandler);
	server.use(notFoundHandler);
	server.use(forbiddenError);
	server.use(unauthorizedError);
	server.use(genericErrorHandler);
};
