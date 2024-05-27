import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const getAllHotelsBySearch = async (page, data) => {
  return await defaultSecuredAxios.post(
    `/allhotels/getAllHotels?page=${page?.page}`,
    data
  );
};
