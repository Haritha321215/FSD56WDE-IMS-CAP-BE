// import the express router
const express = require("express");
const inventoryRouter = express.Router();
const inventoryController = require("../controllers/inventoryController");
const auth = require("../middleware/auth")
// define the end points
inventoryRouter.post("/addInventory", auth.verifyToken, auth.isAdmin,inventoryController.addInventory);
inventoryRouter.get("/:productId", auth.verifyToken, auth.isAdmin,inventoryController.getInventoryById); 
inventoryRouter.get("/", auth.verifyToken, auth.isAdmin,inventoryController.getInventories); 
inventoryRouter.put("/:productId",  auth.verifyToken, auth.isAdmin,inventoryController.updateInventoryById); 
inventoryRouter.delete("/:productId",  auth.verifyToken, auth.isAdmin, inventoryController.deleteInventoryById); 
//export the router
module.exports = inventoryRouter;