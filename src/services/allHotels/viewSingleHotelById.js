import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const viewSingleHotelById = async (id) => {
  return await defaultSecuredAxios.get(`/allhotels/viewHotelById/${id}`);
};
