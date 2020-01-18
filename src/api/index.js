import express from "express";
import { productRouter } from "./product/routes";
import { orderRouter } from "./order/routes";

export const router = express.Router();

// Products
router.use("/products", productRouter);
router.use("/orders", orderRouter);
