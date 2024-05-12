import {
  getUserLoading,
  getUserSuccess,
  getUserError,
  getAccessToken,
  getRefreshToken,
  getIsAuthenticated,
} from "../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/showToast";
import { signup } from "../services/auth/register";
import { setStorage } from "../services/storageService";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // SignUp
  const handleSignUp = async (data) => {
    try {
      dispatch(getUserLoading());
      const response = await signup(data);
      if (response && response?.status === 201) {
        setStorage("accessToken", response?.data?.data?.accessToken);
        setStorage("refreshToken", response?.data?.data?.refreshToken);
        setStorage("user", response?.data?.data);
        dispatch(getUserSuccess(response?.data?.data));
        dispatch(getAccessToken(response?.data?.data?.accessToken));
        dispatch(getRefreshToken(response?.data?.data?.refreshToken));
        dispatch(getIsAuthenticated(true));
        showToast("Account created successfully", "success");
        navigate("/");
      }
    } catch (error) {
      dispatch(getUserError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };

  // Login
  const handleLogin = async (data) => {
    try {
      dispatch(getUserLoading());
      const response = await signup(data);
      if (response && response?.status === 201) {
        setStorage("accessToken", response?.data?.data?.accessToken);
        setStorage("refreshToken", response?.data?.data?.refreshToken);
        setStorage("user", response?.data?.data);
        dispatch(getUserSuccess(response?.data?.data));
        dispatch(getAccessToken(response?.data?.data?.accessToken));
        dispatch(getRefreshToken(response?.data?.data?.refreshToken));
        dispatch(getIsAuthenticated(true));
        showToast("User logged in successfully", "success");
        navigate("/");
      }
    } catch (error) {
      dispatch(getUserError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };
  return {
    handleSignUp,
    handleLogin,
  };
};

export default useAuth;
