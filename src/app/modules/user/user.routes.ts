import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { UserValidations } from './user.validations'
import { UserControllers } from './user.controllers'
import auth from '../../middleware/auth'

const router=express.Router()

router.post('/register',validateRequest(UserValidations.createUserValidationSchema),UserControllers.createUser)
router.post('/login',UserControllers.loginUser)
router.patch('/admin/users/:userId/block',auth("admin"),UserControllers.blockUser)

export const UserRoutes=router