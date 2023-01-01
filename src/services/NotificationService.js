import axios from "../constants/AxiosConfig";

export const sendNotification = async (body) => {
  try {
    const response = await axios.post(
      `/api/admin/notification/SaveNotification`,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
