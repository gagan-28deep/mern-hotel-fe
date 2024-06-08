import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoading: false,
  userData: null,
  userError: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  // Logged in user
  loggedInUserLoading: false,
  loggedInUserData: null,
  loggedInUserError: null,
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

    // get Logged in user
    getLoggedInUserLoading: (state) => {
      state.loggedInUserLoading = true;
    },
    getLoggedInUserSuccess: (state, action) => {
      state.loggedInUserLoading = false;
      state.loggedInUserData = action.payload;
      state.loggedInUserError = null;
    },
    getLoggedInUserError: (state, action) => {
      state.loggedInUserLoading = false;
      state.loggedInUserData = null;
      state.loggedInUserError = action.payload;
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

  getLoggedInUserLoading,
  getLoggedInUserSuccess,
  getLoggedInUserError,
} = userSlice.actions;

export default userSlice.reducer;
