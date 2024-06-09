import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../utils/showToast";
import {
  getAllHotelsSearchError,
  getAllHotelsSearchLoading,
  getAllHotelsSearchSuccess,
  getSingleHotelError,
  getSingleHotelLoading,
  getSingleHotelSuccess,
  getAllRegisteredHotelsError,
  getAllRegisteredHotelsLoading,
  getAllRegisteredHotelsSuccess,
} from "../store/slices/allHotelsSlice";
import { getAllHotelsBySearch } from "../services/allHotels/getHotelsBySearch";
import { getAllRegisteredHotels } from "../services/allHotels/getAllRegisteredHotels";
import { useNavigate } from "react-router-dom";
import { viewSingleHotelById } from "../services/allHotels/viewSingleHotelById";
const useAllHotels = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGetHotelsBySearch = async (page, data) => {
    try {
      dispatch(getAllHotelsSearchLoading());
      const response = await getAllHotelsBySearch(page, data);
      if (response && response?.status === 200) {
        dispatch(getAllHotelsSearchSuccess(response?.data?.data));
        navigate("/searched-hotels");
      }
    } catch (error) {
      console.log("err", error);
      dispatch(getAllHotelsSearchError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  // For a single hotel
  const handleGetSingleHotel = async (id) => {
    try {
      dispatch(getSingleHotelLoading());
      const response = await viewSingleHotelById(id);
      if (response && response?.status === 200) {
        dispatch(getSingleHotelSuccess(response?.data?.data));
        navigate(`/detail/${id}`);
      }
    } catch (error) {
      dispatch(getSingleHotelError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  // Get all registered hotels
  const handleGetAllRegisteredHotels = async () => {
    try {
      dispatch(getAllRegisteredHotelsLoading());
      const response = await getAllRegisteredHotels();
      if (response && response?.status === 200) {
        dispatch(getAllRegisteredHotelsSuccess(response?.data?.data));
      }
    } catch (error) {
      dispatch(getAllRegisteredHotelsError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  return {
    handleGetHotelsBySearch,
    handleGetSingleHotel,
    handleGetAllRegisteredHotels,
  };
};

export default useAllHotels;
