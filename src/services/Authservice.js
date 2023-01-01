import axios from "../constants/AxiosConfig";

export const login = async (body) => {
  try {
    debugger;
    const response = await axios.post("/api/admin/account/Login", body);
    debugger;
    return response;
  } catch (error) {
    return error.response;
  }
};
export const forgotPassword = async (body) => {
  try {
    const response = await axios.post(
      "/api/admin/account/forgotpassword?email=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
