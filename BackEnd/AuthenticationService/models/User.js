import { Schema, ObjectId } from "mongoose";
import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
export default mongoose.model(
  "User",
  new Schema({
    id: { type: ObjectId },
    // Mã số sinh viên
    studentId: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => {
          return v.length > 6;
        },
        message: "Student ID must be longer than 6 characters",
      },
    },
    password: {
      type: String,
      required: true, // Not null
      validate: {
        validator: (v) => {
          return v.length >= 6;
        },
        message: "Password must be longer than 6 characters",
      },
    },
  })
);
