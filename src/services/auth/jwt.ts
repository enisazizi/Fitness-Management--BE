import jwt from 'jsonwebtoken'
import {DecodedVerifyOpt} from "../../types/general"
import {companyModel} from "../../services/company/schema"
import {CompanyDoc} from "../../types/company"
const { JWT_SECRET } = process.env;

interface dec {
	_id:string;
	exp:string;
	iat:number;
}

const generateToken = (id:string):string | undefined => {
	try {
		const newAccessToken = jwt.sign({_id:id}, JWT_SECRET!, { expiresIn: "1d" })
		return newAccessToken;
	} catch (error) {
		console.log("JWT authenticate error: ", error);
		throw new Error(error);
	}
};

const verifyJWT = (token:string):Promise<dec|any> =>
	new Promise((res, rej) => {
		jwt.verify(token, JWT_SECRET!, (err, decoded) => {
			if (err) rej(err);
            if(decoded !== undefined) res(decoded);
		});
	});




export default{ generateToken, verifyJWT,}
