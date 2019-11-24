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

if (process.env && process.env.ENV === "local2") {
  mongoose.connect(process.env.DB_CONNECT);
} else {
  //Connect to mlab
  mongoose.connect(
    // "mongodb+srv://mkozachok:MTeam2019@cluster0-klifg.mongodb.net/test?retryWrites=true&w=majority",
    "mongodb+srv://admin:ndhFqHe53Er0bHGk@cluster0-xx9qb.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
}

app.use(router);
app.get("/", (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "done"
  });
});
app.listen(process.env.PORT || 5000);
