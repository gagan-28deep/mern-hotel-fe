import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useForm } from "react-hook-form";
import useStripeCustom from "../../../Hooks/useStripe";
import { useSelector } from "react-redux";
import Loader from "../../Loader.jsx";

const BookingForm = ({
  currentUser,
  paymentIntent,
  checkIn,
  checkOut,
  adultCount,
  childCount,
  selectedHotel,
  numberOfNights,
}) => {
  const { handleCreateRoomBooking } = useStripeCustom();
  const stripe = useStripe();
  const elements = useElements();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      adultCount,
      childCount,
      checkIn,
      checkOut,
      numberOfNights,
      hotelId: selectedHotel?._id,
      totalCost: paymentIntent?.totalCost,
      paymentIntentId: paymentIntent?.paymentIntentId,
    },
  });

  const onSubmit = async (data) => {
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (result?.paymentIntent?.status === "succeeded") {
      await handleCreateRoomBooking(selectedHotel?._id, {
        ...data,
        paymentIntentId: result?.paymentIntent?.id,
      });
    }
  };

  const roomBookLoading = useSelector(
    (state) => state?.stripe?.roomBookingLoading
  );
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 font-normal text-gray-700 bg-gray-200"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
            value={currentUser?.firstName}
          />
        </label>
        {currentUser?.lastName && (
          <label className="text-gray-700 font-bold flex-1">
            Last Name
            <input
              className="mt-1 border rounded w-full py-2 px-3 font-normal text-gray-700 bg-gray-200"
              type="text"
              readOnly
              disabled
              {...register("lastName")}
              value={currentUser?.lastName}
            />
          </label>
        )}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 font-normal text-gray-700 bg-gray-200"
            type="email"
            readOnly
            disabled
            {...register("email")}
            value={currentUser?.email}
          />
        </label>
      </div>

      {/* Payment and price */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-300 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: ${paymentIntent?.totalCost?.toFixed(2)}
          </div>
          <div className="text-xs">Including taxes and fees </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="boder rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
          disabled={roomBookLoading}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 font-bold hover:bg-blue-400 rounded disabled:bg-gray-500"
        >
          {roomBookLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
      {roomBookLoading && <Loader />}
    </form>
  );
};

export default BookingForm;
