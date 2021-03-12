import { companyModel } from "./schema";
import { Response, NextFunction } from "express";
import { authReq as Request } from "../../types/general";
import { errorMessage } from "../../types/errors";

//errorMessage pranon nje string "Mesazhi i errorit" dhe numer "status code"

const newCompany = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const newCompany = new companyModel({
      ...req.body,
    });
    const { _id } = await newCompany.save();
    res.status(201).send(_id);
  } catch (error) {
    nex(new errorMessage(error.message,404));
  }
};
const getCompany = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const company = await companyModel
      .findById(req.params.id)
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
    let client = await companyModel.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).send(client);
  } catch (error) {
    nex(new errorMessage(error.message, 404));
  }
}
async function deleteCompany(req: Request, res: Response, nex: NextFunction) {
  if (req.params.id)
    try {
      let client = await companyModel.findByIdAndDelete(req.params.id);
      res.status(200).send(client);
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
