import mongoose from "mongoose";
import { print, OutputType } from "../helpers/print.js";
mongoose.set("strictQuery", true);

async function connect() {
  try {
    let connection = await mongoose.connect(
      "mongodb://root:123456@localhost:27018/AuthDB?authSource=admin"
    );
    print(
      `Database connected: ${connection.connection.host}`,
      OutputType.SUCCESS
    );
    return connection;
  } catch (error) {
    const { code } = error;
    print(`Database connection error: ${error}`, OutputType.ERROR);
  }
}

export { connect };
