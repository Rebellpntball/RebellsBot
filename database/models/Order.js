const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String, required: true, index: true },
  serverId: { type: String, required: true },
  status: { type: String, enum: ['open', 'processing', 'fulfilled', 'cancelled'], default: 'open', index: true },
  items: [{ name: String, className: String, price: Number, qty: { type: Number, default: 1 } }],
  total: { type: Number, default: 0 },
  isKit: { type: Boolean, default: false },
  notes: { type: String, default: '' },
  fulfilledBy: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Order', orderSchema);
