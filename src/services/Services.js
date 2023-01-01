import axios from "../constants/AxiosConfig";

export const uploadImage = async (body) => {
  debugger;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.post(
      `/api/admin/service/UploadServicePicture`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const save = async (body) => {
  try {
    const response = await axios.post("/api/admin/service/SaveService", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getById = async (id) => {
  try {
    const response = await axios.get(`/api/admin/service/GetService/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (body) => {
  try {
    const response = await axios.put("/api/admin/Service/UpdateService", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteSomething = async (body) => {
  try {
    const response = await axios.patch(
      "/api/admin/service/DeleteService?id=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
