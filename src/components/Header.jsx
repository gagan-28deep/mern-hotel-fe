import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  // const  user  = useSelector((state) => console.log(state?.user?.userData?.user));
  const user = useSelector((state) => state?.user?.userData?.user);

  useEffect(() => {}, [user]);
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holidays.com</Link>
        </span>
        {!user && (
          <span className="text-white font-bold flex gap-4 tracking-tight">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </span>
        )}
        {user && (
          // Allign all in the single line
          <span className="text-white font-bold flex gap-4 tracking-tight">
            <Link to="/my-bookings">My Bookings</Link>
            <Link to="/my-hotels">My Hotels</Link>
            <button>Logout</button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
