import ChangePassword from "../pages/ChangePassword";
import MyOrders from "../pages/order/MyOrders";
import TrackOrder from "../pages/order/TrackOrder";
import UserDashboard from "../pages/user/UserDashboard";
import UserPaymentHistory from "../pages/user/UserPaymentHistory";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "My Orders",
    path: "orders",
    element: <MyOrders />,
  },
  {
    path: "/user/orders/:orderId",
    element: <TrackOrder />,
  },
  {
    name: "Payment History",
    path: "payment-history",
    element: <UserPaymentHistory />,
  },
  {
    name: "Update Password",
    path: "auth/change-password",
    element: <ChangePassword />,
  },
];
