var Product = require('./model')

var create = function(data, callback) {
  var newProduct = Product(data);
  newProduct.save(function(err) {
    if (err) throw err;
    if (callback) {
      callback(newProduct);
    }
    console.log('Product created!');
  });
}

var productApi = {
  create: create
}

module.exports = productApi;

