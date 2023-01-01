import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/admin/WinnerQrCode/GetWinnerQrCodes?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&search=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const approve = async (body) => {
  try {
    const response = await axios.patch(
      "/api/admin/WinnerQrCode/Approve?id=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const reject = async (body) => {
  try {
    const response = await axios.patch(
      "/api/admin/WinnerQrCode/Reject?id=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
