import React from "react";

const SortFilter = ({ sortOption, onChange }) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded-md"
    >
      <option value="">Sort By</option>
      <option value="starRating">Star Rating</option>
      <option value="pricePerNightAsc">Price per Night (Low to High)</option>
      <option value="pricePerNightDesc">Price per Night (High to Low)</option>
    </select>
  );
};

export default SortFilter;
