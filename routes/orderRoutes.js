// import the express router
const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth")
// define the end points
orderRouter.post("/addOrder", auth.verifyToken, auth.isAdmin,orderController.addOrder);
orderRouter.get("/:orderId", auth.verifyToken, auth.isAdmin,orderController.getOrderById); 
orderRouter.get("/", auth.verifyToken, auth.isAdmin,orderController.getOrders); 
orderRouter.put("/:orderId",  auth.verifyToken, auth.isAdmin,orderController.updateOrderById); 
orderRouter.delete("/:orderId",  auth.verifyToken, auth.isAdmin, orderController.deleteOrderById); 


//export the router
module.exports = orderRouter;