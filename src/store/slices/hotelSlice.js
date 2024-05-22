import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // For single hotel
  hotelLoading: false,
  hotelData: null,
  hotelError: null,

  // For all hotels
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
  },
});

export const {
  getHotelLoading,
  getHotelSuccess,
  getHotelError,
  getInitialData,
} = hotelSlice.actions;

export default hotelSlice.reducer;
