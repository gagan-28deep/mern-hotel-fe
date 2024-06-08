import React from "react";
import { useForm } from "react-hook-form";

const BookingForm = ({ currentUser }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
    },
  });
  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
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
    </form>
  );
};

export default BookingForm;
