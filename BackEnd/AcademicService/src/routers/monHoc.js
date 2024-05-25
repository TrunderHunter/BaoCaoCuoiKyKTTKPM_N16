import express from "express";
import { monHocController } from "../controllers/index.js";

const monHocRouter = express.Router();

monHocRouter.get(
  "/getMonHocTienQuyet/:maMonHoc",
  monHocController.getMonHocTienQuyet
);

monHocRouter.get("/getALlMonHoc", monHocController.getAllMonHoc);

export default monHocRouter;
