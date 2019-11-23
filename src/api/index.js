import express from "express";
import { productRouter } from "./product/routes";

export const router = express.Router();

// Products
router.use("/products", productRouter);
