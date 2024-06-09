import {
  getMyBookingError,
  getMyBookingLoading,
  getMyBookingSuccess,
} from "../store/slices/myBookingSlice";
import { showToast } from "../utils/showToast";
import { myBookings } from "../services/myBookings/getMyBookings";

import { useDispatch, useSelector } from "react-redux";

const useMyBookings = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state?.user?.accessToken);

  const handleGetMyBookings = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      dispatch(getMyBookingLoading());
      const response = await myBookings(headers);
      console.log("response", response);
      if (response && response?.status === 200) {
        dispatch(getMyBookingSuccess(response?.data?.data));
      }
    } catch (error) {
      dispatch(getMyBookingError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  return { handleGetMyBookings };
};

export default useMyBookings;
