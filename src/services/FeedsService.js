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
      `/api/admin/NewsFeed/UploadNewsFeedPicture`,
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
    const response = await axios.post("/api/admin/NewsFeed/SaveNewsFeed", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getById = async (id) => {
  try {
    const response = await axios.get(`/api/admin/NewsFeed/GetNewsFeed/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (body) => {
  try {
    const response = await axios.put(
      "/api/admin/NewsFeed/UpdateNewsFeed",
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteSomething = async (body) => {
  try {
    const response = await axios.patch(
      "/api/admin/NewsFeed/DeleteNewsFeed?id=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/admin/NewsFeed/GetNewsFeeds?PageNumber=${body.pageNumber}&PageSize==${body.pageSize}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
