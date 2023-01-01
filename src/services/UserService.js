import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/admin/user/GetUsers?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&search=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getById = async (body) => {
  try {
    const response = await axios.get("/api/admin/user/GetUser/" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const unBlock = async (body) => {
  try {
    const response = await axios.patch("/api/admin/users/approveuser/" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const block = async (body) => {
  try {
    const response = await axios.patch("/api/admin/user/BlockUser?id=" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteSomething = async (body) => {
  try {
    const response = await axios.patch("/api/admin/user/DeleteUser?id=" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const update = async (id, body) => {
  try {
    const response = await axios.put("/api/admin/users/updateuser/" + id, body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const uploadImage = async (body) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.post(
      "/api/admin/users/UploadProfilePicture",
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
