import {
  getHotelLoading,
  getHotelSuccess,
  getHotelError,
  getInitialData,
  getAllHotelsLoading,
  getAllHotelsSuccess,
  getAllHotelsError,
} from "../store/slices/hotelSlice";
import { useSelector, useDispatch } from "react-redux";

import { createHotel } from "../services/hotel/createHotel";
import { getAllHotels } from "../services/hotel/getAllHotels";
import { showToast } from "../utils/showToast";
import { useNavigate } from "react-router-dom";
const useHotel = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state?.user?.accessToken);
  const dispatch = useDispatch();

  // Create Hotel
  const handleCreateHotel = async (data) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      dispatch(getHotelLoading());
      const response = await createHotel(data, headers);
      if (response && response?.status === 201) {
        showToast("Hotel created successfully", "success");
        dispatch(getInitialData());
        navigate("/");
      }
    } catch (error) {
      dispatch(getHotelError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  // Get logged in user hotels
  const handleGetLoggedInUserHotels = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      dispatch(getAllHotelsLoading());
      const response = await getAllHotels(headers);
      if (response && response?.status === 200) {
        dispatch(getAllHotelsSuccess(response?.data?.data));
      }
      dispatch(getAllHotelsLoading());
    } catch (error) {
      dispatch(getAllHotelsError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  return {
    handleCreateHotel,
    handleGetLoggedInUserHotels,
  };
};

export default useHotel;
