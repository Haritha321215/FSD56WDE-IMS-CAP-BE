const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  contact: { type: String },
  address: { type: String },
  // products_supplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});
const Vendor = mongoose.model('Vendor', vendorSchema, 'vendors');
module.exports = Vendor;