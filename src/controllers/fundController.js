import { asyncHandler } from '../utils/asyncHandler.js';
import { Fund } from '../models/fundModel.js';
import mongoose from 'mongoose';
import { Order } from '../models/orderModel.js';

const addFund = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser) {
        const { user, orderId, amount, isProcessing, paidAt } = req.body;
        if (!orderId || !amount) {
            res.json({
                success: false,
                message: 'All fields are mandetory !'
            })
        }
        const createFund = await Fund.create({
            user,
            orderId,
            amount,
            isProcessing,
            paidAt
        });

        if (createFund) {
            res.json({
                _id: createFund.id,
                message: "Fund added successfully",
                success: true,
            });
        } else {
            res.status(400);
            res.json('Add Fund data is not valid');
        }

    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})

const updateFund = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser?.role === "admin") {
        const {
            _id,
            user,
            orderId,
            amount,
            isProcessing,
            createdAt,
        } = req.body;

        const updateFund = await Fund.findOneAndUpdate({ _id: _id },
            {
                user,
                _id,
                orderId,
                amount,
                isProcessing,
                createdAt,
            },
            { new: true })
        if (updateFund) {
            res.json({
                success: true,
                message: "Fund updated successfully !",
            });
        } else {
            res.status(400);
            res.json({
                success: false,
                message: "Failed to update the Fund ! Plaese try again later",
            });
        }
    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})

const getAllUserFundAdmin = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser?.role === "admin") {
        const extractAllUsersFund = await Fund.find({}).populate('user');

        if (extractAllUsersFund) {
            res.json({
                success: true,
                data: extractAllUsersFund,
            });
        } else {
            res.status(400);
            res.json({
                success: false,
                message: 'Fund data is not found'
            });
        }

    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})

const getAllFundForUser = asyncHandler(async (req, res) => {

    const isAuthUser = req.user;

    if (isAuthUser) {
        const userId = req.query.id;

        const extractAllFund = await Fund.find({ user: userId });

        if (extractAllFund) {
            res.json({
                success: true,
                data: extractAllFund,
            });
        } else {
            res.status(400);
            res.json({
                success: false,
                message: 'Fund data is not found'
            });
        }

    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})


const getTotalAmount = asyncHandler(async (req, res) => {
    const isAuthUser = req.user;

    if (isAuthUser) {
        const userId = req.query.id;

        const userFund = await Fund.findOne({ user: userId });

        if (!userFund) {
            res.status(400);
            res.json({ success: false, message: 'User fund not found' });
            return;
        }

        const totalAmountAdded = await Fund.aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId,
                    isProcessing: false,
                }
            },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        const totalAdded = totalAmountAdded.length ? totalAmountAdded[0].total : 0;

        // Calculate the total charges of all orders
        const totalOrderCharges = await Order.aggregate([
            { $match: { user: mongoose.Types.ObjectId } }, // Convert user to ObjectId
            { $group: { _id: null, total: { $sum: '$charges' } } },
        ]);

        const totalCharges = totalOrderCharges.length ? totalOrderCharges[0].total : 0;

        // Calculate the remaining amount
        const remainingAmount = totalAdded - totalCharges;

        res.json({
            _id: userFund.id,
            message: 'Fund Check successfully',
            success: true,
            // totalAmountAdded: totalAdded,
            spentAmount: totalCharges,
            remainingAmount: remainingAmount,
        });

    } else {
        res.json({
            success: false,
            message: "You are not autheticated ! Please login first",
        })
    }
})


export {
    addFund,
    updateFund,
    getAllUserFundAdmin,
    getAllFundForUser,
    getTotalAmount
};