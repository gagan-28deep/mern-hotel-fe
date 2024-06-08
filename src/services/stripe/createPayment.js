import { defaultSecuredAxios } from "../DefaultSecuredAxiosInstance";

export const createPayment = async (hotelId, data, headers) => {
  return await defaultSecuredAxios.post(
    `/allhotels/${hotelId}/bookings/payment-intent`,
    { data },
    { headers }
  );
};
