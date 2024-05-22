import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import hotelSlice from "./slices/hotelSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    hotel: hotelSlice,
  },
});
