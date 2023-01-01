import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(`/api/admin/user/GetHeatMapUsers`);
    return response;
  } catch (error) {
    return error.response;
  }
};
