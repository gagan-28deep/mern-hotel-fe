import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const signup = async (data) => {
  return await defaultSecuredAxios.post("/user/register", data);
};
