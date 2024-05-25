import React from "react";
import { useFormContext } from "react-hook-form";

const DetailsSection = ({hotelDetails}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">{hotelDetails ? "Edit Hotel Details" : "Add Hotel Details"}</h1>
      <label className="text-gray-500 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="w-full py-1 px-2 border border-gray-300 rounded"
          {...register("name", { required: true })}
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-500 text-sm font-bold flex-1">
          city
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded"
            {...register("city", { required: true })}
          />
          {errors.city && (
            <span className="text-red-500">City is required</span>
          )}
        </label>
        <label className="text-gray-500 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded"
            {...register("country", { required: true })}
          />
          {errors.country && (
            <span className="text-red-500">Country is required</span>
          )}
        </label>
      </div>
      <label className="text-gray-500 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          type="text"
          className="w-full py-1 px-2 border border-gray-300 rounded"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">Description is required</span>
        )}
      </label>
      <label className="text-gray-500 text-sm font-bold max-w-[50%]">
        Price per Night
        <input
          type="number"
          min={1}
          className="w-full py-1 px-2 border border-gray-300 rounded"
          {...register("pricePerNight", { required: true })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">Price per Night is required</span>
        )}
      </label>
      <label className="text-gray-500 text-sm font-bold max-w-[50%]">
        Star Rating
        <select {...register("starRating", { required: true })} 
        className="border rounded w-full p-2 text-gray-700"
        >
          <option value="" className="text-sm font-bold">
            Select As Rating
          </option>
          {[1, 2, 3, 4, 5]?.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">Star Rating is required</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
