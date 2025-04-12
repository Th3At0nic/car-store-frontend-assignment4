import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateCar from "../pages/admin/CreateCar";
import ChangePassword from "../pages/ChangePassword";
import AllOrders from "../pages/order/AllOrders";
import OrderDetails from "../pages/order/OrderDetails";
import AllUsers from "../pages/user/AllUsers";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Add Car",
    path: "add-car",
    element: <CreateCar />,
  },
  {
    name: "All Orders",
    path: "orders",
    element: <AllOrders />,
  },
  {
    path: "/admin/orders/:orderId", //this is for single order track or show
    element: <OrderDetails />,
  },
  {
    name: "View All Users",
    path: "users",
    element: <AllUsers />,
  },
  {
    name: "Update Password",
    path: "auth/change-password",
    element: <ChangePassword />,
  },
];
