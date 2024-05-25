import mongoose from "mongoose";

const DiemSoSchema = new mongoose.Schema({
  maSinhVien: {
    type: String,
    required: true,
  },
  diemTK: {
    // Default value is an empty array
    type: [Number],
    default: [],
  },
  diemGK: {
    // Default value is null
    type: Number,
    default: null,
  },
  diemCK: {
    // Default value is null
    type: Number,
    default: null,
  },
  diemTB: {
    type: Number,
  },
  maLHP: {
    type: String,
    ref: "LopHocPhan",
  },
});

DiemSoSchema.index({ maSinhVien: 1, maLHP: 1 }, { unique: true });

DiemSoSchema.pre("save", function (next) {
  if (
    this.diemTK.every((diem) => diem != null) &&
    this.diemGK != null &&
    this.diemCK != null
  ) {
    this.diemTB =
      (this.diemTK.reduce((a, b) => a + b, 0) * 2 +
        this.diemGK * 3 +
        this.diemCK * 5) /
      10;
  }
  next();
});

export default mongoose.model("DiemSo", DiemSoSchema);
