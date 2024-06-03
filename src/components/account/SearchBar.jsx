import React, { useEffect } from "react";
import useAllHotels from "../../Hooks/useAllHotels";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsBySearch } from "../../store/slices/allHotelsSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { handleGetHotelsBySearch } = useAllHotels();

  //   Local state variable based on which we will search
  const [destination, setDestination] = React.useState("");
  const [checkIn, setCheckIn] = React.useState(new Date());
  const [checkOut, setCheckOut] = React.useState(new Date());
  const [adultCount, setAdultCount] = React.useState(1);
  const [childCount, setChildCount] = React.useState(0);

  //   Set the values to the global state too
  // useEffect(() => {
  //   dispatch(
  //     getHotelsBySearch({
  //       destination,
  //       checkIn: checkIn?.toISOString() || new Date()?.toISOString(),
  //       checkOut: checkOut?.toISOString() || new Date()?.toISOString(),
  //       adultCount: adultCount?.toString() || 1,
  //       childCount: childCount?.toString() || 0,
  //     })
  //   );
  //   // }, [dispatch, destination, checkIn, checkOut, adultCount, childCount]);
  // }, [dispatch, destination, checkIn, checkOut, adultCount, childCount]);

  // Get values from store
  const stars = useSelector((state) => state?.allHotels?.stars) || [];
  const types = useSelector((state) => state?.allHotels?.types) || [];
  const facilities = useSelector((state) => state?.allHotels?.facilities) || [];
  const maxPrice = useSelector((state) => state?.allHotels?.maxPrice);
  const sortOption = useSelector((state) => state?.allHotels?.sortOption);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      getHotelsBySearch({
        destination,
        checkIn: checkIn?.toISOString() || new Date()?.toISOString(),
        checkOut: checkOut?.toISOString() || new Date()?.toISOString(),
        adultCount: adultCount?.toString() || 1,
        childCount: childCount?.toString() || 0,
        page: 1,
        stars: stars || [],
        types: types || [],
        facilities: facilities || [],
        maxPrice: maxPrice || "",
        sortOption: sortOption || "",
      })
    );
    handleGetHotelsBySearch(
      { page: 1 },
      {
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        stars,
        types,
        facilities,
        maxPrice,
        sortOption,
      }
    );
  };

  const handleClear = () => {
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 "
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="text-md w-full focus:outline-none"
        />
      </div>
      {/* Adult and child */}
      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            type="number"
            min={1}
            max={10}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
            className="w-full p-1 focus:outline-none font-bold"
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            type="number"
            min={0}
            max={10}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
            className="w-full p-1 focus:outline-none font-bold"
          />
        </label>
      </div>
      {/* For checkin and checkout dates */}
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      {/* Search and clear button */}
      <div className="flex gap-1">
        <button className="w-2/3 bg-blue-500 text-white h-full font-bold text-xl p-2 hover:bg-blue-300">
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="w-1/3 bg-red-500 text-white h-full font-bold text-xl p-2 hover:bg-red-300"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
