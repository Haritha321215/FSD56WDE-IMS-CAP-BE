// import the express router
const express = require("express");
const vendorRouter = express.Router();
const vendorController = require("../controllers/vendorController");
const auth = require("../middleware/auth")
// define the end points
vendorRouter.post("/addVendor", auth.verifyToken, auth.isAdmin,vendorController.addVendor);
vendorRouter.get("/:vendorId", auth.verifyToken, auth.isAdmin,vendorController.getVendorById); 
vendorRouter.get("/", auth.verifyToken, auth.isAdmin,vendorController.getVendors); 
vendorRouter.put("/:vendorId",  auth.verifyToken, auth.isAdmin,vendorController.updateVendorById); 
vendorRouter.delete("/:vendorId",  auth.verifyToken, auth.isAdmin, vendorController.deleteVendorById); 


//export the router
module.exports = vendorRouter;