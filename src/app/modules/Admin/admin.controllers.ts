import catchAsync from "../../utilitis/catchAsync"
import sendResponse from "../../utilitis/sendResponse"
import { UserServices } from "../user/user.service"
import httpStatus from "http-status"

const blockUser=catchAsync(async(req,res)=>{
    const result= await UserServices.blockUser(req.params.userId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User blocked successfully",
        data:null
    })
})

export const AdminControllers={blockUser}