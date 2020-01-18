import { Order } from "./model";
import { createCommonCtrl } from "../common/controller";

const create = function(data, callback) {
  const newOrder = Order(data);
  newOrder.save(err => {
    if (err) throw err;
    if (callback) {
      callback(newOrder);
    }
  });
};

const get = function(id, callback) {
  Order.findById(id, (err, order) => {
    if (err) throw err;
    callback(order);
  });
};

const getAll = function(callback) {
  Order.find({}, (err, order) => {
    if (err) throw err;
    callback(order);
  });
};

export const orderApi = {...createCommonCtrl(Order)};
