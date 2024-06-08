import React from "react";

const BookingDetailSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  selectedHotel,
}) => {
  const checkinDate = new Date(checkIn);
  const checkoutDate = new Date(checkOut);
  return (
    <div className="grid gap-4 rounded-lg border border-slate-400 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${selectedHotel?.name} , ${selectedHotel?.city} , ${selectedHotel?.country}`}</div>
      </div>
      {/* Checkin and Checkout */}
      <div className="flex justify-between">
        <div>
          Check-In
          <div className="font-bold">{checkinDate?.toDateString()}</div>
        </div>
        <div>
          Check-Out
          <div className="font-bold">{checkoutDate?.toDateString()}</div>
        </div>
      </div>
      {/* Number of Nights */}
      <div className="border-t border-b py-2">
        Total Number of Nights:
        <div className="font-bold">{numberOfNights} Nights</div>
      </div>

      {/* Number of Guests */}
      <div>
        Guests:
        <div className="font-bold">
          {adultCount} Adults , {childCount} Children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailSummary;
