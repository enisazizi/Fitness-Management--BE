import {Request,Response,NextFunction} from "express"


const handleTokens = async (req:Request, res:Response, next:NextFunction) => {
	try {
	
	} catch (error) {
		console.log("Handle tokens error", error);
		next(error);
	}
};

export default {
    handleTokens
}
