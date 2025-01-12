import catchAsync from "../../utilitis/catchAsync";
import sendResponse from "../../utilitis/sendResponse";
import { BlogServices } from "./blog.services";
import httpStatus from "http-status"

const createBlog = catchAsync(async (req, res) => {
    const userEmail = req.user?.email as string
    const result = await BlogServices.createBlogIntoDB(req.body, userEmail)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog created successfully",
        data: result
    })
})

const updateBlog = catchAsync(async (req, res) => {
    const blogId = req.params.id
    const updates = req.body
    const email=req.user?.email
    const result = await BlogServices.updateBlogIntoDB(updates, blogId,email)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog updated successfully",
        data: result
    })
})

const deleteBlog=catchAsync(async(req,res)=>{
    const blogId = req.params.id
    const email=req.user?.email
    const result = await BlogServices.deleteBlogsFromDB( blogId,email)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog deleted successfully",
        data: result
    })
})

export const BlogControllers = { createBlog,updateBlog,deleteBlog }