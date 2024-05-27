// Get all hotels of a logged in user

import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const getAllHotelsOfLoggedInUser = async (headers) => {
  return await defaultSecuredAxios.get("/hotel", { headers });
};
