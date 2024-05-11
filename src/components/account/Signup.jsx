import React from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const signupUser = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(signupUser)} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-500 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="text-red-500">First Name is required</span>
          )}
        </label>
        <label className="text-gray-500 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded flex-1"
            {...register("lastName")}
          />
        </label>
      </div>
      <label className="text-gray-500 text-sm font-bold">
        Username
        <input
          type="text"
          className="w-full py-1 px-2 border border-gray-300 rounded"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className="text-red-500">Username is required</span>
        )}
      </label>
      <label className="text-gray-500 text-sm font-bold">
        Email
        <input
          type="email"
          className="w-full py-1 px-2 border border-gray-300 rounded"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500">Email is required</span>
        )}
      </label>
      <label className="text-gray-500 text-sm font-bold">
        Password
        <input
          type="password"
          className="w-full py-1 px-2 border border-gray-300 rounded"
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <span className="text-red-500">Password is required</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span className="text-red-500">
            Password must be at least 6 characters
          </span>
        )}
      </label>
      <label className="text-gray-500 text-sm font-bold">
        Confirm Password
        <input
          type="password"
          className="w-full py-1 px-2 border border-gray-300 rounded"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => {
              if (value !== watch("password")) {
                return "Passwords do not match";
              }
            },
          })}
        />
        {errors?.confirmPassword &&
          errors?.confirmPassword?.type === "required" && (
            <span className="text-red-500">Confirm Password is required</span>
          )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "validate" && (
            <span className="text-red-500">Passwords do not match</span>
          )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 px-4 rounded hover:bg-blue-300 text-xl"
        >
          Sign Up
        </button>
      </span>
    </form>
  );
};

export default Signup;
