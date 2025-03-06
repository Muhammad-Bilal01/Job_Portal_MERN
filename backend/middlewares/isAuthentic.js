import jwt from "jsonwebtoken";
import "dotenv/config";


export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token

        // token is not exist
        if (!token) {
            return res.status(400).send({
                success: false,
                message: "User not authenticated"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decode) {
            return res.status(400).send({
                success: false,
                message: "Invalid Token"
            })
        }

        // send user id to next route
        req.id = decode.userId
        // if check is passed
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        })

    }
}