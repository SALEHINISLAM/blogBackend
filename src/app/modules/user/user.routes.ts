import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { UserValidations } from './user.validations'
import { UserControllers } from './user.controllers'

const router=express.Router()

router.post('/register',validateRequest(UserValidations.createUserValidationSchema),UserControllers.createUser)
router.post('/login',UserControllers.loginUser)

export const UserRoutes=router