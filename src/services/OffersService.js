import axios from "../constants/AxiosConfig";

export const Offer = async (id, Approve) => {
  try {
    const response = await axios.patch(
      `/api/admin/offer/ApproveOffer?id=${id}&isApproved=${Approve}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
