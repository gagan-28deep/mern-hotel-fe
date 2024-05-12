import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    if (authentication && isAuthenticated !== authentication) {
      navigate("/login");
    } else if (!authentication && isAuthenticated !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [isAuthenticated, navigate, authentication]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthLayout;
