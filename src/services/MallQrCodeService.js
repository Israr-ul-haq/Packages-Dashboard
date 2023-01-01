import axios from "../constants/AxiosConfig";

export const get = async () => {
  try {
    const response = await axios.get(`/api/admin/MallQrCode/GetMallQrCodes`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const InActiveQrCode = async (id) => {
  try {
    const response = await axios.patch(
      `/api/admin/MallQrCode/InActiveMallQrCode?id=${id}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const save = async (body) => {
  try {
    const response = await axios.post(
      "/api/admin/MallQrCode/SaveMallQrCode",
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const ActiveQrCode = async (id) => {
  try {
    const response = await axios.patch(
      `/api/admin/MallQrCode/ActiveMallQrCode?id=${id}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
