const {handleRefreshToken} = require("../../utils/auth/jwt")
import { Request, Response, NextFunction } from "express";
import {companyModel} from "../company/schema"
const { generateTokens } = require("../../utils/auth/jwt");
const refreshTokenHandler = async (req:Request, res:Response, next:NextFunction) => {
	try {
		const oldRefreshToken = req.cookies.refreshToken;
		console.log("old token is: ", oldRefreshToken);
		if (!oldRefreshToken)
			throw new Error( "Refresh token is missing");
		const newTokens = await handleRefreshToken(oldRefreshToken);

		res.cookie("token", newTokens.token);
		res.cookie("refreshToken", newTokens.refreshToken);
		res.send("OK");
	} catch (error) {
		console.log("Refresh token error", error);
		next(error);
	}
};

const logout = async (req:Request, res:Response, next:NextFunction) => {
	try {
		req.user.refreshTokens = [];
		await req.user.save();
		res.clearCookie("token")
		res.clearCookie("refreshToken")
		res.cookie("isAuthUser", false)
		// res.redirect(process.env.REDIRECT_LOGIN_URL);
		res.send("OK");
	} catch (error) {
		console.log("logout error: ", error);
		next(error);
	}
};

const login = async (req:Request, res:Response, next:NextFunction) => {
	try {
		const { email, password } = req.body;
		const user = await companyModel.findByCred(email, password);
		if (!user) return next(new Error("Invalid Credentials"));
		const tokens = await generateTokens(user);

		res.cookie("token", tokens.token, { httpOnly: true });
		res.cookie("refreshToken", tokens.refreshToken, {
			httpOnly: true,
			path: "/api/auth/refreshToken",
		});
		res.cookie("isAuthUser", true);
		res.status(200).send("Ok");
	} catch (error) {
		console.log("Login error: ", error);
		next(error);
	}
};
export default {
    login,
    logout,
    refreshTokenHandler
   
  };
