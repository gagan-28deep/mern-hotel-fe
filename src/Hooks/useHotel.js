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
import { getAllHotelsOfLoggedInUser } from "../services/hotel/getAllHotels";
import { showToast } from "../utils/showToast";
import { useNavigate } from "react-router-dom";
import { getHotelById } from "../services/hotel/getHotelById";
import { updateHotel } from "../services/hotel/updateHotel";
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
      const response = await getAllHotelsOfLoggedInUser(headers);
      if (response && response?.status === 200) {
        dispatch(getAllHotelsSuccess(response?.data?.data));
      }
      dispatch(getAllHotelsLoading());
    } catch (error) {
      dispatch(getAllHotelsError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  // Get hotel by id
  const handleGetHotelById = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      dispatch(getHotelLoading());
      const response = await getHotelById(id, headers);
      if (response && response?.status === 200) {
        dispatch(getHotelSuccess(response?.data?.data));
      }
    } catch (error) {
      dispatch(getHotelError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  // update a hotel by id
  const handleUpdateHotelById = async (id, data) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      dispatch(getHotelLoading());
      const response = await updateHotel(id, data, headers);
      if (response && response?.status === 200) {
        showToast("Hotel updated successfully", "success");
        navigate("/my-hotels");
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "error");
    }
  };

  return {
    handleCreateHotel,
    handleGetLoggedInUserHotels,
    handleGetHotelById,
    handleUpdateHotelById,
  };
};

export default useHotel;
