import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./utils/db.js"
import router from "./routes/user.route.js"
import companyRouter from "./routes/company.route.js"
import jobRouter from "./routes/job.route.js"

const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// Setup cors
const corsOption = {
    origin: "https://localhost:5173",
    Credentials: true
}
app.use(cors(corsOption))

// router
app.use("/api/v1/user", router)
app.use("/api/v1/company", companyRouter)
app.use("/api/v1/job", jobRouter)


// sample apis
app.get("/", (req, res) => {
    res.status(200).send({
        status: 200,
        success: true,
        message: "The app is running"
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    try {
        connectDB()
        console.log(`The Server is running on port ${PORT}`);
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
})

