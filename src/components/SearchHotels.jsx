import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResultCard from "./SearchResultCard";
import Pagination from "./Pagination";
import useAllHotels from "../Hooks/useAllHotels";
import { getHotelsBySearch } from "../store/slices/allHotelsSlice";
import StarRating from "./searchedHotelFilters/StarRating";
import HotelTypesFilter from "./searchedHotelFilters/HotelTypesFilter";
import FacilitiesFilter from "./searchedHotelFilters/FacilitiesFilter";
import PriceFilter from "./searchedHotelFilters/PriceFilter";
import SortFilter from "./searchedHotelFilters/SortFilter";

const SearchHotels = () => {
  const dispatch = useDispatch();
  const { handleGetHotelsBySearch } = useAllHotels();
  const destination = useSelector((state) => state?.allHotels?.destination);
  const checkInData =
    useSelector((state) => state?.allHotels?.checkIn) || new Date();
  const checkOutData =
    useSelector((state) => state?.allHotels?.checkOut) || new Date();
  const adultCount = useSelector((state) => state?.allHotels?.adultCount);
  const childCount = useSelector((state) => state?.allHotels?.childCount);
  const stars = useSelector((state) => state?.allHotels?.stars) || [];

  const [selectedStars, setSelectedStars] = React.useState([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = React.useState([]);
  const [selectedFacilities, setSelectedFacilities] = React.useState([]);
  const [selectedPrice, setSelectedPrice] = React.useState(null);
  const [sortOption, setSortOption] = React.useState("");

  const [page, setPage] = React.useState(1);

  // Star
  const handleStarChange = (e) => {
    const starRating = e.target.value;

    setSelectedStars((prevStars) =>
      e.target.checked
        ? [...prevStars, starRating]
        : prevStars?.filter((star) => star !== starRating)
    );
  };

  // Hotel Types
  const handleHotelTypeChange = (e) => {
    const hotelType = e.target.value;
    setSelectedHotelTypes((prevHotelTypes) =>
      e.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes?.filter((hotel) => hotel !== hotelType)
    );
  };

  // Facilities
  const handleFacilityChange = (e) => {
    const facility = e.target.value;
    setSelectedFacilities((prevFacilities) =>
      e.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities?.filter((facility) => facility !== facility)
    );
  };

  useEffect(() => {
    const initial = () => {
      dispatch(
        getHotelsBySearch({
          destination,
          checkIn: checkInData || new Date()?.toISOString(),
          checkOut: checkOutData || new Date()?.toISOString(),
          adultCount: adultCount?.toString() || 1,
          childCount: childCount?.toString() || 0,
          page: 1,
          stars: selectedStars,
          types: selectedHotelTypes,
          facilities: selectedFacilities,
          maxPrice: selectedPrice,
          sortOption,
        })
      );
      handleGetHotelsBySearch(
        { page: page ? page : 1 },
        {
          destination,
          checkInData,
          checkOutData,
          adultCount,
          childCount,
          stars: selectedStars,
          types: selectedHotelTypes,
          facilities: selectedFacilities,
          maxPrice: selectedPrice,
          sortOption,
        }
      );
    };
    initial();
  }, [page]);

  useEffect(() => {
    dispatch(
      getHotelsBySearch({
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice,
        sortOption,
      })
    );
  }, [
    selectedStars,
    selectedHotelTypes,
    selectedFacilities,
    selectedPrice,
    sortOption,
  ]);

  const searchedHotelData = useSelector(
    (state) => state?.allHotels?.allSearchHotelsData
  );

  useEffect(() => {}, [searchedHotelData]);

  if (!searchedHotelData || searchedHotelData?.hotels?.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3">No Hotels Found</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By:
          </h3>
          <StarRating
            selectedStars={selectedStars}
            onChange={handleStarChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(p) => setSelectedPrice(p)}
          />
        </div>
      </div>

      {/* For searched hotels */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {searchedHotelData?.pagination?.totalHotels} Hotels Found{" "}
            {destination !== "" ||
              (destination && (
                <span className="text-xl font-bold">in {destination}</span>
              ))}
          </span>
          <SortFilter sortOption={sortOption} onChange={setSortOption} />
        </div>
        {searchedHotelData?.hotels?.length > 0 &&
          searchedHotelData?.hotels?.map((hotel) => (
            <SearchResultCard key={hotel?._id} hotel={hotel} />
          ))}
        <div>
          <Pagination
            pages={searchedHotelData?.pagination?.pages || 1}
            currentPage={searchedHotelData?.pagination?.page || 1}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchHotels;
