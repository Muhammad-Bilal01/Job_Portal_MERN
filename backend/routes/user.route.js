import express from "express"
import { login, logout, registerUser, updaterofile } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthentic.js";



const router = express.Router()


router.post("/register", registerUser);

router.post("/login", login);

router.post("/update-profile", isAuthenticated, updaterofile);

router.get("/logout", isAuthenticated, logout);


export default router;