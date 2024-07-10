module.exports = Category;


// import the express router
const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/auth")
// define the end points
categoryRouter.post("/addCategory", auth.verifyToken, auth.isAdmin,categoryController.addCategory);
categoryRouter.get("/:categoryId", auth.verifyToken, auth.isAdmin,categoryController.getCategoryById); 
categoryRouter.get("/", auth.verifyToken, auth.isAdmin,categoryController.getCategorys); 
categoryRouter.put("/:categoryId",  auth.verifyToken, auth.isAdmin,categoryController.updateCategoryById); 
categoryRouter.delete("/:categoryId",  auth.verifyToken, auth.isAdmin, categoryController.deleteCategoryById); 


//export the router
module.exports = categoryRouter;