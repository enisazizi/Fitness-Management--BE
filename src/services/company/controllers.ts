import { companyModel } from "./schema";
import { Response, NextFunction } from "express";
import { authReq as Request } from "../../types/general";
import { errorMessage } from "../../types/errors";

const newCompany = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const newCompany = new companyModel({
      ...req.body,
    });
    const { _id } = await newCompany.save();
    res.status(201).send(_id);
  } catch (error) {
    nex(new errorMessage(error.message, 500));
  }
};

const getCompany = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    if (!req.company?.id) return;
    const company = await companyModel
      .findById(req.company?._id)
      .select({ password: 0, __v: 0 });
    res.status(200).send(company);
  } catch (error) {
    nex(new errorMessage(error.message, 404));
  }
};

const getAllCompanies = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
    const allCompanies = await companyModel.find();
    res.send(allCompanies);
  } catch (error) {
    nex(new errorMessage(error.message, 404));
  }
};

async function editCompany(req: Request, res: Response, nex: NextFunction) {
  try {
    delete req.body.password;
    let company = await companyModel.findByIdAndUpdate(
      req.company?._id,
      req.body
    );
    const update = { updated: req.body };
    res.status(200).send(update);
  } catch (error) {
    nex(new errorMessage(error.message, 404));
  }
}
async function deleteCompany(req: Request, res: Response, nex: NextFunction) {
  if (!req.company?._id) return;
  try {
    let company = await companyModel.findByIdAndDelete(req.params.id);
    res.status(200).send(company);
  } catch (error) {
    console.log(error);
    nex(new errorMessage(error.message, 400));
  }
}

export default {
  newCompany,
  getCompany,
  getAllCompanies,
  editCompany,
  deleteCompany,
};
