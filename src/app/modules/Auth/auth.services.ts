import AppError from "../../middleware/AppError";
import UserModel from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'

const loginUser=async (payload:TLoginUser)=>{
    //checking if the user is exists
    const isUserExists=await UserModel.findOne({name:payload?.name})
    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND,'This user is not found !','')
    }
    else if (isUserExists.isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN,'This user is blocked !','')
    }
    // check if the password in correct
    const isPasswordMatched= await bcrypt.compare(payload?.password, isUserExists?.password)

    //access granted : send access token, refresh token
    return
}

export const AuthServices={
    loginUser
}