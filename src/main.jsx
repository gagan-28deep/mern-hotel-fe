import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { ToastContainer } from "react-toastify";
import { store } from "./store/store";
import { Provider } from "react-redux";
import SigninPage from "./pages/SigninPage.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import AddHotelPage from "./pages/AddHotelPage.jsx";
import MyHotelPage from "./pages/MyHotelPage.jsx";
import EditHotelPage from "./pages/EditHotelPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "login",
        element: (
          <AuthLayout authentication={false}>
            <SigninPage />
          </AuthLayout>
        ),
      },
      {
        path: "add-hotel",
        element: (
          <AuthLayout authentication={true}>
            <AddHotelPage />
          </AuthLayout>
        ),
      },
      {
        path: "my-hotels",
        element: <MyHotelPage />,
      },
      {
        path: "edit-hotel/:id",
        element: <EditHotelPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
