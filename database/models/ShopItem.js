const mongoose = require('mongoose');
const shopItemSchema = new mongoose.Schema({
  catalog: { type: String, default: 'default', index: true },
  className: { type: String, required: true },
  displayName: { type: String, required: true },
  category: { type: String, default: 'Misc', index: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
  game: { type: String, default: 'dayz', index: true },
  enabled: { type: Boolean, default: true },
  isKit: { type: Boolean, default: false },
  kitItems: [{ className: String, qty: Number }],
});
shopItemSchema.index({ catalog: 1, className: 1 }, { unique: true });
module.exports = mongoose.model('ShopItem', shopItemSchema);
