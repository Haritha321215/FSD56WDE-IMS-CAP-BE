// business logic
// import the order model
const Order = require("../models/order");
const Product = require("../models/product");
//define the order controller
const orderController = {
  addOrder: async (request, response) => {
    try {
      const { customerName, productName, quantity } = request.body;
      console.log(customerName, productName, quantity);
      // Find the product by name in the product collection
      const product = await Product.findOne({ productName });
      if (!product) {
        return response.status(404).json({ error: "product not found" });
      }
      console.log("product found" + product.productName);
      // checks if the order is already in the database
      // need to create order model
      const order = await Order.findOne({ productName });
      // if order exits, return an error
      //other wise create new order object and save it in db
      if (order) {
        return response.status(400).json({ message: "Order already exists" });
      }
      // if order does not exits create new order
      const totalAmount = quantity*product.buying_price;
      const newOrder = new Order({
        customerName: customerName,
        product: product._id,
        quantity: quantity,
        total_amount:totalAmount
      });
      // save the order in database
      const saveOrder = await newOrder.save();
      await Order.collection.dropIndexes();
      // return the saved order respose to the front end
      response.status(201).json({
        message: "order created successfully",
        order: saveOrder,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getOrderById: async (request, response) => {
    try {
      // get the order id  from the request object
      const orderId = request.params.orderId;
      // find the order by id from the database
      const order = await Order.findById(orderId);
      // if the order does nt exist, return an error
      if (!order) {
        return response.status(400).json({ message: "Order not found" });
      }
      //if the order found
      response.json({ message: "order found", order });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getOrders: async (request, response) => {
    try {
      // find the orders from the database
      const orders = await Order.find();
      // if the orders does nt exist, return an error
      if (!orders) {
        return response.status(400).json({ message: "Orders not found" });
      }
      //if the order found
      response.json({ message: "orders found", orders });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  updateOrderById: async (request, response) => {
    try {
      // get the order id  from the request object
      const orderId = request.params.orderId;
      // get order inprequest.params.orderIdestbody
      const { orderName } = request.body;
      // find the order by id from the database
      const order = await Order.findById(orderId);
      // if the order does not exist, return an error
      if (!order) {
        return response.status(400).json({ message: "Order not found" });
      }
      // update the order if the order exists
      if (orderName) order.orderName = orderName;
      //save the updated order to the database
      const updatedOrder = await order.save();
      //return the updated order to front end
      response.json({ message: "order updated", order: updatedOrder });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  deleteOrderById: async (request, response) => {
    try {
      // get the order id  from the request object
      const orderId = request.params.orderId;
      // find the order by id from the database
      const order = await Order.findById(orderId);
      if (!order) {
        return response.status(400).json({ message: "Order not found" });
      }
      //if the order found, then delete the order
      await order.deleteOne();
      await Order.collection.dropIndexes();
      //return a suscess message
      response.json({ message: "order has been deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};
module.exports = orderController;