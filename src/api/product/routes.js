import express from "express";
import { productApi } from "./controller";
import { productValidation } from "./validation";

export const productRouter = express.Router();

// productRouter.use((req, res, next) => {
//   console.log("Log request");
//   next();
// });

productRouter.get("/", function(req, res) {
  productApi.getAll(data => {
    res.status(200).send({ data });
  });
});

productRouter.get("/search", function(req, res) {
  const keywords = req.query.keywords;
  if (!keywords) {
    return res.status(404).send({
      success: "false",
      message: "keywords can not be empty"
    });
  }
  productApi.findByTitle(keywords, data => {
    console.log('data', data)
    res.status(200).send(
      {success: "true", data});
  });
});

productRouter.get("/:id", function(req, res) {
  const id = req.params.id;
  productApi.get(id, product => {
    if (product) {
      return res.status(200).send({ data: product });
    }
    return res.status(404).send({
      success: "false",
      message: "product not found"
    });
  });
});

// POST
productRouter.post("/", function(req, res) {
  const error = productValidation(req.body);

  if (!!error) {
    return res.status(400).send({
      success: "false",
      message: error
    });
  }

  productApi.create(req.body, newProduct => {
    res.status(201).send({
      success: "true",
      message: "product added successfully",
      data: newProduct
    });
  });
});

// PUT
productRouter.put("/", function(req, res) {
  const error = productValidation(req.body);

  if (!!error) {
    return res.status(400).send({
      success: "false",
      message: error
    });
  }

  productApi.update(req.body, updatedProduct => {
    res.status(201).send({
      success: "true",
      message: "product updated successfully",
      data: updatedProduct
    });
  });
});

// DELETE
productRouter.delete("/:id", function(req, res) {
  const id = req.params.id;
  productApi.remove(id, () => {
    return res.status(200).send({
      success: "true",
      message: "product deleted successfully"
    });
  });
});
