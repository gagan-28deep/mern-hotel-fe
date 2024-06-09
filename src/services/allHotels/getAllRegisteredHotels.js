import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const getAllRegisteredHotels = async () => {
  return await defaultSecuredAxios.get("/allhotels/getAllRegisteredHotels");
};
