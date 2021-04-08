import verify from "../services/auth/jwt";
import { Response, NextFunction } from "express";
import { authReq as Request } from "../types/general";
import { companyModel } from "../services/company/schema";
import { clientModel } from "../services/clients/schema";
import { errorMessage } from "../types/errors";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.cookies.token;

    const decoded = await verify.verifyJWT(token);
    if (decoded?.hasOwnProperty("_id")) {
      const company = await companyModel
        .findOne({
          _id: decoded._id,
        })
        .select({ password: 0, __v: 0 });
      if (!company) {
        throw new Error("Unauthorized");
      }

      req.token = token;
      req.company = company;

      next();
      return;
    }
    next(new errorMessage("Unauthorized", 401));
  } catch (e) {
    next(new errorMessage("Unauthorized", 401));
  }
};

const validateClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    const decoded = await verify.verifyJWT(token);
    if (!decoded?.hasOwnProperty("_id")) return;
    const client = await clientModel
      .findOne({
        _id: decoded._id,
      })
      .select({ password: 0, __v: 0 });
    if (!client) {
      throw new Error("Unauthorized");
    }

    req.token = token;
    req.client = client;
    next();
  } catch (e) {
    next(new errorMessage("Unauthorized", 401));
  }
};

export default { validateClient, validateToken };
