import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utilitis/catchAsync";
import sendResponse from "../../utilitis/sendResponse";
import { AuthServices } from "../Auth/auth.services";
import { UserServices } from "./user.service";
import httpStatus from "http-status"
import jwt, { JwtPayload } from "jsonwebtoken"

const createUser = catchAsync(async (req, res) => {
    let admin = false

    const userInfo = req.body
    if (userInfo?.role === "admin") {
        const token = req.headers.authorization;
        //if there exists token
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized user !", '')
        }
        // check if the token is valid
        jwt.verify(token, config.jwt_access_token as string, function (err, decoded) {
            //when error
            if (err) {
                throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized user !")
            }
            //decoded
            const ROLE = (decoded as JwtPayload).role
            if (ROLE === "admin") {
                admin = true
            }
        })
        if (admin) {
            const result = await UserServices.createUserIntoDB(userInfo);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "User registered successfully",
                data: result
            })
        }
        else {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access")
        }
    }
    const result = await UserServices.createUserIntoDB(userInfo)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result
    })
})

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Login successful',
        data: result,
    });
});

export const UserControllers = { createUser, loginUser }