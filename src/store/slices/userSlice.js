import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoading: false,
  userData: null,
  userError: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Get User Loading
    getUserLoading: (state) => {
      state.userLoading = true;
    },
    // Get User Success
    getUserSuccess: (state, action) => {
      state.userLoading = false;
      state.userData = action.payload;
      state.userError = null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    // Get User Error
    getUserError: (state, action) => {
      state.userLoading = false;
      state.userData = null;
      state.userError = action.payload;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    // Set Access Token
    getAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    // Set Refresh Token
    getRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    // Set Is Authenticated
    getIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  getUserLoading,
  getUserSuccess,
  getUserError,
  getAccessToken,
  getRefreshToken,
  getIsAuthenticated,
} = userSlice.actions;

export default userSlice.reducer;
