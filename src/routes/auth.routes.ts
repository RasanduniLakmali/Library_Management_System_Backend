import {Router} from "express";
import {
    changePassword,
    getProfile,
    loginUser,
    refreshToken, requireAuth,
    signUpUser,
    updateUser
} from "../controller/auth.controller";
import {authenticateToken} from "../middlewares/authenticateToken";


const authRouter = Router();

authRouter.post("/signUp",signUpUser);
authRouter.get("/users",authenticateToken)
authRouter.post("/login",loginUser)
authRouter.post("/refresh-token",refreshToken)
authRouter.get("/get-profile",getProfile)
authRouter.put("/update-profile",updateUser)
authRouter.post("/change-password",requireAuth,changePassword)

export default authRouter;