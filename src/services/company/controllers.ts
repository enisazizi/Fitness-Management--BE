import { companyModel } from "./schema";
import { Response, NextFunction } from "express";
import {authReq as Request} from '../../types/general'

const newCompany = async (req: Request, res: Response, nex: NextFunction) => {
    try {
        const { email, username } = req.body;
        const foundUserwithEmail = await companyModel.findOne({ email });
        const foundUserwithUsername = await companyModel.findOne({ username });
        if(foundUserwithEmail)
            throw new Error("Email already exist")
            if(foundUserwithUsername) throw new Error("username already exist")
          const newCompany = new companyModel({
             
              ...req.body,
          })
          const {_id} = await newCompany.save()
          res.status(201).send(_id)
      } catch (error) {
          nex(error)
      }
};
const getCompany = async (req: Request, res: Response, nex: NextFunction) => {
  try {
   
  } catch (error) {}
};

const getAllCompanies = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
  } catch (error) {}
};

const editCompany = async (req: Request, res: Response, nex: NextFunction) => {
  try {
  } catch (error) {}
};

const deleteCompany = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
  } catch (error) {}
};
const profilePicture = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
  } catch (error) {}
};

const deletePicture = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
  } catch (error) {}
};

export default {
  newCompany,
  getCompany,
  getAllCompanies,
  editCompany,
  deleteCompany,
};