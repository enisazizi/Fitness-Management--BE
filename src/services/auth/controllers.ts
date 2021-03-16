import { Request, Response, NextFunction } from "express";
import { errorMessage } from "../../types/errors";
import {authReq} from '../../types/general'
import {companyModel} from "../company/schema"
import jwtHandler  from './jwt';


const logout = async (req:authReq, res:Response, next:NextFunction) => {
	try {
		if (req.company !== undefined){
		await req.company.save();
		res.clearCookie("token")
		res.cookie("isAuthCompany", false)
		// res.redirect(process.env.REDIRECT_LOGIN_URL);
		res.send("OK");
		}
		
	} catch (error) {
		console.log("logout error: ", error);
		next(error);
	}
};

const clientLogin = async(req:Request, res:Response, next:NextFunction)=>{
	try {
		const {username,password} = req.body
		
	} catch (error) {
		next(error)
	}
}

const login = async (req:Request, res:Response, next:NextFunction) => {
	try {
		const { email, password } = req.body;
		const company = await companyModel.findByCred(email, password);
		if (!company) return next(new Error("Invalid Credentials"));
		const token = jwtHandler.generateToken(company._id);

		res.cookie("token", token, { httpOnly: true });
		res.cookie("isAuthcompany", true);
		res.status(200).send(token);
	} catch (error) {
		console.log("Login error: ", error);
		next(new errorMessage(error.message,500));
	}
};
export default {
    login,
    logout,
  };
