const mongoose = require("mongoose");
const stockSchema = new mongoose.Schema({
  productName: {
    type: mongoose.Schema.Types.String,
    ref: "Product",
    required: true,
  }, // Reference to the product
  stockQuantity: { type: Number, required: true }, // Quantity of the product in stock
  drawer_number: {
    type: String,
    required: true,
  },
  min_quantity: {
    type: Number,
    required: true,
  }, // Reference to the product
  max_quantity: { type: Number }, // Maximum threshold quantity
  buying_price: {
    type: Number,
    required: true,
  },
  selling_price: {
    type: mongoose.Schema.Types.Number,
    ref: "Product",
    required: true,
  },
  total_buying_price: { type: Number, required: true },
  total_selling_price: { type: Number, required: true },
  last_updated: { type: Date, default: Date.now }, // Timestamp for when the stock was last updated
});
const Stock = mongoose.model("Stock", stockSchema, "stocks");
module.exports = Stock;
