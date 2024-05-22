import React from "react";
import { hotelFacilities } from "../../../config/hotel--options-config";
import { useFormContext } from "react-hook-form";
const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities?.map((facility) => (
          <label className="flex gap-1 text-gray-700" key={facility}>
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities?.length > 0) {
                    return true;
                  } else {
                    return false;
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500">Facilities are required</span>
      )}
    </div>
  );
};

export default FacilitiesSection;
