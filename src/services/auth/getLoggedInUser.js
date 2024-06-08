import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const getLoggedInUser = async (headers) => {
  return await defaultSecuredAxios.get("/user/getLoggedInUser", { headers });
};
