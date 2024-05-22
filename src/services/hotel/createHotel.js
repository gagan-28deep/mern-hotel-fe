import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const createHotel = async (data, headers) => {
  return await defaultSecuredAxios.post("/hotel", data, { headers });
};
