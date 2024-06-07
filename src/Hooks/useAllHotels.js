import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../utils/showToast";
import {
  getAllHotelsSearchError,
  getAllHotelsSearchLoading,
  getAllHotelsSearchSuccess,
  getSingleHotelError,
  getSingleHotelLoading,
  getSingleHotelSuccess,
} from "../store/slices/allHotelsSlice";
import { getAllHotelsBySearch } from "../services/allHotels/getHotelsBySearch";
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

  // Get hotel data from the store
  return {
    handleGetHotelsBySearch,
    handleGetSingleHotel,
  };
};

export default useAllHotels;
