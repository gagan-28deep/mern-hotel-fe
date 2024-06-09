import React, { useEffect } from "react";
import myBookings from "../Hooks/myBookings";
import { useSelector } from "react-redux";

const MyBookings = () => {
  const { handleGetMyBookings } = myBookings();

  const myBookingData = useSelector(
    (state) => state?.myBooking?.myBookingData?.results
  );

  useEffect(() => {
    const initial = async () => {
      await handleGetMyBookings();
    };
    initial();
  }, []);

  if (!myBookingData || myBookingData?.length === 0) {
    return <div className="text-center">No Bookings</div>;
  }
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {myBookingData?.map((hotel) => (
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-7 gap-5"
          key={hotel?._id}
        >
          {/* For image */}
          <div className="lg:w-full lg:h-[250px]">
            <img
              className="w-full h-full object-cover object-center"
              src={hotel?.imageUrls[0]}
              alt="hotel-image"
            />
          </div>
          {/* For the hotel */}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">{hotel?.name}</div>
            <div>
              {hotel?.city} , {hotel?.country}
            </div>
            {/* For Bookings */}
            {hotel?.bookings?.map((booking) => (
              <div key={booking?._id}>
                <div>
                  <span className="font-bold mr-2">Dates:</span>
                  <span>
                    {" "}
                    {new Date(booking?.checkIn).toDateString()} -{" "}
                    {new Date(booking?.checkOut).toDateString()}{" "}
                  </span>
                </div>

                <div>
                  <span className="font-bold mr-2">Guests</span>
                  <span>
                    {booking?.adultCount} Adults , {booking?.childCount}{" "}
                    Children
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
