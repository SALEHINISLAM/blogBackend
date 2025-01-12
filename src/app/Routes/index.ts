import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { BlogRoutes } from "../modules/Blog/blog.route";

const router= Router()
const moduleRoutes=[
{
    path:"/auth",
    route:UserRoutes,
},
{
    path:"/admin",
    route:AdminRoutes,
},
{
    path:"/blogs",
    route:BlogRoutes,
},

]

moduleRoutes.forEach(route=>router.use(route.path,route.route));
export default router