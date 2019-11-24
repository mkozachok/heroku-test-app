"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _controller = require("./controller");

var _validation = require("./validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productRouter = _express["default"].Router(); // productRouter.use((req, res, next) => {
//   console.log("Log request");
//   next();
// });


exports.productRouter = productRouter;
productRouter.get("/", function (req, res) {
  _controller.productApi.getAll(function (data) {
    res.status(200).send({
      data: data
    });
  });
});
productRouter.get("/:id", function (req, res) {
  var id = req.params.id;

  _controller.productApi.get(id, function (product) {
    if (product) {
      return res.status(200).send({
        data: product
      });
    }

    return res.status(404).send({
      success: "false",
      message: "product not found"
    });
  });
}); // POST

productRouter.post("/", function (req, res) {
  var error = (0, _validation.productValidation)(req.body);

  if (!!error) {
    return res.status(400).send({
      success: "false",
      message: error
    });
  }

  _controller.productApi.create(req.body, function (newProduct) {
    res.status(201).send({
      success: "true",
      message: "product added successfully",
      data: newProduct
    });
  });
}); // PUT

productRouter.put("/", function (req, res) {
  var error = (0, _validation.productValidation)(req.body);

  if (!!error) {
    return res.status(400).send({
      success: "false",
      message: error
    });
  }

  _controller.productApi.update(req.body, function (updatedProduct) {
    res.status(201).send({
      success: "true",
      message: "product updated successfully",
      data: updatedProduct
    });
  });
}); // DELETE

productRouter["delete"]("/:id", function (req, res) {
  var id = req.params.id;

  _controller.productApi.remove(id, function () {
    return res.status(200).send({
      success: "true",
      message: "product deleted successfully"
    });
  });
});
//# sourceMappingURL=routes.js.map