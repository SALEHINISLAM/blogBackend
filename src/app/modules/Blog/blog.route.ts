import express from 'express'
import { BlogValidations } from './bog.validation'
import auth from '../../middleware/auth'
import { BlogControllers } from './blog.controllers'
import validateRequest from '../../middleware/validateRequest'

const router=express.Router()

router.post('/',validateRequest(BlogValidations.createBlogValidationSchema),auth('admin',"user"),BlogControllers.createBlog)

export const BlogRoutes=router