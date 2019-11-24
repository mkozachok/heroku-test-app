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

if (process.env && process.env.ENV === "local") {
  mongoose.connect(process.env.DB_CONNECT);
} else {
  //Connect to mlab
  mongoose.connect(
    "mongodb+srv://mkozachok:MTeam2019@cluster0-klifg.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
}

app.use(router);
app.listen(process.env.PORT || 5000);
