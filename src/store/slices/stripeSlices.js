import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stripePromise: null,

  //   Payment
  paymentIntentLoading: false,
  paymentIntentData: null,
  paymentIntentError: null,

  //   Room booking
  roomBookingLoading: false,
  roomBookingData: null,
  roomBookingError: null,
};

const stripeSlice = createSlice({
  name: "stripe",
  initialState,
  reducers: {
    getStripePromise: (state, action) => {
      state.stripePromise = action.payload;
    },

    //   Payment
    getPaymentIntentLoading: (state, action) => {
      state.paymentIntentLoading = true
    },
    getPaymentIntentSuccess: (state, action) => {
      state.paymentIntentLoading = false;
      state.paymentIntentData = action.payload;
      state.paymentIntentError = null;
    },
    getPaymentIntentError: (state, action) => {
      state.paymentIntentLoading = false;
      state.paymentIntentData = null;
      state.paymentIntentError = action.payload;
    },

    //   Room booking
    getRoomBookingLoading: (state, action) => {
      state.roomBookingLoading = true
    },
    getRoomBookingSuccess: (state, action) => {
      state.roomBookingLoading = false;
      state.roomBookingData = action.payload;
      state.roomBookingError = null;
    },
    getRoomBookingError: (state, action) => {
      state.roomBookingLoading = false;
      state.roomBookingData = null;
      state.roomBookingError = action.payload;
    },
  },
});

export const {
  getStripePromise,
  getPaymentIntentLoading,
  getPaymentIntentSuccess,
  getPaymentIntentError,
  getRoomBookingLoading,
  getRoomBookingSuccess,
  getRoomBookingError,
} = stripeSlice.actions;
export default stripeSlice.reducer;
