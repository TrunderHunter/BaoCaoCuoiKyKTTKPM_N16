import express from "express";
import * as dotenv from "dotenv";
import { userRouter } from "./routes/index.js";
// authentication middleware
import checkToken from "./authentication/auth.js";
dotenv.config();
import { connect } from "./database/database.js";
const app = express();
app.use(checkToken);
app.use(express.json());

const PORT = process.env.PORT || 3000;

// routes
app.use("/users", userRouter);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
