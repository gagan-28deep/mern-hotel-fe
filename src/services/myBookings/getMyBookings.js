import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const myBookings = async (headers) => {
  return await defaultSecuredAxios.get("/mybookings", { headers });
};
