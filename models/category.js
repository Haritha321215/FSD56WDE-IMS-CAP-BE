const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true, unique: true }, // Name of the category
  description: { type: String }, // Description of the category
  created_at: { type: Date, default: Date.now }, // Timestamp for when the category was created
  updated_at: { type: Date, default: Date.now } // Timestamp for when the category was last updated
});
const Category = mongoose.model('Category', categorySchema,'categories');
module.exports = Category;