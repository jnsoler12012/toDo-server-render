import { Router } from "express"
import { loginUser, resetPasswordUser, signupUser } from "../controllers/auth/index.js";


const authRouter = Router();

authRouter.post("/login", loginUser)
authRouter.post("/signup", signupUser)
authRouter.post("/resetPassword", resetPasswordUser)

export default authRouter;