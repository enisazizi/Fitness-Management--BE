const { verifyJWT } = require("../utils/auth/jwt");
import {Request,Response,NextFunction} from "express"
import {authReq} from '../types/general'
import {companyModel} from "../services/company/schema"
import {errorMessage} from '../types/errors'







const validateToken = async (req:authReq, res:Response, next:NextFunction) => {
	try {
		let token = req.cookies.token;

		const decoded = await verifyJWT(token);

		const company = await companyModel.findOne({
			_id: decoded._id,
		}).select({password:0,__v:0})
		if (!company) {
			throw new Error( "Unauthorized");
		}

		req.token = token;
		req.company = company;

		next();
	} catch (e) {
		next(new errorMessage( "Unauthorized",401));
	}
};

module.exports = { validateToken };
