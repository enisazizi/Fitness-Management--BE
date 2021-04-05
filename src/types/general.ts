import {Request,Application} from 'express'
import jwt from 'jsonwebtoken'
// impor{} from "cors"
import {CompanyDoc} from './company'
import {ClientDoc} from "./client"

export interface authReq extends Request {
    token?:string,
    company?:CompanyDoc,
    user?:CompanyDoc,
    client?:ClientDoc,
}
// export interface Application extends 

export interface DecodedVerifyOpt extends jwt.DecodeOptions{
    _id: string
}

