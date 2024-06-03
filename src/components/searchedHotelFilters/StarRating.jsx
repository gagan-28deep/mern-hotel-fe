import React, { useEffect } from "react";

const StarRating = ({ selectedStars, onChange }) => {
  useEffect(() => {}, [selectedStars]);
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {[1, 2, 3, 4, 5].map((star) => (
        <label key={star} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars?.includes(String(star))}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRating;
