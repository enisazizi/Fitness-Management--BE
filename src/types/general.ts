import {Request} from 'express'
import jwt from 'jsonwebtoken'
import {CompanyDoc} from './company'
import {ClientDoc} from "./client"

export interface authReq extends Request {
    token?:string,
    company?:CompanyDoc,
    client?:ClientDoc,
}

export interface DecodedVerifyOpt extends jwt.DecodeOptions{
    _id: string
}

