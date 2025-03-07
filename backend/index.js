import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./utils/db.js"
import router from "./routes/user.route.js"

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
    connectDB()
    console.log(`The Server is running on port ${PORT}`);

})

