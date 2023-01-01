import axios from "../constants/AxiosConfig";

export const getById = async (body) => {
  try {
    const response = await axios.get("/api/admin/Profile/GetProfile/" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const update = async (id, body) => {
  try {
    const response = await axios.put(
      "/api/admin/Profile/UpdateProfile/" + id,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateProfile = async (body) => {
  debugger;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.post(
      `/api/admin/profile/UploadProfilePicture`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
