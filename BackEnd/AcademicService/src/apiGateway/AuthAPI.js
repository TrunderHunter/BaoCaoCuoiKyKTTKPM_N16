import axios from "axios";

const register = (studentId, password) => {
  try {
    return axios.post("http://localhost:3002/users/register", {
      studentId,
      password,
    });
  } catch (error) {
    return error;
  }
};

export default {
  register,
};
