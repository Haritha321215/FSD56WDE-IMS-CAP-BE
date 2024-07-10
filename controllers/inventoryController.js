// business logic
// import the inventory model
const Inventory = require("../models/inventory");
const Product = require("../models/product");
const Stock = require("../models/stock");
//define the inventory controller
const inventoryController = {
  addInventory: async (request, response) => {
    try {
      const { productName } = request.body;
      console.log(productName + " from request body");
      // Find the product by name in the product collection
      const product = await Product.findOne({ productName });
      if (!product) {
        return response.status(404).json({ error: "product not found" });
      }
      console.log("product found" + product.productName);
      // Find the stock by name in the product collection
      const stock = await Stock.findOne({ productName });
      if (!stock) {
        return response.status(404).json({ error: "stock not found" });
      }
      console.log("stock found" + stock.stockQuantity);
      // checks if the inventory is already in the database
      // need to create inventory model
      const inventory = await Inventory.findOne({ productName });
      // if inventory exits, return an error
      //other wise create new inventory object and save it in db
      if (inventory) {
        return response
          .status(400)
          .json({ message: "Inventory already exists" });
      }
      // if inventory does not exits create new inventory
      const openStock = stock.stockQuantity;
      const inStock = 0; //purchageorder.instock;
      const outstock = 0;
      const closingStock = inStock + openStock - outstock;
      const stockRate = product.buying_price * closingStock;
      const stockValue = product.selling_price * closingStock;
      const reorder = product.reorder_level;
      const reorderRequired = reorder >= closingStock ? true : false;
      const newInventory = new Inventory({
        productName: product.productName,
        drawer_number: product.drawer_number,
        openingStock: openStock,
        inStock: inStock,
        outStock: outstock,
        closingStock: closingStock,
        totalStockBuyingPrice: stockRate,
        totalStockSellingPrice: stockValue,
        min_quantity: stock.min_quantity,
        max_quantity: stock.max_quantity,
        reorder_level: reorder,
        reorder_required: reorderRequired,
      });
      // save the inventory in database
      const saveInventory = await newInventory.save();
      await Inventory.collection.dropIndexes();
      // return the saved inventory respose to the front end
      response.status(201).json({
        message: "inventory created successfully",
        inventory: saveInventory,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getInventoryById: async (request, response) => {
    try {
      // get the inventory id  from the request object
      const inventoryId = request.params.inventoryId;
      // find the inventory by id from the database
      const inventory = await Inventory.findById(inventoryId);
      // if the inventory does nt exist, return an error
      if (!inventory) {
        return response.status(400).json({ message: "Inventory not found" });
      }
      //if the inventory found
      response.json({ message: "inventory found", inventory });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getInventories: async (request, response) => {
    try {
      // find the inventorys from the database
      const inventorys = await Inventory.find();
      // if the inventorys does nt exist, return an error
      if (!inventorys) {
        return response.status(400).json({ message: "Inventorys not found" });
      }
      //if the inventory found
      response.json({ message: "inventorys found", inventorys });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  updateInventoryById: async (request, response) => {
    try {
      // get the inventory id  from the request object
      const inventoryId = request.params.inventoryId;
      // get inventory inprequest.params.inventoryIdestbody
      const { inventoryName } = request.body;
      // find the inventory by id from the database
      const inventory = await Inventory.findById(inventoryId);
      // if the inventory does not exist, return an error
      if (!inventory) {
        return response.status(400).json({ message: "Inventory not found" });
      }
      // update the inventory if the inventory exists
      if (inventoryName) inventory.inventoryName = inventoryName;
      //save the updated inventory to the database
      const updatedInventory = await inventory.save();
      //return the updated inventory to front end
      response.json({
        message: "inventory updated",
        inventory: updatedInventory,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  deleteInventoryById: async (request, response) => {
    try {
      // get the inventory id  from the request object
      const inventoryId = request.params.inventoryId;
      // find the inventory by id from the database
      const inventory = await Inventory.findById(inventoryId);
      if (!inventory) {
        return response.status(400).json({ message: "Inventory not found" });
      }
      //if the inventory found, then delete the inventory
      await inventory.deleteOne();
      //return a suscess message
      response.json({ message: "inventory has been deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};
module.exports = inventoryController;