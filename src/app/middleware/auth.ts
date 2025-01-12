import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from "../errors/AppError";
import catchAsync from "../utilitis/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status'
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles:TUserRole[]) => {
    return catchAsync(async (req:Request, res:Response, next:NextFunction) => {
        const token=req.headers.authorization;
        //if there exists token
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED,"You are not Authorized user !",'')
        }
        // check if the token is valid
        jwt.verify(token, config.jwt_access_token as string, function (err, decoded){
            //when error
            if (err) {
                throw new AppError(httpStatus.UNAUTHORIZED,"You are not Authorized user !")
            }
            
            else if (requiredRoles.length>0 && !requiredRoles.includes((decoded as JwtPayload)?.role)) {
                throw new AppError(httpStatus.UNAUTHORIZED,"You are not Authorized user !")
            }
            //decoded
            req.user=decoded as JwtPayload
            next()
        })
    })
}
export default auth