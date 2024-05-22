import React from "react";
import { hotelTypes } from "../../../config/hotel--options-config";
import { useFormContext } from "react-hook-form";
const TypesSections = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes?.map((htype) => (
          <label
            // className={
            //   typeWatch === htype
            //     ? "cursor-pointer bg-blue-400 text-sm font-bold px-4 py-2 rounded-full"
            //     : "cursor-pointer bg-gray-300 text-sm font-bold px-4 py-2 rounded-full"
            // }
            className={`cursor-pointer ${
              typeWatch === htype ? "bg-blue-400" : "bg-gray-300"
            } text-sm font-bold px-4 py-2 rounded-full`}
            key={htype}
          >
            <input
              type="radio"
              value={htype}
              className="hidden"
              {...register("type", { required: true })}
            />
            <span>{htype}</span>
          </label>
        ))}
      </div>
      {errors.type && <span className="text-red-500">Type is required</span>}
    </div>
  );
};

export default TypesSections;
