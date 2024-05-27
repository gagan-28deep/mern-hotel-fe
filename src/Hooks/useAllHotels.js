import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../utils/showToast";
import {
  getAllHotelsSearchError,
  getAllHotelsSearchLoading,
  getAllHotelsSearchSuccess,
} from "../store/slices/allHotelsSlice";
import { getAllHotelsBySearch } from "../services/allHotels/getHotelsBySearch";
import { useNavigate } from "react-router-dom";
const useAllHotels = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGetHotelsBySearch = async (page , data) => {
    try {
      dispatch(getAllHotelsSearchLoading());
      const response = await getAllHotelsBySearch(page , data);
      if (response && response?.status === 200) {
        dispatch(getAllHotelsSearchSuccess(response?.data?.data));
        navigate("/searched-hotels");
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  // Get hotel data from the store
  return {
    handleGetHotelsBySearch,
  };
};

export default useAllHotels;
