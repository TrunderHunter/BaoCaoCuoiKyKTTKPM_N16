import express from "express";
import { LopHocPhanController } from "../controllers/index.js";

const lopHocPhanRouter = express.Router();

lopHocPhanRouter.get("/", LopHocPhanController.getAllLopHocPhan);

lopHocPhanRouter.get(
  "/:maMonHoc",
  LopHocPhanController.getListLopHocPhanByMaMonHoc
);

lopHocPhanRouter.post("/dangKyHocPhan", LopHocPhanController.dangKyHocPhan);

lopHocPhanRouter.post(
  "/huyDangKyHocPhan",
  LopHocPhanController.huyDangKyHocPhan
);

lopHocPhanRouter.get(
  "/getLopHocPhanByMaSinhVien/:maSinhVien",
  LopHocPhanController.getListLHPByMaSinhVien
);

export default lopHocPhanRouter;
