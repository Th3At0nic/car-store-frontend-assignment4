import AdminDashboard from "../pages/admin/AdminDashboard";
import ChangePassword from "../pages/ChangePassword";
import AllOrders from "../pages/order/AllOrders";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "All Orders",
    path: "orders",
    element: <AllOrders />,
  },
  {
    path: "admin/orders/:orderId", //this is for single order track or show
    element: <AdminDashboard />,
  },
  {
    path: "admin/orders/:orderId", //this is for delete order
    element: <AdminDashboard />,
  },
  {
    name: "Update Password",
    path: "auth/change-password",
    element: <ChangePassword />,
  },
];
