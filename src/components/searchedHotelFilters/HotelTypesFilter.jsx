import React, { useEffect } from "react";
import { hotelTypes } from "../../config/hotel--options-config";

const HotelTypesFilter = ({ selectedHotelTypes, onChange }) => {
  useEffect(() => {}, [selectedHotelTypes]);
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Types</h4>
      {hotelTypes?.map((hotel) => (
        <label key={hotel} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={hotel}
            checked={selectedHotelTypes?.includes(String(hotel))}
            onChange={onChange}
          />
          <span>{hotel} hotels</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
