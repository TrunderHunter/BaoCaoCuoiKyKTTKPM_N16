import mongoose from "mongoose";
import { Schema } from "mongoose";

const LopHocPhanSchema = new mongoose.Schema({
  maLHP: {
    type: String,
    unique: true,
    required: true,
  },
  maMonHoc: {
    type: String,
    required: true,
  },
  tenLHP: {
    type: String,
    required: true,
  },
  siSoToiDa: {
    type: Number,
    required: true,
  },
  daDangKy: {
    // Giá trị mặc định là 0
    type: Number,
    default: 0,
  },
  trangThai: {
    type: String,
    enum: ["Đã Khóa", "Chờ sinh viên đăng ký", "Đã hủy"],
    required: true,
  },
  maSinhVien: [
    {
      type: String,
    },
  ],
  thoiKhoaBieu: {
    type: Schema.Types.ObjectId,
    ref: "ThoiKhoaBieu",
    unique: true,
  },
});

export default mongoose.model("LopHocPhan", LopHocPhanSchema);
