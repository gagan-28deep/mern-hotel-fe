import { createSlice } from "@reduxjs/toolkit";

// This is for search in the all hotels
const initialState = {
  destination: "",
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 0,
  page: 1,
  facilities: [],
  types: [],
  stars: [],
  maxPrice: "",
  sortOption: "",

  allSearchHotelsLoading: false,
  allSearchHotelsData: null,
  allSearchHotelsError: null,

  // For a single hotel
  viewHotelLoading: false,
  viewHotelData: null,
  viewHotelError: null,
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

      state.types = action.payload.types || [];
      state.stars = action.payload.stars || [];
      state.maxPrice = action.payload.maxPrice;
      state.sortOption = action.payload.sortOption;

      state.facilities = action.payload.facilities || [];
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

    // For a single hotel
    getSingleHotelLoading: (state) => {
      state.viewHotelLoading = true;
    },
    getSingleHotelSuccess: (state, action) => {
      state.viewHotelLoading = false;
      state.viewHotelData = action.payload;
      state.viewHotelError = null;
    },
    getSingleHotelError: (state, action) => {
      state.viewHotelLoading = false;
      state.viewHotelData = null;
      state.viewHotelError = action.payload;
    },
  },
});

export const {
  getAllHotelsSearchError,
  getAllHotelsSearchLoading,
  getAllHotelsSearchSuccess,
  getHotelsBySearch,

  getSingleHotelError,
  getSingleHotelLoading,
  getSingleHotelSuccess,
} = allHotelsSlice.actions;

export default allHotelsSlice.reducer;
