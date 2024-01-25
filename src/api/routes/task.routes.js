import { Router } from "express"
import auth from "./auth.js"
import { createTask, deleteTask, getAllTask, getAllTaskByUser, updateTask } from "../controllers/task/index.js";


const taskRouter = Router();

taskRouter.post("/create", auth, createTask)
taskRouter.get("/getAll", auth, getAllTask)
taskRouter.post("/getAllByUser", auth, getAllTaskByUser)
taskRouter.post("/update/:idTask", auth, updateTask)
taskRouter.post("/delete/:idTask", auth, deleteTask)

export default taskRouter;