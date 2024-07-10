// business logic
// import the category model
const Category = require("../models/category");
//define the category controller
const categoryController = {
  addCategory: async (request, response) => {
    try {
      const {
        categoryName,
        description
      } = request.body;
      // checks if the category is already in the database
      // need to create category model
      const category = await Category.findOne({ categoryName });
      // if category exits, return an error
      //other wise create new category object and save it in db
      if (category) {
        return response.status(400).json({ message: "Category already exists" });
      }
      // if category does not exits create new category
      const newCategory = new Category({
        categoryName,
        description
      });
      // save the category in database
      const saveCategory = await newCategory.save();
      await Category.collection.dropIndexes();
      // return the saved category respose to the front end
      response.status(201).json({
        message: "category created successfully",
        category: saveCategory,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getCategoryById: async (request, response) => {
    try {
      // get the category id  from the request object
      const categoryId = request.params.categoryId;
      // find the category by id from the database
      const category = await Category.findById(categoryId);
      // if the category does nt exist, return an error
      if (!category) {
        return response.status(400).json({ message: "Category not found" });
      }
      //if the category found
      response.json({ message: "category found", category });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getCategorys: async (request, response) => {
    try {
      // find the categorys from the database
      const categorys = await Category.find();
      // if the categorys does nt exist, return an error
      if (!categorys) {
        return response.status(400).json({ message: "Categorys not found" });
      }
      //if the category found
      response.json({ message: "categorys found", categorys });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  updateCategoryById: async (request, response) => {
    try {
      // get the category id  from the request object
      const categoryId = request.params.categoryId;
      // get category inprequest.params.categoryIdestbody
      const { categoryName } = request.body;
      // find the category by id from the database
      const category = await Category.findById(categoryId);
      // if the category does not exist, return an error
      if (!category) {
        return response.status(400).json({ message: "Category not found" });
      }
      // update the category if the category exists
      if (categoryName) category.categoryName = categoryName;
      //save the updated category to the database
      const updatedCategory = await category.save();
      //return the updated category to front end
      response.json({ message: "category updated", category: updatedCategory });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  deleteCategoryById: async (request, response) => {
    try {
      // get the category id  from the request object
      const categoryId = request.params.categoryId;
      // find the category by id from the database
      const category = await Category.findById(categoryId);
      if (!category) {
        return response.status(400).json({ message: "Category not found" });
      }
      //if the category found, then delete the category
      await category.deleteOne();
      //return a suscess message
      response.json({ message: "category has been deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};
module.exports = categoryController;