"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Product = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productSchema = new _mongoose["default"].Schema({
  title: String,
  description: String,
  price: Number,
  previewImage: String,
  created_at: Date,
  updated_at: Date
});
productSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

var Product = _mongoose["default"].model('Product', productSchema);

exports.Product = Product;
//# sourceMappingURL=model.js.map