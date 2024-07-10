// business logic
// import the purchageOrder model
const PurchaseOrder = require("../models/purchageorder");
const Product = require("../models/product");
const Vendor = require("../models/vendor");
//define the purchageOrder controller
const purchageOrderController = {
  addpurchageOrder: async (request, response) => {
    try {
      const { vendorName, productName, quantity, unitPrice } = request.body;
      console.log(vendorName, productName, quantity, unitPrice);
      // Find the product by name in the product collection
      const product = await Product.findOne({ productName });
      if (!product) {
        return response.status(404).json({ error: "product not found" });
      }
      console.log("product found" + product.productName);
      const vendor = await Vendor.findOne({ vendorName });
      if (!vendor) {
        return response.status(404).json({ error: "vendor not found" });
      }
      console.log("vendor found" + vendor.vendorName);
      // checks if the purchageOrder is already in the database
      // need to create purchageOrder model
      const purchageOrder = await PurchaseOrder.findOne({ productName });
      // if purchageOrder exits, return an error
      //other wise create new purchageOrder object and save it in db
      if (purchageOrder) {
        return response
          .status(400)
          .json({ message: "purchageOrder already exists" });
      }
      // if purchageOrder does not exits create new purchageOrder
      const totalpurchageOrderPrice = quantity * unitPrice;
      const newpurchageOrder = new PurchaseOrder({
        vendor: vendor._id,
        product: product._id,
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: totalpurchageOrderPrice,
      });
      // save the purchageOrder in database
      const savepurchageOrder = await newpurchageOrder.save();
      await PurchaseOrder.collection.dropIndexes();
      // return the saved purchageOrder respose to the front end
      response.status(201).json({
        message: "purchageOrder created successfully",
        purchageOrder: savepurchageOrder,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getpurchageOrderById: async (request, response) => {
    try {
      // get the purchageOrder id  from the request object
      const purchageOrderId = request.params.purchageOrderId;
      // find the purchageOrder by id from the database
      const purchageOrder = await PurchaseOrder.findById(purchageOrderId);
      // if the purchageOrder does nt exist, return an error
      if (!purchageOrder) {
        return response
          .status(400)
          .json({ message: "purchageOrder not found" });
      }
      //if the purchageOrder found
      response.json({ message: "purchageOrder found", purchageOrder });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getpurchageOrders: async (request, response) => {
    try {
      // find the purchageOrders from the database
      const purchageOrders = await PurchaseOrder.find();
      // if the purchageOrders does nt exist, return an error
      if (!purchageOrders) {
        return response
          .status(400)
          .json({ message: "purchageOrders not found" });
      }
      //if the purchageOrder found
      response.json({ message: "purchageOrders found", purchageOrders });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  updatepurchageOrderById: async (request, response) => {
    try {
      // get the purchageOrder id  from the request object
      const purchageOrderId = request.params.purchageOrderId;
      // get purchageOrder inprequest.params.purchageOrderIdestbody
      const { purchageOrderName } = request.body;
      // find the purchageOrder by id from the database
      const purchageOrder = await PurchaseOrder.findById(purchageOrderId);
      // if the purchageOrder does not exist, return an error
      if (!purchageOrder) {
        return response
          .status(400)
          .json({ message: "purchageOrder not found" });
      }
      // update the purchageOrder if the purchageOrder exists
      if (purchageOrderName)
        purchageOrder.purchageOrderName = purchageOrderName;
      //save the updated purchageOrder to the database
      const updatedpurchageOrder = await purchageOrder.save();
      //return the updated purchageOrder to front end
      response.json({
        message: "purchageOrder updated",
        purchageOrder: updatedpurchageOrder,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  deletepurchageOrderById: async (request, response) => {
    try {
      // get the purchageOrder id  from the request object
      const purchageOrderId = request.params.purchageOrderId;
      // find the purchageOrder by id from the database
      const purchageOrder = await PurchaseOrder.findById(purchageOrderId);
      if (!purchageOrder) {
        return response
          .status(400)
          .json({ message: "purchageOrder not found" });
      }
      //if the purchageOrder found, then delete the purchageOrder
      await purchageOrder.deleteOne();
      //return a suscess message
      response.json({ message: "purchageOrder has been deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};
module.exports = purchageOrderController;

