import {Request} from 'express'
import jwt from 'jsonwebtoken'
import {CompanyDoc} from './company'

export interface authReq extends Request {
    token?:string,
    company?:CompanyDoc,
    user?:CompanyDoc
}
export interface DecodedVerifyOpt extends jwt.DecodeOptions{
    _id: string
}

