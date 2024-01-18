import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderId: {
            type: String,
            required: [true, "OrderId is required"],
            unique: true,
            trim: true,
        },
        subject: {
            type: String,
            required: [true, "Subject is required"],
            trim: true,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true
        },
        isProcessing: { type: Boolean, required: true },

    },
    {
        timestamps: true
    }
)

export const Ticket = mongoose.model("Ticket", ticketSchema)
