import express from "express"
import { registerUser, loginUser, currentUser } from "../controllers/userController.js";
import validateToken from '../middlewares/AuthUser.js'
import { getAllTicketForUser, getAllUserTicketForAdmin, updateStatusOfTicket, userTicket } from "../controllers/ticketController.js";
import AuthUser from "../middlewares/AuthUser.js";
import { getAllOrder, getAllOrdersForUser, updateStatusOfOrder, userNewOrder } from "../controllers/orderController.js";
import { addFund, getAllFundForUser, getAllUserFundAdmin, getTotalAmount, updateFund } from "../controllers/fundController.js";

const router = express.Router();
// Authentication
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);
// ticket

router.post("/ticket", AuthUser, userTicket);

router.get("/getAllTicket", AuthUser, getAllUserTicketForAdmin);

router.put("/updateTicketStatus", AuthUser, updateStatusOfTicket);

router.get("/getAllUserTicket", AuthUser, getAllTicketForUser);
// Order

router.post("/newOrder", AuthUser, userNewOrder);

router.get("/getAllOrder", AuthUser, getAllOrder);

router.get("/getAllOrdersForUser", AuthUser, getAllOrdersForUser);

router.put("/updateStatus", AuthUser, updateStatusOfOrder);
// Fund

router.post("/addFund", AuthUser, addFund);

router.put("/updateFund", AuthUser, updateFund);

router.get("/getAllUserFundForAdmin", AuthUser, getAllUserFundAdmin);

router.get("/getAllFunduser", AuthUser, getAllFundForUser);

router.get("/getAmountTotal", AuthUser, getTotalAmount);

export default router;
