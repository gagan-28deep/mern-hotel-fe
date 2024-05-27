import { createSlice } from "@reduxjs/toolkit";

// This is for search in the all hotels
const initialState = {
  destination: "",
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 0,
  page: 1,

  allSearchHotelsLoading: false,
  allSearchHotelsData: null,
  allSearchHotelsError: null,
};

const allHotelsSlice = createSlice({
  name: "allHotels",
  initialState,
  reducers: {
    getHotelsBySearch(state, action) {
      state.destination = action.payload.destination;
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
      state.adultCount = action.payload.adultCount;
      state.childCount = action.payload.childCount;
      state.page = 1;
    },

    getAllHotelsSearchLoading: (state) => {
      state.allSearchHotelsLoading = true;
    },
    getAllHotelsSearchSuccess: (state, action) => {
      state.allSearchHotelsLoading = false;
      state.allSearchHotelsData = action.payload;
      state.allSearchHotelsError = null;
    },
    getAllHotelsSearchError: (state, action) => {
      state.allSearchHotelsLoading = false;
      state.allSearchHotelsData = null;
      state.allSearchHotelsError = action.payload;
    },
  },
});

export const {
  getAllHotelsSearchError,
  getAllHotelsSearchLoading,
  getAllHotelsSearchSuccess,
  getHotelsBySearch,
} = allHotelsSlice.actions;

export default allHotelsSlice.reducer;
