import { Product } from "./model";

const create = function(data, callback) {
  const newProduct = Product(data);
  newProduct.save(err => {
    if (err) throw err;
    if (callback) {
      callback(newProduct);
    }
  });
};

const get = function(id, callback) {
  Product.findById(id, (err, product) => {
    if (err) throw err;
    callback(product);
  });
};

const getAll = function(callback) {
  Product.find({}, (err, product) => {
    if (err) throw err;
    callback(product);
  });
};

const update = function(data, callback) {
  Product.findById(data._id, (err, product) => {
    if (err) throw err;

    product.title = data.title;
    product.price = data.price;
    product.description = data.description;
    product.previewImage = data.previewImage;

    product.save(function(err) {
      if (err) throw err;
      callback(product);
    });
  });
};

const remove = function(id, callback) {
  Product.findByIdAndRemove(id, err => {
    if (err) throw err;
    callback();
  });
};

export const productApi = {
  get,
  getAll,
  create,
  update,
  remove
};
