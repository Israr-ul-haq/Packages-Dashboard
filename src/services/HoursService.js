import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(`/api/vendor/product/GetOpeningHours`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const put = async (body) => {
  try {
    const response = await axios.put(
      "/api/vendor/product/UpdateOpeningHour",
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
