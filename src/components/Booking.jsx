import React, { useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import useStripeCustom from "../Hooks/useStripe";
import { useSelector } from "react-redux";
import BookingForm from "./forms/bookingForms/BookingForm";
import { useParams } from "react-router-dom";
import BookingDetailSummary from "./forms/bookingForms/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";

const Booking = () => {
  // User Details
  const { handleGetLoggedInUser } = useAuth();

  const { handleCreatePayment } = useStripeCustom();

  // Number of nights
  const [numberOfNights, setNumberOfNights] = React.useState(0);

  const loggedInUser = useSelector(
    (state) => state?.user?.loggedInUserData?.user
  );
  const selectedHotel = useSelector(
    (state) => state?.allHotels?.viewHotelData?.hotel
  );

  //   Get Searched Details
  const destination = useSelector((state) => state?.allHotels?.destination);

  const checkInData = useSelector((state) => state?.allHotels?.checkIn);

  const checkOutData = useSelector((state) => state?.allHotels?.checkOut);
  const adultCount = useSelector((state) => state?.allHotels?.adultCount);
  const childCount = useSelector((state) => state?.allHotels?.childCount);
  const selectedStars = useSelector((state) => state?.allHotels?.stars);
  const selectedHotelTypes = useSelector((state) => state?.allHotels?.types);
  const selectedFacilities = useSelector(
    (state) => state?.allHotels?.facilities
  );

  // stripe details

  const stripePromise = useSelector((state) => state?.stripe?.stripePromise);

  useEffect(() => {
    const initial = async () => {
      await handleGetLoggedInUser();
    };
    initial();
  }, []);

  useEffect(() => {
    if (checkInData && checkOutData) {
      const checkInDate = new Date(checkInData);
      const checkOutDate = new Date(checkOutData);
      const nights =
        Math.abs(checkOutDate?.getTime() - checkInDate?.getTime()) /
        (1000 * 3600 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [checkInData, checkOutData]);

  // Stripe details
  const stripeDetails = useSelector(
    (state) => state?.stripe?.paymentIntentData
  );

  // Call the api for creating payment intent
  useEffect(() => {
    if (numberOfNights === 0 || numberOfNights) {
      handleCreatePayment(selectedHotel?._id, numberOfNights);
    }
  }, [numberOfNights]);

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailSummary
        checkIn={checkInData}
        checkOut={checkOutData}
        adultCount={adultCount}
        childCount={childCount}
        numberOfNights={numberOfNights}
        selectedHotel={selectedHotel}
      />
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: stripeDetails?.response?.clientSecret,
        }}
      >
        <BookingForm
          currentUser={loggedInUser}
          paymentIntent={stripeDetails?.response}
          checkIn={checkInData}
          checkOut={checkOutData}
          adultCount={adultCount}
          childCount={childCount}
          numberOfNights={numberOfNights}
          selectedHotel={selectedHotel}
        />
      </Elements>
    </div>
  );
};

export default Booking;
