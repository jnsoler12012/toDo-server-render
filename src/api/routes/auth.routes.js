import { Router } from "express"
import { loginUser, signupUser } from "../controllers/auth/index.js";


const authRouter = Router();

authRouter.post("/login", loginUser)
authRouter.post("/signup", signupUser)

export default authRouter;