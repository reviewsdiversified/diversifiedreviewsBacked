import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowecase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },
        phoneNumber: {
            type: String,
            required: [true, "Whatsapp number is required"],
            trim: true
        }, 
        city: {
            type: String,
            required: [true, "city is required"],
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            trim: true
        },
        role: {
            type: String
        }
    },
    {
        timestamps: true
    }
)
export const User = mongoose.model("User", userSchema)
