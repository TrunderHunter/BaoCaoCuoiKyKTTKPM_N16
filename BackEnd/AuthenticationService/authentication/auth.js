import jwt from "jsonwebtoken";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

export default function checkToken(req, res, next) {
  // bypass login, register
  if (req.path === "/users/login" || req.path === "/users/register") {
    return next();
  }
  // other requests
  // get and validate token
  //   const token = req.headers["x-access-token"];
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Token expired",
      });
      res.end();
    } else {
      next();
    }
  } catch (error) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: error.message,
    });
  }
}
