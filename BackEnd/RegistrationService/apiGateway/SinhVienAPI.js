import axios from "axios";
import Exception from "../exceptions/Exception.js";

const getMonHocDaHoc = async (maSV) => {
  try {
    const response = await axios.get(
      `http://localhost:4040/api/hocThuat/getMonHocDaHoc?maSV=${maSV}`
    );
    return response.data;
  } catch (error) {
    throw new Exception(error.message);
  }
};

export default {
  getMonHocDaHoc,
};
