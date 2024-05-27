import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const SearchResultCard = ({ hotel }) => {
  return (
    <div className="border border-slate-300 rounded-lg p-8 gap-8 grid grid-cols-1 xl:grid-cols-[2fr_3fr]">
      {/* For image */}
      <div className="w-full h-[300px]">
        <img
          className="w-full h-full object-cover object-center"
          src={hotel?.imageUrls[0]}
          alt="hotel-image"
        />
      </div>
      {/* For hotel */}
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          {/* Star and Hotel Type */}
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating })?.map(() => (
                <AiFillStar className="text-yellow-500" />
              ))}
            </span>
            <span className="ml-1">{hotel?.type}</span>
          </div>
        </div>
        <Link
          to={`/detail/${hotel?._id}`}
          className="text-2xl font-bold cursor-pointer"
        >
          {hotel?.name}
        </Link>

        {/* Description */}
        <div>
          <div className="line-clamp-4">{hotel?.description}</div>
        </div>

        {/* Price and facilities */}
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel?.facilities?.slice(0, 3)?.map((facility) => (
              <span
                key={facility}
                className="whitespace-nowrap font-bold bg-slate-300 px-2 py-1 rounded-full"
              >
                {facility}
              </span>
            ))}
            <span className="text-xs">
              {hotel?.facilities?.length > 3 &&
                `+ ${hotel?.facilities?.length - 3} more`}
            </span>
          </div>
        </div>

        {/* Price and view more */}
        <div className="flex flex-col items-end gap-1">
          <span>$ {hotel?.pricePerNight} per night</span>
          <Link
            to={`/detail/${hotel?._id}`}
            className="bg-blue-600 text-white p-2 h-full font-bold text-xl max-w-fit hover:bg-blue-300"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
