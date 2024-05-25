import { body, validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const myEvent = new EventEmitter();
myEvent.on("event.register.user", (params) => {
  // console.log(`Event register user:  ${JSON.stringify(params)}`);
});

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { studentId, password } = req.body;
  try {
    let existingUser = await userRepository.login({ studentId, password });
    res.status(HttpStatusCode.OK).json({
      message: "Login success",
      data: existingUser,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  const { studentId, password } = req.body;

  // Event Emitter
  myEvent.emit("event.register.user", {
    studentId,
    password,
  });

  try {
    debugger;
    const user = await userRepository.register({
      studentId,
      password,
    });

    res.status(HttpStatusCode.CREATED).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Error occurred while registering user",
      error: error.message,
    });
  }
};

export default { login, register };
