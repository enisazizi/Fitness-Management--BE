import {Request,Response,NextFunction, ErrorRequestHandler} from "express"
const badRequestHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
	if (err.httpStatusCode === 400) {
		res.status(400).json({
			success: false,
			errors: err.message || "Bad Request",
		});
	}
	next(err);
};

const forbiddenError = (err:any, req:Request, res:Response, next:NextFunction) => {
	if (err.httpStatusCode === 403) {
		res.status(400).json({
			success: false,
			errors: err.message || "Forbidden",
		});
	}
	next(err);
};

const notFoundHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
	if (err.httpStatusCode === 404) {
		res.status(404).json({
			success: false,
			errors: err.message || "Not Found",
		});
	}
	next(err);
};

const unauthorizedError = (err:any, req:Request, res:Response, next:NextFunction) => {
	if (err.httpStatusCode === 401) {
		res.status(401).json({
			success: false,
			errors: err.message || "Unauthorized",
		});
	}
	next(err);
};

const genericErrorHandler =(err:any, req:Request, res:Response, next:NextFunction) => {
	if (!res.headersSent) {
		res.status(err.httpStatusCode || 500).json({
			success: false,
			errors: err.message || "Internal Server Error",
		});
	}
};

module.exports = (app: any) => {
	app.use(badRequestHandler);
	app.use(notFoundHandler);
	app.use(forbiddenError);
	app.use(unauthorizedError);
	app.use(genericErrorHandler);
};
