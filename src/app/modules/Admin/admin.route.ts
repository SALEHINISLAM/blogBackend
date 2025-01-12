import Express from "express"
import auth from "../../middleware/auth"
import { AdminControllers } from "./admin.controllers"

const router=Express.Router()

router.patch('/users/:userId/block',auth("admin"),AdminControllers.blockUser)

export const AdminRoutes=router