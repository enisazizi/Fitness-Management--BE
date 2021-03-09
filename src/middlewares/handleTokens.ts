import {Request,Response,NextFunction} from "express"


const handleTokens = async (req:Request, res:Response, next:NextFunction) => {
	try {
		const { token, refreshToken } = req.user.tokens;
		res.cookie("token", token, { httpOnly: true });
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			path: "/api/company/refreshToken",
		});
		res.cookie("isAuthUser", true);
		res.redirect(process.env.REDIRECT_URL);
	} catch (error) {
		console.log("Handle tokens error", error);
		next(error);
	}
};

export default {
    handleTokens
}
