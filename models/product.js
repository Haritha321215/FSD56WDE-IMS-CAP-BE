// require mongoose
// require mongoose
const mongoose = require("mongoose");
// create a schema
const productSchema = new mongoose.Schema({
  // product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  productName: {
    type: String,
    required: true,
    unique: true,
  }, // Name of the product
  description: { type: String, required: true }, // Description of the product
  category: {
    type: String,
    ref: "Category",
    required: true,
  }, // Reference to the category the product belongs to
  buying_price: { type: Number, required: true }, // Buying price of the product
  selling_price: { type: Number, required: true }, // Selling price of the product
  unit: { type: String }, // Unit of measurement for the product
  vendor: {
    type: String,
    ref: "Vendor",
    required: true,
  }, // Vendor information for the product
  drawer_number: { type: String }, // Drawer number where the product is stored
  reorder_level: { type: Number }, // Minimum quantity at which the product triggers a reorder
  // tags: [{ type: String }], // Tags associated with the product
  created_at: { type: Date, default: Date.now }, // Timestamp for when the product was created
  updated_at: { type: Date, default: Date.now }, // Timestamp for when the product was last updated
});
// create a model and export it
// Product is model, products is collection
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;