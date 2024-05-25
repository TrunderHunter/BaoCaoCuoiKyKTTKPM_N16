import { LopHocPhan, DiemSo } from "../models/index.js";
import Exception from "../exceptions/Exception.js";
import MonHocAPI from "../apiGateway/MonHocAPI.js";
import SinhVienAPI from "../apiGateway/SinhVienAPI.js";

const getAllLHP = async () => {
  try {
    return await LopHocPhan.find();
  } catch (error) {
    throw new Exception(error.message);
  }
};

const getListLHPByMaMonHoc = async (maMonHoc) => {
  try {
    return await LopHocPhan.find({ maMonHoc: maMonHoc });
  } catch (error) {
    throw new Exception(error.message);
  }
};

const getMonHocDaHoc = async (maSV) => {
  try {
    let dsMonHocDaHoc = await SinhVienAPI.getMonHocDaHoc(maSV);
    let maMonHocArray = dsMonHocDaHoc.data[0].dsMonHocDaHoc.map(
      (monHoc) => monHoc.maMonHoc
    );
    return maMonHocArray;
  } catch (error) {
    throw new Exception(error.message);
  }
};

const getMonHocTienQuyet = async (maMonHoc) => {
  try {
    let dsMonHocTiengQuyet = await MonHocAPI.getMonHocTienQuyet(maMonHoc);
    let maMonHocArray = dsMonHocTiengQuyet.map((monHoc) => monHoc.maMonHoc);
    return maMonHocArray;
  } catch (error) {
    throw new Exception(error.message);
  }
};

const dangKyHocPhan = async (maLopHocPhan, maSinhVien) => {
  try {
    let lopHocPhan = await LopHocPhan.findOne({ maLHP: maLopHocPhan });
    let diemSo = await DiemSo.findOne({
      maSinhVien: maSinhVien,
      maLHP: maLopHocPhan,
    });
    if (!lopHocPhan) {
      throw new Exception("Lớp học phần không tồn tại");
    }
    if (diemSo) {
      throw new Exception(
        "Điểm số với mã sinh viên và mã lớp học phần đã tồn tại"
      );
    }

    let dsMonHocDaHoc = await getMonHocDaHoc(maSinhVien);
    let dsMonHocTienQuyet = await getMonHocTienQuyet(lopHocPhan.maMonHoc);

    let check = dsMonHocTienQuyet.every((monHoc) =>
      dsMonHocDaHoc.includes(monHoc)
    );

    if (check) {
      let diemSo = new DiemSo({
        maSinhVien: maSinhVien,
        maLHP: maLopHocPhan,
      });
      await diemSo.save();
      return "Đăng ký học phần thành công";
    } else {
      throw new Exception(
        "Đăng ký học phần thất bại, bạn chưa học môn tiên quyết"
      );
    }
  } catch (error) {
    throw new Exception(error.message);
  }
};

const huyDangKyHocPhan = async (maLopHocPhan, maSinhVien) => {
  try {
    let lopHocPhan = await LopHocPhan.findOne({ maLHP: maLopHocPhan });
    let diem = await DiemSo.findOne({
      maSinhVien: maSinhVien,
      maLHP: maLopHocPhan,
    });

    if (!lopHocPhan) {
      throw new Exception("Lớp học phần không tồn tại");
    }

    if (lopHocPhan.trangThai === "Đã Khóa") {
      throw new Exception("Không thể hủy lớp học phần đã khóa");
    }

    if (!diem) {
      throw new Exception("Sinh viên chưa đăng ký học phần này");
    }

    await DiemSo.deleteOne({ maSinhVien: maSinhVien, maLHP: maLopHocPhan });
    return "Hủy đăng ký học phần thành công";
  } catch (error) {
    throw new Exception(error.message);
  }
};

const getListLHPByMaSinhVien = async (maSinhVien) => {
  try {
    const diemSoRecords = await DiemSo.find({ maSinhVien: maSinhVien });

    if (diemSoRecords.length === 0 || !diemSoRecords) {
      return [];
    }

    const maLHPArray = diemSoRecords.map((record) => record.maLHP);

    const lopHocPhanRecords = await LopHocPhan.find({
      maLHP: { $in: maLHPArray },
    });

    return lopHocPhanRecords;
  } catch (error) {
    throw new Exception(error.message);
  }
};

export default {
  getAllLHP,
  getListLHPByMaMonHoc,
  dangKyHocPhan,
  huyDangKyHocPhan,
  getListLHPByMaSinhVien,
};
