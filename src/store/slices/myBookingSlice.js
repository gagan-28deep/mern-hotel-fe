import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myBookingLoading: false,
  myBookingData: null,
  myBookingError: null,
};

const myBookingSlice = createSlice({
  name: "myBooking",
  initialState,
  reducers: {
    getMyBookingLoading: (state) => {
      state.myBookingLoading = true;
      state.myBookingData = null;
      state.myBookingError = null;
    },
    getMyBookingSuccess: (state, action) => {
      state.myBookingLoading = false;
      state.myBookingData = action.payload;
      state.myBookingError = null;
    },
    getMyBookingError: (state, action) => {
      state.myBookingLoading = false;
      state.myBookingData = null;
      state.myBookingError = action.payload;
    },
  },
});

export const { getMyBookingLoading, getMyBookingSuccess, getMyBookingError } =
  myBookingSlice.actions;
export default myBookingSlice.reducer;
