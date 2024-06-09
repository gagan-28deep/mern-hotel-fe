import React from "react";
import { Link } from "react-router-dom";

const LatestDestinationCard = ({ hotel }) => {
  return (
    <Link
      to={`/detail/${hotel?._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          className="w-full h-full object-cover object-center"
          src={hotel?.imageUrls[0]}
          alt="hotel-image"
        />
      </div>
      <div className="absolute bottom-0 p-4 bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl ">
          {hotel?.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
