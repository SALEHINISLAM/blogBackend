import { USER_ROLE } from "./user.constants";

//define typescript user interface
export type TUser = {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
}
export type TUserRole=keyof typeof USER_ROLE