import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
    bio: { type: String, },
    skills: [{ type: String, }],
    resume: { type: String, },
    resumeName: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, // make relation to store company id [relation between company table and user table]
    profilePhoto: { type: String, default: "" },
}, { _id: false });

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["student", "recruiter"] },
    profile: { type: profileSchema },

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
