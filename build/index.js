"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

require("dotenv/config");

var _api = require("./api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));

if (process.env && process.env.ENV === "local") {
  _mongoose["default"].connect(process.env.DB_CONNECT);
} else {
  //Connect to mlab
  _mongoose["default"].connect("mongodb+srv://mkozachok:MTeam2019@cluster0-klifg.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
  });
}

app.use(_api.router);
app.get("/", function (req, res) {
  return res.status(200).send({
    success: "true",
    message: "done"
  });
});
app.listen(process.env.PORT || 5000);
//# sourceMappingURL=index.js.map