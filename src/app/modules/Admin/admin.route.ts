import Express from "express"
import auth from "../../middleware/auth"
import { AdminControllers } from "./admin.controllers"
import { BlogControllers } from "../Blog/blog.controllers"

const router=Express.Router()

router.patch('/users/:userId/block',auth("admin"),AdminControllers.blockUser)
router.delete("/blogs/:id",auth('admin'),BlogControllers.deleteBlog)
export const AdminRoutes=router