import AppError from "../../errors/AppError";
import UserModel from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
    //checking if the user is exists
    const isUserExists = await UserModel.findOne({ email: payload?.email })
    if (!isUserExists) {
        throw new AppError(401, 'Invalid credentials')
    }
    else if (isUserExists.isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !')
    }
    // check if the password in correct
    const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExists?.password)

    if (!isPasswordMatched) {
        throw new AppError(401, 'Invalid credentials')
    }
    // create token and send to the client
    const jwtPayload={
        email:isUserExists?.email,
        role: isUserExists?.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string , { expiresIn: '30d' })

    //access granted : send access token, refresh token
    return {accessToken}
}

export const AuthServices = {
    loginUser
}