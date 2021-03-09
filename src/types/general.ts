import {Request} from 'express'
import {CompanyDoc} from './company'

export interface authReq extends Request {
    token?:string,
    company?:CompanyDoc
}