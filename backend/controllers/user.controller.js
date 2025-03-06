import { User } from "./../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        // any one feild is empty throw error message
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).send({
                success: false,
                message: "Something is missing"
            })
        }

        // Check user already exist
        const user = User.findOne({
            email: email
        })

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User already exist with this email."
            })
        }

        // create new user

        //hash password
        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({
            fullname,
            email,
            password: hashPassword,
            phoneNumber,
            role,
        })

        return res.status(201).send({
            success: true,
            message: "Account created successfully!"
        })
    } catch (error) {
        console.error("User Registration Error => ", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // any one feild is empty throw error message
        if (!email || !password || !role) {
            return res.status(400).send({
                success: false,
                message: "Something is missing"
            })
        }
        // if user not exist
        let user = await User.findOne({
            email: email,
        })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User is not exist..."
            })
        }

        // user found
        const isPassword = await bcrypt.compare(password, user.password);
        // password not match
        if (!isPassword) {
            return res.status(400).send({
                success: false,
                message: "Invalid Credentials."
            })
        }

        // check role
        if (role !== user.role) {
            return res.status(400).send({
                success: false,
                message: "Account doesn't exist with this role."
            })
        }

        const tokenData = {
            userId: user._id,
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        // User Data
        user = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // store token in cookies
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).send(
            {
                success: true,
                message: `Welcome back ${user.fullname}`,
                user: user
            }
        )

    } catch (error) {
        console.error("User Login Error => ", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}


export const logout = async (req, res) => {
    try {
        // logout user
        return res.status(200).cookie("token", "", { maxAge: 0 }).send({
            message: "Logout Successfull",
            success: true
        })
    } catch (error) {
        console.error("User Login Error => ", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const updaterofile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body
        const file = req.file;

        // Cloudinary code here


        let skillsArray;

        const userId = req.id  // authenticate from middlewares
        // update profile
        const user = await User.findById(userId)
        // user not exist
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User is not exist"
            })
        }

        // updating user data
        if (fullname)
            user.fullname = fullname

        if (email)
            user.email = email
        if (phoneNumber)
            user.phoneNumber = phoneNumber
        if (bio)
            user.profile.bio = bio
        if (skills) {
            console.log(typeof (skills));
            // convert string array to arrays
            skillsArray = skills
            user.profile.skills = skillsArray
        }

        // resume and profileImage

        await user.save();

        let userData = {
            fullname,
            email,
            phoneNumber,
            bio,
            skillsArray,
        }

        return res.status(200).send({
            success: true,
            message: "User Update Successfully!",
            userData
        })

    } catch (error) {
        console.error("User Updation Error => ", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}
