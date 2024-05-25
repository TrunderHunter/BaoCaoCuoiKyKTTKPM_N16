import LopHocPhanRep from "../repositories/LopHocPhanRep.js";
import Exception from "../exceptions/Exception.js";
import HttpStatus from "../exceptions/HttpStatusCode.js";

const getAllLopHocPhan = async (req, res) => {
  try {
    const lopHocPhan = await LopHocPhanRep.getAllLHP();
    return res.status(HttpStatus.OK).json(lopHocPhan);
  } catch (error) {
    throw new Exception(error.message);
  }
};

const getListLopHocPhanByMaMonHoc = async (req, res) => {
  const { maMonHoc } = req.params;
  const lopHocPhan = await LopHocPhanRep.getListLHPByMaMonHoc(maMonHoc);
  if (!lopHocPhan) {
    throw new Exception("LopHocPhan not found", HttpStatus.NOT_FOUND);
  }
  return res.status(HttpStatus.OK).json(lopHocPhan);
};

const dangKyHocPhan = async (req, res) => {
  try {
    const { maLopHocPhan, maSinhVien } = req.body;

    if (!maLopHocPhan || !maSinhVien) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Thiếu thông tin đăng ký" });
    }

    const lopHocPhan = await LopHocPhanRep.dangKyHocPhan(
      maLopHocPhan,
      maSinhVien
    );
    return res.status(HttpStatus.OK).json(lopHocPhan);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const huyDangKyHocPhan = async (req, res) => {
  try {
    const { maLopHocPhan, maSinhVien } = req.body;
    if (!maLopHocPhan || !maSinhVien) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Thiếu thông tin hủy đăng ký" });
    }
    const lopHocPhan = await LopHocPhanRep.huyDangKyHocPhan(
      maLopHocPhan,
      maSinhVien
    );
    return res.status(HttpStatus.OK).json({
      message: "Hủy đăng ký thành công",
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const getListLHPByMaSinhVien = async (req, res) => {
  try {
    const { maSinhVien } = req.params;
    const lopHocPhan = await LopHocPhanRep.getListLHPByMaSinhVien(maSinhVien);
    return res.status(HttpStatus.OK).json({
      message: "Danh sách lớp học phần của sinh viên",
      data: lopHocPhan,
    });
  } catch (error) {
    throw new Exception(error.message);
  }
};

export default {
  getAllLopHocPhan,
  getListLopHocPhanByMaMonHoc,
  dangKyHocPhan,
  huyDangKyHocPhan,
  getListLHPByMaSinhVien,
};
