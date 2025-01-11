import { Router } from "express";
import { LoginUserRoutes } from "../modules/Auth/auth.route";

const router= Router()
const moduleRoutes=[
{
    path:"/auth",
    route:LoginUserRoutes,
}
]

moduleRoutes.forEach(route=>router.use(route.path,route.route));
export default router