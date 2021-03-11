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

const newProdPhoto = async(req: Request,res:Response,next:NextFunction)=>{
    try {
       const myProduct = await productModel.findByIdAndUpdate(
           req.params.id,
           {
               $set:{
                   image:req.file.path,
               },
           }
       )
       if(myProduct){

           const {_id} = await myProduct.save()
           res.status(201).send(_id)
       }else{
           throw new Error("photo failed to upload produdct doest exists")
       }
    } catch (error) {
        next(error)
    }
}

const getProduct = async(req: Request,res:Response,next:NextFunction)=>{
    try {
        const prod = await productModel.findOne({_id:req.params.id})
        res.status(200).send(prod)
    } catch (error) {
        next(error)
    }
}
const getAllProdcts = async(req: Request,res:Response,next:NextFunction)=>{
    try {
        const allProdcts = await productModel.find({})
        res.status(200).send(allProdcts)
    } catch (error) {
        next(error)
    }
}
const editProduct = async(req: Request,res:Response,next:NextFunction)=>{
    try {
		if (req.file && req.file.path) {
            console.log("its this working",req.file)
			const editProd = await productModel.findByIdAndUpdate(
				req.params.id,
				{
					$set: {
						image: req.file.path,
					},
				}
			);
            if(editProd){
                const { _id } = await editProd.save();
                res.status(201).send(_id);

            }else{
                throw new Error("Post doesnt exist")

            }
		} else {
			const editProd = await productModel.findByIdAndUpdate(
				req.params.id,
				{
					$set: {...req.body}
                   
				},
                {new:true}
			);
            if(editProd){
                const { _id } = await editProd.save();
                res.status(201).send(_id);

            }else{
                throw new Error("Post doest exist")
            }
		}
	} catch (error) {
		next(error);
	}
}
export default {
    newProduct,
    newProdPhoto,
    getProduct,
    getAllProdcts,
    editProduct,
}