"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productValidation = void 0;

var productValidation = function productValidation(product) {
  if (!product.title) {
    return "title is required";
  } else if (!product.description) {
    return "description is required";
  } else if (!product.price) {
    return "price is required";
  }
};

exports.productValidation = productValidation;