import { asyncHandler } from '../utils/asyncHandler.js';
import { Order } from '../models/orderModel.js';

const userNewOrder = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser) {
        const { user, service, link, quantity, charges, isPaid, paidAt, isProcessing } = req.body;
        if (!service || !link || !quantity || !charges || !isPaid || !paidAt ) {
            res.json({
                success: false,
                message: 'All fields are mandetory !'
            })
        }
        const createNewOrder = await Order.create({
            user,
            service,
            link,
            quantity,
            charges,
            isPaid,
            paidAt,
            isProcessing
        });

        if (createNewOrder) {
            res.json({
                _id: createNewOrder.id,
                message: " Order sent successfully",
                success: true,
            });
        } else {
            res.status(400);
            res.json('Order data is not valid');
        }

    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})

const getAllOrder = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser?.role === "admin") {
        const extractAllOrder = await Order.find({}).populate('user');

        if (extractAllOrder) {
            res.json({
                success: true,
                data: extractAllOrder,
            });
        } else {
            res.status(400);
            res.json({
                success: false,
                message: 'Order data is not found'
            });
        }

    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})
const getAllOrdersForUser = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser) {
        const userId = req.query.id;

        const extractAllOrder = await Order.find({ user: userId });

        if (extractAllOrder) {
            res.json({
                success: true,
                data: extractAllOrder,
            });
        } else {
            res.status(400);
            res.json({
                success: false,
                message: 'Order data is not found'
            });
        }

    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})

const updateStatusOfOrder = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser?.role === "admin") {
        const {
            user,
            _id,
            service,
            link,
            quantity,
            charges,
            isProcessing,
            createdAt,
        } = req.body;

        const updateOrder = await Order.findOneAndUpdate({ _id: _id },
            {
                user,
                _id,
                service,
                link,
                quantity,
                charges,
                isProcessing,
                createdAt,
            },
            { new: true })
        if (updateOrder) {
            res.json({
                success: true,
                message: "Order updated successfully !",
            });
        } else {
            res.status(400);
            res.json({
                success: false,
                message: "Failed to update the order ! Plaese try again later",
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
    userNewOrder,
    getAllOrder,
    getAllOrdersForUser,
    updateStatusOfOrder
};