import express from "express";
import {orderValidation} from './validation'
import { orderApi } from "./controller";

export const orderRouter = express.Router();

orderRouter.get("/", function(req, res) {
  orderApi.getAll(data => {
    res.status(200).send({ data });
  });
});


orderRouter.get("/:id", function(req, res) {
  var id = req.params.id;
  orderApi.get(id, order => {
    if (order) {
      return res.status(200).send({ data: order });
    }
    return res.status(404).send({
      success: "false",
      message: "order not found"
    });
  });
});

// POST
orderRouter.post("/", function(req, res) {
  const error = orderValidation(req.body);

  if (!!error) {
    return res.status(400).send({
      success: "false",
      message: error
    });
  }

  orderApi.create(req.body, newOrder => {
    res.status(201).send({
      success: "true",
      message: "order added successfully",
      data: newOrder
    });
  });
});
