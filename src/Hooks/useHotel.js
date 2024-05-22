import {
  getHotelLoading,
  getHotelSuccess,
  getHotelError,
  getInitialData,
} from "../store/slices/hotelSlice";
import { useSelector, useDispatch } from "react-redux";

import { createHotel } from "../services/hotel/createHotel";
import { showToast } from "../utils/showToast";
const useHotel = () => {
  const accessToken = useSelector((state) => state?.user?.accessToken);
  const dispatch = useDispatch();

  const handleCreateHotel = async (data) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      dispatch(getHotelLoading());
      const response = await createHotel(data, headers);
      if (response && response?.status === 201) {
        showToast("Hotel created successfully", "success");
      }
    } catch (error) {
      dispatch(getHotelError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  return {
    handleCreateHotel,
  };
};

export default useHotel;
