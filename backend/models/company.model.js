import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    about: { type: String },
    website: { type: String, },
    location: { type: String, },
    logo: { type: String, },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USer",
        required: true,
    }
}, { timestamps: true }
)

export const Company = mongoose.model("Company", companySchema)