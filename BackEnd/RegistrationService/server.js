import express from "express";
import * as dotenv from "dotenv";
// authentication middleware
dotenv.config();
import { connect } from "./database/database.js";
import { lopHocPhanRouter } from "./routes/index.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/LopHocPhan", lopHocPhanRouter);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
