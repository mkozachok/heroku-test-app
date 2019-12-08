import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import { router } from "./api";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });

app.use(router);
app.get("/", (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "done"
  });
});
app.listen(process.env.PORT || 5000);
