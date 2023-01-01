import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/admin/shop/GetShops?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&search=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getById = async (shopId) => {
  try {
    const response = await axios.get(`/api/admin/shop/GetShop/${shopId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getCategories = async () => {
  try {
    const response = await axios.get(`/api/user/shop/GetShopCategories`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const InActiveQrCode = async (id) => {
  try {
    const response = await axios.patch(
      `/api/admin/QrCode/InActiveQrCode?id=${id}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const ActiveQrCode = async (id) => {
  try {
    const response = await axios.patch(
      `/api/admin/QrCode/ActiveQrCode?id=${id}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteSomething = async (id) => {
  try {
    const response = await axios.patch(`/api/admin/shop/DeleteShop?id=${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const update = async (body) => {
  try {
    const response = await axios.put("/api/admin/shop/UpdateShop", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const saveQr = async (body) => {
  try {
    const response = await axios.post("/api/admin/QrCode/SaveQrCode", body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const save = async (body) => {
  try {
    const response = await axios.post("/api/admin/shop/SaveShop", body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const uploadImage = async (body, shopId) => {
  debugger;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.post(
      `/api/admin/shop/UploadMultipleShopPictures?shopId=${shopId}`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getShopImages = async (shopId) => {
  try {
    const response = await axios.get(
      `/api/admin/shop/GetShopImages?shopId=${shopId}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteImage = async (id) => {
  try {
    const response = await axios.patch(
      `/api/admin/shop/DeleteShopImage?id=${id}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const ApproveShop = async (id, approve) => {
  try {
    const response = await axios.patch(
      `/api/admin/shop/ApproveShops?id=${id}&isApproved=${approve}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
