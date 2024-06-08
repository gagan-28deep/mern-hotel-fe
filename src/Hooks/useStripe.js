import { useDispatch, useSelector } from "react-redux";
import {
  getPaymentIntentLoading,
  getPaymentIntentSuccess,
  getPaymentIntentError,
  getRoomBookingError,
  getRoomBookingLoading,
  getRoomBookingSuccess,
} from "../store/slices/stripeSlices";
import { showToast } from "../utils/showToast";
import { createPayment } from "../services/stripe/createPayment";
import { createRoomBooking } from "../services/stripe/createRoomBooking";

// Creata a payment intent

const useStripeCustom = () => {
  const accessToken = useSelector((state) => state?.user?.accessToken);
  const dispatch = useDispatch();

  const handleCreatePayment = async (hotelId, data) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      dispatch(getPaymentIntentLoading());
      const response = await createPayment(hotelId, data, headers);
      if (response && response?.status === 200) {
        dispatch(getPaymentIntentSuccess(response?.data?.data));
      }
    } catch (error) {
      dispatch(getPaymentIntentError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  //   Create room booking

  const handleCreateRoomBooking = async (hotelId, data) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      dispatch(getRoomBookingLoading());
      const response = await createRoomBooking(hotelId, data, headers);
      if (response && response?.status === 200) {
        dispatch(getRoomBookingSuccess(response?.data?.data));
        showToast("Room booked successfully", "success");
      }
    } catch (error) {
      dispatch(getRoomBookingError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  return { handleCreatePayment, handleCreateRoomBooking };
};

export default useStripeCustom;
