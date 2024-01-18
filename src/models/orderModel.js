import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        service: {
            type: String,
            required: [true, "Service is required"],
            trim: true,
        },
        link: {
            type: String,
            required: [true, "link is required"],
            trim: true,
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            trim: true
        },
        charges: {
            type: Number,
            trim: true
        },
        isPaid: { type: Boolean, required: true },
        paidAt: { type: Date, reqired: true },
        isProcessing: { type: Boolean, required: true },

    },
    {
        timestamps: true
    }
)

export const Order = mongoose.model("Order", orderSchema)
