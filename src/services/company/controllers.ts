import { companyModel } from "./schema";
import { Response, NextFunction } from "express";
import {authReq as Request} from '../../types/general'

const newCompany = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    
    const newCompany = new companyModel({
      ...req.body,
    });
    const { _id } = await newCompany.save();
    res.status(201).send(_id);
  } catch (error) {
    nex(error);
  }
};
const getCompany = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    
    res.status(200).send(req.company)
  } catch (error) {
    nex(error)
  }
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