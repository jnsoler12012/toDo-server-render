import { Router } from "express"
import auth from "./auth.js"
import { createCategory, deleteCategory, getAllCategory } from "../controllers/category/index.js";


const categoryRouter = Router();

categoryRouter.post("/create", auth, createCategory)
categoryRouter.get("/getAll", auth, getAllCategory)
categoryRouter.post("/delete/:idCategory", auth, deleteCategory)

export default categoryRouter;