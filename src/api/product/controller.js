import { Product } from "./model";

const create = function(data, callback) {
  const newProduct = Product(data);
  newProduct.save(err => {
    if (err) throw err;
    if (callback) {
      callback(newProduct);
    }
    console.log("Product created!");
  });
};

export const productApi = {
  create
};
