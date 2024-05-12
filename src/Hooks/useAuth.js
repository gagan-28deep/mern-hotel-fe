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
import { signin } from "../services/auth/signin";
import { signout } from "../services/auth/signout";
import { removeStorage, setStorage } from "../services/storageService";

const useAuth = () => {
  const accessToken = useSelector((state) => state?.user?.accessToken);
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
      const response = await signin(data);
      if (response && response?.status === 200) {
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

  // Logout
  const handleSignOut = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await signout(headers);
      if (response) {
        dispatch(getAccessToken(null));
        dispatch(getIsAuthenticated(false));
        // dispatch(getUserData(response?.data?.data))
        dispatch(getRefreshToken(null));
        dispatch(getUserSuccess(null));
        removeStorage("accessToken");
        removeStorage("refreshToken");
        removeStorage("user");
        showToast(response?.data?.message, "success");
      }
    } catch (error) {
      dispatch(getUserError(error?.response?.data?.message));
      showToast(error?.response?.data?.message, "error");
    }
  };
  return {
    handleSignUp,
    handleLogin,
    handleSignOut,
  };
};

export default useAuth;
