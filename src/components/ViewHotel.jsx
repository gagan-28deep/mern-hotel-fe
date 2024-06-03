import React, { useEffect } from "react";
import useHotel from "../Hooks/useHotel";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "./forms/guestInfoForms/GuestInfoForm";

const ViewHotel = () => {
  const { handleGetHotelById } = useHotel();
  const { id } = useParams();

  const hotelDetails = useSelector((state) => state?.hotel?.hotelData?.hotel);

  console.log("hhh", hotelDetails);

  useEffect(() => {
    const initial = async () => {
      await handleGetHotelById(id);
    };
    initial();
  }, [id]);

  if (!hotelDetails) {
    return <div className="text-center">Loading...</div>;
  }
  return (
    <div className="space-y-6">
      {/* For start and title */}
      <div>
        {/* Star */}
        <span className="flex">
          {Array.from({ length: hotelDetails?.starRating })?.map(() => (
            <AiFillStar key={hotelDetails?._id} className="text-yellow-500" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotelDetails?.name}</h1>
      </div>

      {/* For images */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotelDetails?.imageUrls?.map((image) => (
          <div key={image} className="h-[300px]">
            <img
              src={image}
              alt="hotel-image"
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* For Facilities */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotelDetails?.facilities?.map((facility) => (
          <div
            key={facility}
            className="border border-slate-300 rounded-md p-2"
          >
            {facility}
          </div>
        ))}
      </div>

      {/* For description */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line"> {hotelDetails?.description} </div>
        <div className="h-fit">
          <GuestInfoForm
            hotelId={hotelDetails?._id}
            pricePerNight={hotelDetails?.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewHotel;
