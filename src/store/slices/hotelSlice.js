import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // For single hotel
  hotelLoading: false,
  hotelData: null,
  hotelError: null,

  // For all hotels of a logged in user
  allHotelsLoading: false,
  allHotelsData: null,
  allHotelsError: null,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    getHotelLoading: (state) => {
      state.hotelLoading = true;
    },
    getHotelSuccess: (state, action) => {
      state.hotelLoading = false;
      state.hotelData = action.payload;
      state.hotelError = null;
    },
    getHotelError: (state, action) => {
      state.hotelLoading = false;
      state.hotelData = null;
      state.hotelError = action.payload;
    },

    // To set initial data
    getInitialData: (state) => {
      state.hotelLoading = false;
      state.hotelData = null;
      state.hotelError = null;
    },

    // For all hotels of a logged in user
    getAllHotelsLoading: (state) => {
      state.allHotelsLoading = true;
    },
    getAllHotelsSuccess: (state, action) => {
      state.allHotelsLoading = false;
      state.allHotelsData = action.payload;
      state.allHotelsError = null;
    },
    getAllHotelsError: (state, action) => {
      state.allHotelsLoading = false;
      state.allHotelsData = null;
      state.allHotelsError = action.payload;
    },
  },
});

export const {
  getHotelLoading,
  getHotelSuccess,
  getHotelError,
  getInitialData,

  getAllHotelsLoading,
  getAllHotelsSuccess,
  getAllHotelsError,
} = hotelSlice.actions;

export default hotelSlice.reducer;
