import React from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsBySearch } from "../../../store/slices/allHotelsSlice";
import { useLocation, useNavigate } from "react-router-dom";
const GuestInfoForm = ({ hotelId, pricePerNight }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const adultCountSelected = useSelector(
    (state) => state?.allHotels?.adultCount
  );
  const childCountSelected = useSelector(
    (state) => state?.allHotels?.childCount
  );
  const checkInDateSelected = useSelector((state) => state?.allHotels?.checkIn);
  const checkOutDateSelected = useSelector(
    (state) => state?.allHotels?.checkOut
  );

  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      adultCount: adultCountSelected,
      childCount: childCountSelected,
      checkIn: checkInDateSelected,
      checkOut: checkOutDateSelected,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  //   If the user in not signed in

  const onSignInClick = (data) => {
    dispatch(
      getHotelsBySearch({
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        adultCount: data.adultCount,
        childCount: data.childCount,
      })
    );
    navigate("/login", { state: { from: location } });
  };

  //   If the user is signed in
  const onSubmit = (data) => {
    dispatch(
      getHotelsBySearch({
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        adultCount: data.adultCount,
        childCount: data.childCount,
      })
    );
    navigate(`/hotel/${hotelId}/booking`);
  };
  return (
    <div className="flex flex-col p-4 bg-blue-300 gap-4">
      <h3 className="text-md font-bold">${pricePerNight} </h3>
      <form
        onSubmit={isAuthenticated ? handleSubmit(onSubmit) : onSignInClick}
        className="grid grid-cols-1 gap-4 items-center"
      >
        {/* For check-in */}
        <div>
          <DatePicker
            required
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>

        {/* For check-out */}
        <div>
          <DatePicker
            required
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn}
            maxDate={maxDate}
            placeholderText="Check-out Date"
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>
        <div className="flex bg-white px-2 py-1 gap-2">
          <label className="items-center flex">
            Adults:
            <input
              type="number"
              min={1}
              max={10}
              {...register("adultCount", {
                required: true,
                min: { value: 1, message: "At least 1 adult is required" },
                valueAsNumber: true,
              })}
              className="w-full p-1 focus:outline-none font-bold"
            />
          </label>
          <label className="items-center flex">
            Children:
            <input
              type="number"
              min={0}
              max={10}
              {...register("childCount", {
                valueAsNumber: true,
              })}
              className="w-full p-1 focus:outline-none font-bold"
            />
          </label>
          {errors.adultCount && (
            <span className="text-red-500">Adults is required</span>
          )}
        </div>
        {isAuthenticated ? (
          <>
            <button
              type="submit"
              className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-300 text-xl"
            >
              Book Now
            </button>
          </>
        ) : (
          <>
            <button
              type="submit"
              className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-300 text-xl"
            >
              Sign In to book
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default GuestInfoForm;
