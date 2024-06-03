import React, { useEffect } from "react";
import { hotelFacilities } from "../../config/hotel--options-config";

const FacilitiesFilter = ({ selectedFacilities, onChange }) => {
  useEffect(() => {}, [selectedFacilities]);
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilities?.map((facility) => (
        <label key={facility} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilities?.includes(String(facility))}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
