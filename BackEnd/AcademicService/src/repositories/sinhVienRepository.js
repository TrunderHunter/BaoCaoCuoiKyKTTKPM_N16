import SinhVien from "../models/SinhVien.js";
import LopHoc from "../models/LopHoc.js";
import MonHoc from "../models/monHoc.js";
import AuthAPI from "../apiGateway/AuthAPI.js";

let createSinhVien = async (sinhVien) => {
  try {
    // Nếu sinh viên tồn tại thì không thêm
    let existedSinhVien = await SinhVien.findOne({ maSV: sinhVien.maSV });
    if (existedSinhVien) {
      throw new Error("Sinh viên đã tồn tại");
    }

    let newSinhVien = await SinhVien.create(sinhVien);

    // Register tai khoan cho sinh vien
    await AuthAPI.register({
      studentId: newSinhVien.maSV,
      password: newSinhVien.maSV,
    });

    // Update maSV to dsSinhVien in LopHoc(maLopHoc)
    await LopHoc.findOneAndUpdate(
      { maLopHoc: newSinhVien.maLopHoc },
      { $push: { dsSinhVien: newSinhVien.maSV } }
    );

    return newSinhVien;
  } catch (error) {
    throw error;
  }
};

//Lấy danh sách môn học sinh viên chưa học
let getMonHocChuaHoc = async (maSV) => {
  try {
    let sinhVien = await SinhVien.findOne({ maSV: maSV }).populate(
      "dsMonHocDaHoc"
    );

    let dsMonHocDaHoc = sinhVien.dsMonHocDaHoc.map((monHoc) => monHoc.maMH);
    let dsMonHocDangHoc = sinhVien.dsMonHocDangHoc.map((monHoc) => monHoc.maMH);

    let dsMonHocChuaHoc = await MonHoc.find({
      maMH: { $nin: [...dsMonHocDaHoc, ...dsMonHocDangHoc] },
    });

    return dsMonHocChuaHoc;
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách môn học sinh viên đang học
let getMonHocDangHoc = async (maSV) => {
  try {
    let sinhVien = await SinhVien.findOne({ maSV: maSV }).populate(
      "dsMonHocDangHoc"
    );

    return sinhVien.dsMonHocDangHoc;
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách môn học từ môn học sinh viên đã học
let getMonHocDaHoc = async (maSV) => {
  try {
    let sinhVien = await SinhVien.aggregate([
      { $match: { maSV: maSV } },
      {
        $lookup: {
          from: "monhocs",
          localField: "dsMonHocDaHoc",
          foreignField: "maMonHoc",
          as: "dsMonHocDaHoc",
        },
      },
      {
        $project: {
          _id: 0,
          dsMonHocDaHoc: 1,
        },
      },
    ]);

    return sinhVien;
  } catch (error) {
    throw error;
  }
};

export default {
  createSinhVien,
  getMonHocChuaHoc,
  getMonHocDangHoc,
  getMonHocDaHoc,
};
