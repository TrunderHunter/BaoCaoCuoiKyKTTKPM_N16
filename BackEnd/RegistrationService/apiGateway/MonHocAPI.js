import axios from "axios";
import Exception from "../exceptions/Exception.js";

const getMonHocTienQuyet = async (maMonHoc) => {
  // http://localhost:4040/api/monHoc/getMonHocTienQuyet/4203014165
  try {
    const response = await axios.get(
      `http://localhost:4040/api/monHoc/getMonHocTienQuyet/${maMonHoc}`
    );
    return response.data.data;
  } catch (error) {
    throw new Exception(error.message);
  }
};

export default {
  getMonHocTienQuyet,
};
