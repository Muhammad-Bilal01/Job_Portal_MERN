import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./utils/db.js"

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

