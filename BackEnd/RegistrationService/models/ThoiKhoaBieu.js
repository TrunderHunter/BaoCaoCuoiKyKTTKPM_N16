import mongoose from "mongoose";

const ThoiKhoaBieuSchema = new mongoose.Schema({
  lichHoc: {
    type: String,
    required: true,
  },
  phong: {
    type: String,
    required: true,
  },
  giangVien: {
    type: String,
    required: true,
  },
  thoiGian: {
    type: String,
    required: true,
  },
});

ThoiKhoaBieuSchema.index({ lichHoc: 1, thoiGian: 1 }, { unique: true });

const ThoiKhoaBieu = mongoose.model("ThoiKhoaBieu", ThoiKhoaBieuSchema);

export default ThoiKhoaBieu;
