import mongoose, { Schema } from "mongoose";

const fundSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderId: {
            type: String,
            required: [true, "Order Id is required"],
            trim: true
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            trim: true
        },
        isProcessing: { type: Boolean, required: true },
        paidAt: { type: Date, reqired: true },
    },
    {
        timestamps: true
    }
)

export const Fund = mongoose.model("Fund", fundSchema)
