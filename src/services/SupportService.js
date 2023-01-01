import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/admin/Support/GetQueries?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&search=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (body) => {
  try {
    const response = await axios.post(`/api/admin/Support/ReplyQueries`, body);
    return response;
  } catch (error) {
    return error.response;
  }
};
