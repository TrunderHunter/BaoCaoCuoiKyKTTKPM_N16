import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import Exception from "../exceptions/Exception.js";
import jwt from "jsonwebtoken";

// Login with studentId and password
const login = async ({ studentId, password }) => {
  let existingUser = await User.findOne({ studentId: studentId }).exec();
  if (existingUser) {
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (isMatched) {
      // Create JWT token
      let token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        { expiresIn: "10 days" }
      );
      // clone and add more properties
      return {
        ...existingUser.toObject(),
        password: `Not show`,
        token: token,
      };
    } else {
      throw new Exception("Password not matched");
    }
  } else {
    throw new Exception("User not found");
  }
};

const register = async ({ studentId, password }) => {
  let existUser = await User.findOne({ studentId: studentId }).exec();
  if (!!existUser) {
    throw new Error("Student ID already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );

  // insert new user to database
  const newUser = new User({
    studentId,
    password: hashedPassword,
  });

  await newUser.save();

  return newUser;
};

export default {
  login,
  register,
};
