import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";
export const getHotelById = async (id, headers) => {
  return await defaultSecuredAxios.get(`/hotel/${id}`, { headers });
};
