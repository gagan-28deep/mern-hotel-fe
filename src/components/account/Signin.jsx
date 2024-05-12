import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
const Signin = () => {
  const { handleLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogin = (data) => {
    handleLogin(data);
  };
  return (
    <form onSubmit={handleSubmit(userLogin)} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label className="text-gray-500 text-sm font-bold">
        Username or Email
        <input
          type="text"
          className="w-full py-1 px-2 border border-gray-300 rounded"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className="text-red-500">Username or email is required</span>
        )}
      </label>

      <label className="text-gray-500 text-sm font-bold">
        Password
        <input
          type="password"
          className="w-full py-1 px-2 border border-gray-300 rounded"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500">Password is required</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 px-4 rounded hover:bg-blue-300 text-xl"
        >
          Sign In
        </button>
      </span>
    </form>
  );
};

export default Signin;
