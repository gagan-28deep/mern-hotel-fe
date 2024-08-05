import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useHotel from "../Hooks/useHotel";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
const MyHotels = () => {
  const { handleGetLoggedInUserHotels } = useHotel();

  const allHotelDetails = useSelector(
    (state) => state?.hotel?.allHotelsData?.hotels
  );
  const hotelsDataLoading = useSelector(
    (state) => state?.hotel?.allHotelsLoading
  );

  useEffect(() => {
    const initial = async () => {
      await handleGetLoggedInUserHotels();
    };
    initial();
  }, []);

  if (hotelsDataLoading) {
    return <Loader />;
  }

  if (!allHotelDetails || allHotelDetails?.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3">No Hotels Found</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-300"
        >
          Add Hotel
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold mb-3">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-300"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {allHotelDetails?.map((hotel) => (
          <div
            className="flex flex-col border border-slate-300 rounded-lg p-8 gap-5"
            key={hotel?._id}
          >
            <h2 className="text-2xl font-bold">{hotel?.name}</h2>
            <div className="whitespace-pre-line">{hotel?.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-2" />
                {hotel?.city} , {hotel?.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-2" />
                {hotel?.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-2" />
                {hotel?.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-2" />
                {hotel?.adultCount} Adults , {hotel?.childCount} Children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-2" />
                {hotel?.starRating} Stars
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-300"
                to={`/edit-hotel/${hotel?._id}`}
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
