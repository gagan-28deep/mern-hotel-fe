import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const signout = async (headers) => {
  return await defaultSecuredAxios.post("/user/logout", {}, { headers });
};
