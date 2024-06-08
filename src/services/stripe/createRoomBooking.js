import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const createRoomBooking = async (hotelId, data, headers) => {
  return await defaultSecuredAxios.post(
    `/allhotels/${hotelId}/bookings`,
    { data },
    { headers }
  );
};
