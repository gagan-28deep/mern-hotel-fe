import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const updateHotel = async (id, data, headers) => {
  return await defaultSecuredAxios.put(`/hotel/${id}`, data, { headers });
};
