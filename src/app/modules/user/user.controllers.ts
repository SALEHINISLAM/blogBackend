import AppError from "../../errors/AppError";
import catchAsync from "../../utilitis/catchAsync";
import sendResponse from "../../utilitis/sendResponse";
import { AuthServices } from "../Auth/auth.services";
import { UserServices } from "./user.service";
import httpStatus from "http-status"

const createUser=catchAsync(async(req,res)=>{
    const userInfo=req.body
    if (userInfo?.role==="admin") {
        if (req.user?.role==="admin") {
            const result=await UserServices.createUserIntoDB(userInfo);
            sendResponse(res,{
                statusCode: httpStatus.OK,
                success:true,
                message:"User registered successfully",
                data:result
            })
        }
    }
    const result=await UserServices.createUserIntoDB(userInfo)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message:"User created successfully",
        data:result
    })
})

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is logged in successfully!',
      data: result,
    });
  });

export const UserControllers={createUser,loginUser}