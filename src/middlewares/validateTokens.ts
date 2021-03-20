import  verify  from "../services/auth/jwt"
import {Request,Response,NextFunction} from "express"
import {authReq} from '../types/general'
import {companyModel} from "../services/company/schema"
import {clientModel} from "../services/clients/schema"
import {errorMessage} from '../types/errors'





const validateToken = async (req:authReq, res:Response, next:NextFunction) => {
	try {
		console.log("validateToken")
		let token = req.cookies.token;
		
		const decoded = await verify.verifyJWT(token);
		if(decoded?.hasOwnProperty("_id")){
			console.log("decoded",decoded._id)
		}
	
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

const validateClient =async (req:authReq, res:Response, next:NextFunction) => {
	try {
		console.log("validateToken")
		if(req.client){
			console.log("req.client",req.client._id)
			let token = req.client.accessToken
			const decoded = await verify.verifyJWT(token);
			if(decoded?.hasOwnProperty("_id")){
				console.log("decoded",decoded._id)
			}
		
			const client = await clientModel.findOne({
				_id: decoded._id,
			}).select({password:0,__v:0})
			if (!client) {
				throw new Error( "Unauthorized");
			}
	
			req.token = token;
			req.client = client;
	
			next();
		}
		
		
	
	} catch (e) {
		next(new errorMessage( "Unauthorized",401));
	}
};

export default {validateClient,validateToken}