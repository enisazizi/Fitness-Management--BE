import { Request, Response, NextFunction } from "express";
import { errorMessage } from "../../types/errors";
import { authReq } from "../../types/general";
import { companyModel } from "../company/schema";
import { clientModel } from "../clients/schema";
import jwt from "./jwt";

const logout = async (req: authReq, res: Response, next: NextFunction) => {
  try {
    if (req.company !== undefined) {
      await req.company.save();
      res.clearCookie("token");
      res.cookie("isAuthCompany", false);
      // res.redirect(process.env.REDIRECT_LOGIN_URL);
      res.send("OK");
    }
  } catch (error) {
    console.log("logout error: ", error);
    next(error);
  }
};

const clientLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    const client = await clientModel.findByCred(username, password);
    if (!client?._id) return next(new errorMessage("Invalid Credentials", 500));
    let token = jwt.generateToken(client._id);
    res.status(200).cookie("token", token).send(token);
  } catch (error) {
    console.log("error", error.message);
    next(new errorMessage(error.message, 500));
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const company = await companyModel.findByCred(email, password);
    if (!company) return next(new Error("Invalid Credentials"));
    const token = jwt.generateToken(company._id);
    res.cookie("token", token, { httpOnly: true });
    res.cookie("isAuthcompany", true);
    res.status(200).send(token);
  } catch (error) {
    console.log("Login error: ", error);
    next(new errorMessage(error.message, 500));
  }
};
export default {
  login,
  logout,
  clientLogin,
};
