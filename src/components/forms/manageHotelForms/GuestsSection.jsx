import React from "react";
import { useFormContext } from "react-hook-form";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 gap-5 p-6 bg-gray-300">
        <label className="text-gray-500 text-sm font-bold">
          Adults
          <input
            className="border rounder w-full py-2 px-3 font-normal"
            type="number"
            min={1}
            {...register("adultCount", { required: true })}
          />
          {errors.adultCount && (
            <span className="text-red-500">Adults is required</span>
          )}
        </label>
        <label className="text-gray-500 text-sm font-bold">
          Children
          <input
            className="border rounder w-full py-2 px-3 font-normal"
            type="number"
            min={0}
            {...register("childCount", { required: true })}
          />
          {errors.childCount && (
            <span className="text-red-500">Children is required</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
