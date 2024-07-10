// import the express router
const express = require("express");
const purchageOrderRouter = express.Router();
const purchageOrderController = require("../controllers/purchageOrderController");
const auth = require("../middleware/auth")
// define the end points
purchageOrderRouter.post("/addpurchageOrder", auth.verifyToken, auth.isAdmin,purchageOrderController.addpurchageOrder);
purchageOrderRouter.get("/:productId", auth.verifyToken, auth.isAdmin,purchageOrderController.getpurchageOrderById); 
purchageOrderRouter.get("/", auth.verifyToken, auth.isAdmin,purchageOrderController.getpurchageOrders); 
purchageOrderRouter.put("/:productId",  auth.verifyToken, auth.isAdmin,purchageOrderController.updatepurchageOrderById); 
purchageOrderRouter.delete("/:productId",  auth.verifyToken, auth.isAdmin, purchageOrderController.deletepurchageOrderById); 
//export the router
module.exports = purchageOrderRouter;