import jwt from 'jsonwebtoken'
import {companyModel} from "../../services/company/schema"
import {CompanyDoc} from "../../types/company"
const { JWT_REFRESH_SECRET, JWT_SECRET } = process.env;

const generateToken = (id:string):string | undefined => {
	try {
		const newAccessToken = jwt.sign({_id:id}, JWT_SECRET!, { expiresIn: "1d" })
		return newAccessToken;
	} catch (error) {
		console.log("JWT authenticate error: ", error);
		throw new Error(error);
	}
};
const verifyJWT = (token:string):Promise<jwt.VerifyErrors | jwt.DecodeOptions> =>
	new Promise((res, rej) => {
		jwt.verify(token, JWT_SECRET!, (err, decoded) => {
			if (err) rej(err);
            if(decoded !== undefined) res(decoded);
		});
	});


export default{ generateToken, verifyJWT}
