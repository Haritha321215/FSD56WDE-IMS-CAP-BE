const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema({
  productName: {
    type: mongoose.Schema.Types.String,
    ref: "Product",
    required: true,
  },
  drawer_number: { type: String, required: true }, // Drawer number where the product is stored
  openingStock: { type: Number, required: true, default: 0 },
  inStock: { type: Number, required: true, default: 0 },
  outStock: { type: Number, required: true, default: 0 },
  closingStock: { type: Number, required: true, default: 0 },
  totalStockBuyingPrice: { type: Number, default: 0 }, // Minimum threshold quantity for reordering
  totalStockSellingPrice: { type: Number, default: 0 }, // Minimum threshold quantity for reordering
  max_quantity: { type: Number }, // Maximum threshold quantity
  min_quantity: { type: Number }, // Maximum threshold quantity
  reorder_level: { type: Number }, // Minimum quantity at which the product triggers a reorder
  reorder_required: { type: Boolean, default: false},
  last_updated: { type: Date, default: Date.now },
});
const Inventory = mongoose.model("Inventory", inventorySchema, "inventory");
module.exports = Inventory;