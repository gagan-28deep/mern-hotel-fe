import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import hotelSlice from "./slices/hotelSlice";
import allHotelsSlice from "./slices/allHotelsSlice";
import stripeSlices from "./slices/stripeSlices";

export const store = configureStore({
  reducer: {
    user: userSlice,
    hotel: hotelSlice,
    allHotels: allHotelsSlice,
    stripe: stripeSlices,
  },
});
