"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productApi = void 0;

var _model = require("./model");

var create = function create(data, callback) {
  var newProduct = (0, _model.Product)(data);
  newProduct.save(function (err) {
    if (err) throw err;

    if (callback) {
      callback(newProduct);
    }
  });
};

var get = function get(id, callback) {
  _model.Product.findById(id, function (err, product) {
    if (err) throw err;
    callback(product);
  });
};

var getAll = function getAll(callback) {
  _model.Product.find({}, function (err, product) {
    if (err) throw err;
    callback(product);
  });
};

var update = function update(data, callback) {
  _model.Product.findById(data._id, function (err, product) {
    if (err) throw err;
    product.title = data.title;
    product.price = data.price;
    product.description = data.description;
    product.previewImage = data.previewImage;
    product.save(function (err) {
      if (err) throw err;
      callback(product);
    });
  });
};

var remove = function remove(id, callback) {
  _model.Product.findByIdAndRemove(id, function (err) {
    if (err) throw err;
    callback();
  });
};

var productApi = {
  get: get,
  getAll: getAll,
  create: create,
  update: update,
  remove: remove
};
exports.productApi = productApi;
//# sourceMappingURL=controller.js.map