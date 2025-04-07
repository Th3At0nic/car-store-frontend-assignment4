import MyOrders from "../pages/order/MyOrders";
import TrackOrder from "../pages/order/TrackOrder";
import UserDashboard from "../pages/user/UserDashboard";

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
];
