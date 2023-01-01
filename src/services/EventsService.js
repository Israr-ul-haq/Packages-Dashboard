import axios from "../constants/AxiosConfig";

export const saveEvent = async (body) => {
  try {
    const response = await axios.post("/api/admin/event/SaveEvent", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateEvent = async (id, body) => {
  try {
    const response = await axios.put(
      `/api/admin/Event/UpdateEvent/${id}`,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const uploadImage = async (body) => {
  debugger;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.post(
      `/api/admin/event/UploadEventPicture`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const get = async (body) => {
  try {
    const response = await axios.get(`/api/admin/event/GetEvents`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getEventById = async (id) => {
  try {
    const response = await axios.get(`/api/admin/event/GetEvent/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getEventDate = async (date) => {
  try {
    const response = await axios.get(
      `/api/admin/event/GetEventsByDate?date=${date}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteSomething = async (id) => {
  try {
    const response = await axios.patch(`/api/admin/event/DeleteEvent?id=${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
