import catchAsync from "../../utilitis/catchAsync";
import sendResponse from "../../utilitis/sendResponse";
import { BlogServices } from "./blog.services";
import httpStatus from "http-status"

const createBlog=catchAsync(async (req, res)=>{
    const userEmail=req.user?.email as string
    const result=await BlogServices.createBlogIntoDB(req.body,userEmail)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Blog created successfully",
        data:result
    })
})

export const BlogControllers={createBlog}