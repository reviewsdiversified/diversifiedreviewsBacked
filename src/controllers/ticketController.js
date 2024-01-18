import { asyncHandler } from '../utils/asyncHandler.js';
import { Ticket } from '../models/ticketModel.js';

const userTicket = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser) {
        const { user, orderId, subject, message, isProcessing } = req.body;
        if (!subject || !message || !orderId) {
            res.json({
                success: false,
                message: 'All fields are mandetory !'
            })
        }
        const ticket = await Ticket.create({
            user,
            subject,
            message,
            orderId,
            isProcessing
        });

        if (ticket) {
            res.json({
                _id: ticket.id,
                message: " Ticket sent successfully",
                success: true,
            });
        } else {
            res.status(400);
            res.json('Ticket data is not valid');
        }

    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})

const getAllUserTicketForAdmin = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser?.role === "admin") {

        const extractAllticket = await Ticket.find({}).populate('user');;

        if (extractAllticket) {
            res.json({
                success: true,
                data: extractAllticket,
            });
        } else {
            res.status(400);
            res.json({
                success: false,
                message: 'Ticket data is not found'
            });
        }

    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})

const getAllTicketForUser = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser) {
        const userId = req.query.id;

        const extractAllTicket = await Ticket.find({ user: userId });

        if (extractAllTicket) {
            res.json({
                success: true,
                data: extractAllTicket,
            });
        } else {
            res.status(400);
            res.json({
                success: false,
                message: 'Ticket data is not found'
            });
        }

    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})

const updateStatusOfTicket = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser?.role === "admin") {
        const {
            _id,
            user,
            orderId,
            subject,
            message,
            isProcessing
        } = req.body;

        const updateTicket = await Ticket.findOneAndUpdate({ _id: _id },
            {
                _id,
                user,
                orderId,
                subject,
                message,
                isProcessing
            },
            { new: true })
        if (updateTicket) {
            res.json({
                success: true,
                message: "Ticket status updated successfully !",
            });
        } else {
            res.status(400);
            res.json({
                success: false,
                message: "Failed to update the ticket status ! Plaese try again later",
            });
        }
    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})

export {
    userTicket,
    getAllUserTicketForAdmin,
    getAllTicketForUser,
    updateStatusOfTicket
};