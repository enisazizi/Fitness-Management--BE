import { Schema, model } from "mongoose";
import {
  Company,
  CompanyDoc,
  CompanyDocument,
  CompanyModel,
} from "../../types/company";
import bcrypt from "bcrypt";

const companySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  image: String,
  company_id:String,
  business_id: { type: String, required: true },
  license_id: { type: String, required: true },
})

companySchema.pre<CompanyDoc>("save", async function (next) {
  if (this.password != undefined) {
    const validation = await companyModel.findOne({ email: this.email });

    if (!validation) {
      const checkPw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/; //Check if pw has a number,lowercase and uppercase
      const validPw = this.password.match(checkPw);
      console.log(validPw);

      if (validPw) {
        const encryptedPassword = await bcrypt.hash(this.password, 8);
        this.password = encryptedPassword;
        this.email = this.email.toLowerCase();
        next();
      } else {
        const err = new Error();
        err.message = "THE PASSWORD YOU PROVIDED IS NOT A SAFE PASSWORD";
        next(err);
      }
    } else {
      const err = new Error();
      err.message = "EMAIL ALREADY EXISTS";
      next(err);
    }
  } else {
    const err = new Error();
    err.message = "PASSWORD MUST HAVE MORE THAN 8 CHARACTERS";
    next(err);
  }
});

companySchema.statics.findByCred = async function (
  this: CompanyDocument,
  email: string,
  password: string
) {
  try {
    let Company = await this.findOne({ email });

    if (!Company?.password) throw new Error("Company not found !!!");

    const doesMatch = await bcrypt.compare(password, Company.password);
    if (!doesMatch) {
      const err = new Error();
      err.message = "Unable to Login,check Credentials";
      throw err;
    } else {
      const {
        name,
        password,
        business_id,
        license_id,
        email,
        _id,
        image,
      } = Company;
      return Object.freeze({
        name,
        business_id,
        license_id,
        email,
        _id,
        image,
      });
    }
  } catch (error) {
    error.message = "Exception while finding user";
    throw error;
  }
};
companySchema.statics.updateStatus = async function (
  this: CompanyDocument,
  id: string,
  status: boolean
): Promise<CompanyDoc | undefined> {
  try {
    let Company = await this.findByIdAndUpdate(id, { status });
    if (Company) return Company;
  } catch (error) {
    throw error;
  }
};
export const companyModel = model<CompanyDoc, CompanyModel>(
  "Company",
  companySchema
);