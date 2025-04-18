import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ChangePassword from "../pages/ChangePassword";
import Register from "../pages/Register";
import About from "../pages/About";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./adminRoutes";
import { userPaths } from "./userRoutes";
import Home from "../pages/Home";
import AllCars from "../pages/product/AllCars";
import CarDetails from "../pages/product/CarDetails";
import Contact from "../pages/Contact";
import Checkout from "../pages/Checkout";
import VerifyPayment from "../pages/VerifyPayment";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/cars/:carId/checkout",
        element: <Checkout />,
      },
      {
        path: "/order/payment/verify",
        element: <VerifyPayment />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(userPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/auth/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about-us",
    element: <About />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
  {
    path: "/cars",
    element: <AllCars type="user" />,
  },
  {
    path: "/cars/category/:category",
    element: <AllCars type="user" />,
  },
  {
    path: "/cars/:carId",
    element: <CarDetails type="user" />,
  },
]);
