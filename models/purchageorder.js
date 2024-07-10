const mongoose = require('mongoose');
const purchaseOrderSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }, // Reference to Supplier model
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product model
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },  
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
});
const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema, 'purchageorders');
module.exports = PurchaseOrder;