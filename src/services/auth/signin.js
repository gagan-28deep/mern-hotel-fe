import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const signin = async (data) => {
  return await defaultSecuredAxios.post("/user/login", data);
};
