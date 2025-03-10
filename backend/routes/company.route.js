import express from "express"
import { isAuthenticated } from "../middlewares/isAuthentic.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";

const companyRouter = express.Router()

companyRouter.post("/register", isAuthenticated, registerCompany);

companyRouter.get("/", isAuthenticated, getCompany);

companyRouter.get("/:id", isAuthenticated, getCompanyById);

companyRouter.put("/update/:id", isAuthenticated, updateCompany);


export default companyRouter;