// import Footer from "./components/Footer";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import Layout from "./layouts/Layout";
// import { Outlet } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import getStorage from "./services/storageService";
// import {
//   getUserSuccess,
//   getIsAuthenticated,
//   getAccessToken,
//   getRefreshToken,
// } from "./store/slices/userSlice";

// import { getStripePromise } from "./store/slices/stripeSlices";

// import { loadStripe } from "@stripe/stripe-js";
// const stripe_pub_key = import.meta.env.VITE_STRIPE_PUB_KEY || "";
// const stripePromise = await loadStripe(stripe_pub_key);

// function App() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const userData = getStorage("user");
//     const accessToken = getStorage("accessToken");
//     const refreshToken = getStorage("refreshToken");
//     dispatch(getStripePromise(stripePromise));
//     if (userData && accessToken && refreshToken) {
//       dispatch(getUserSuccess(userData));
//       dispatch(getAccessToken(accessToken));
//       dispatch(getRefreshToken(refreshToken));
//       dispatch(getIsAuthenticated(true));
//     }
//   }, [dispatch]);
//   return (
//     <>
//       <Layout>
//         <Outlet />
//       </Layout>
//     </>
//   );
// }

// export default App;


import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Layout from "./layouts/Layout";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import getStorage from "./services/storageService";
import {
  getUserSuccess,
  getIsAuthenticated,
  getAccessToken,
  getRefreshToken,
} from "./store/slices/userSlice";

import { getStripePromise } from "./store/slices/stripeSlices";

import { loadStripe } from "@stripe/stripe-js";
const stripe_pub_key = import.meta.env.VITE_STRIPE_PUB_KEY || "";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function initializeStripe() {
      const stripePromise = await loadStripe(stripe_pub_key);
      dispatch(getStripePromise(stripePromise));
    }

    const userData = getStorage("user");
    const accessToken = getStorage("accessToken");
    const refreshToken = getStorage("refreshToken");

    if (userData && accessToken && refreshToken) {
      dispatch(getUserSuccess(userData));
      dispatch(getAccessToken(accessToken));
      dispatch(getRefreshToken(refreshToken));
      dispatch(getIsAuthenticated(true));
    }

    initializeStripe();
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
