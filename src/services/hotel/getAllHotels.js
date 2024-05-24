// Get all hotels of a logged in user

import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const getAllHotels = async (headers) => {
  return await defaultSecuredAxios.get("/hotel", { headers });
};
