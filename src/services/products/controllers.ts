import {productModel} from "./schema"
import {Response,NextFunction} from "express"
import {authReq as Request} from "../../types/general"

const newProduct = async(req: Request,res:Response,next:NextFunction)=>{
    try {
        const newProductInfo = new productModel({
            ...req.body
        })
        const {_id} = await newProductInfo.save()
        res.status(201).send(_id)
    } catch (error) {
        next(error)
    }
}


export default {
    newProduct,
}