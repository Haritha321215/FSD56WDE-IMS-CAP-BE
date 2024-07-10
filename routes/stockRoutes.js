// import the express router
const express = require("express");
const stockRouter = express.Router();
const stockController = require("../controllers/stockController");
const auth = require("../middleware/auth")
// define the end points
stockRouter.post("/addStock", auth.verifyToken, auth.isAdmin,stockController.addStock);
stockRouter.get("/:stockId", auth.verifyToken, auth.isAdmin,stockController.getStockById); 
stockRouter.get("/", auth.verifyToken, auth.isAdmin,stockController.getStocks); 
stockRouter.put("/:stockId",  auth.verifyToken, auth.isAdmin,stockController.updateStockById); 
stockRouter.delete("/:stockId",  auth.verifyToken, auth.isAdmin, stockController.deleteStockById); 


//export the router
module.exports = stockRouter;