import activityModel from "./schema";
import { clientModel } from "../clients/schema";
import { Response, NextFunction } from "express";
import { authReq as Request } from "../../types/general";
import { errorMessage } from "../../types/errors";

const checkIn = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const client = await clientModel.findById(req.client?._id);

    const newActivity = new activityModel({
      clientId: req.client?._id,
      companyId: client?.company_id,
      checkIn: new Date(),
      type: req.params.type,
    });

    newActivity.save();

    res.status(200).send(newActivity);
  } catch (error) {
    nex(new errorMessage("something went wrong", 500));
  }
};

const checkOut = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    if (!req.client) return;
    // const activity = await activityModel.find({ clientId: req.client._id });
    let activity = await activityModel.find({clientId:req.client._id});
     activity = activity.filter((elem)=> !elem.checkOut)
    const endActivity = await activityModel.findByIdAndUpdate(activity[0]._id, {
      checkOut: new Date(),
    });

    res.status(200).send(endActivity);
  } catch (error) {
    nex(new errorMessage("something went wrong", 500));
  }
};

const clientActivity = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
    if (!req.client) return;
    // const activity = await activityModel.find({ clientId: req.client._id });
    let activity = await activityModel.find();
    activity = activity.filter((elem)=> !elem.checkOut)
    
  
    res.status(200).send(activity);
  } catch (error) {
    nex(new errorMessage("something went wrong", 500));
  }
};
const SingleclientActivity = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
    if (!req.client) return;
    // const activity = await activityModel.find({ clientId: req.client._id });
    let activity = await activityModel.find({clientId:req.client._id});
  activity = activity.filter((elem)=> elem.checkOut)
    
  
    res.status(200).send(activity);
  } catch (error) {
    nex(new errorMessage("something went wrong", 500));
  }
};

const companyActivity = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
    if (!req.company) return;
    const activity = await activityModel.find({ companyId: req.company._id });
    res.status(200).send(activity);
  } catch (error) {
    nex(new errorMessage("something went wrong", 500));
  }
};


export const controller = { checkIn, checkOut ,clientActivity,SingleclientActivity};
