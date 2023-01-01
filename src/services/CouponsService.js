import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(`/api/admin/Coupon/GetCoupons`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getShops = async (body) => {
  try {
    const response = await axios.get(`/api/admin/Shop/GetAllShops`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteSomething = async (body) => {
  try {
    const response = await axios.patch(
      "/api/admin/Coupon/DeleteCoupon?id=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const save = async (body) => {
  try {
    const response = await axios.post("/api/admin/Coupon/SaveCoupon", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
