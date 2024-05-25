import MonHoc from "../models/monHoc.js";
import ChuyenNganh from "../models/ChuyenNganh.js";

let createMonHoc = async (data) => {
  try {
    let result = await MonHoc.create(data);

    // Update dsMonHoc of ChuyenNganh
    await ChuyenNganh.findOneAndUpdate(
      { maChuyenNganh: data.maChuyenNganh },
      { $push: { dsMonHoc: result.maMonHoc } },
      { new: true }
    ).exec();

    return result;
  } catch (error) {
    return error;
  }
};

// Lấy danh sách môn học tien quyet theo maMonHoc
let getMonHocTienQuyet = async (maMonHoc) => {
  try {
    let monHoc = await MonHoc.findOne({ maMonHoc: maMonHoc });
    let listMonHocTienQuyet = monHoc.dsMonHocTienQuyet;

    let result = await MonHoc.find({ maMonHoc: { $in: listMonHocTienQuyet } });

    return result;
  } catch (error) {
    return error;
  }
};

let getAllMonHoc = async () => {
  try {
    let result = await MonHoc.find();
    return result;
  } catch (error) {
    return error;
  }
};

export default {
  createMonHoc,
  getMonHocTienQuyet,
  getAllMonHoc,
};
