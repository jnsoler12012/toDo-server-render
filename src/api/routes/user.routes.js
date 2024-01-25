import { Router } from "express"
import auth from "./auth.js"
import { deleteUser, getAllUser, updateUser } from "../controllers/user/index.js";


const userRouter = Router();

userRouter.get("/getAll", auth, getAllUser)
userRouter.delete("/delete/:idUser", auth, deleteUser)
userRouter.post("/update/:idUser", auth, updateUser)

export default userRouter;