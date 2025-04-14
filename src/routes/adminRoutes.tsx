import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateCar from "../pages/admin/CreateCar";
import ChangePassword from "../pages/ChangePassword";
import AllOrders from "../pages/order/AllOrders";
import OrderDetails from "../pages/order/OrderDetails";
import AllCars from "../pages/product/AllCars";
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
    name: "All Cars",
    path: "cars",
    element: <AllCars type="admin" />,
  },
  {
    path: "cars/category/:category",
    element: <AllCars type="admin" />,
  },
  {
    path: "update-car/:carId",
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
