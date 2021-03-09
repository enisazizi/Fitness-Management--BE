const { verifyJWT } = require("../utils/auth/jwt");
import {Request,Response,NextFunction} from "express"
import {companyModel} from "../services/company/schema"
const validateToken = async (req:Request, res:Response, next:NextFunction) => {
	try {
		let token = req.cookies.token;

		const decoded = await verifyJWT(token);

		const user = await companyModel.findOne({
			_id: decoded._id,
		})
			.populate({
				path: "followers",
				select: "-refreshTokens -__v -password",
			})
			.populate({
				path: "following",
				select: "-refreshTokens -__v -password",
			});

		if (!user) {
			throw new Error( "Unauthorized");
		}

		req.token = token;
		req.user = user;

		next();
	} catch (e) {
		next(new Error( "Unauthorized"));
	}
};

module.exports = { validateToken };
