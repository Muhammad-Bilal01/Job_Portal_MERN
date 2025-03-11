import express from "express"
import { isAuthenticated } from "../middlewares/isAuthentic.js";
import { getAllJobs, getjobById, getJobsByAdmin, postJob } from "../controllers/job.controller.js";

const jobRouter = express.Router()

jobRouter.post("/post", isAuthenticated, postJob);

jobRouter.get("/", isAuthenticated, getAllJobs);

jobRouter.get("/getadmin", isAuthenticated, getJobsByAdmin);

jobRouter.get("/:id", isAuthenticated, getjobById);


export default jobRouter;